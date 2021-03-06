const messages = require("../helpers/routes/messages");
const { User, Project, UsersProject, Division } = require("../db/models/division");
const { setPasswordHash, catchUnexpectedError } = require("../service");
const Sequelize = require("sequelize");

const getAllUsers = async (req, reply) => {
  try {
    const users = await User.findAll({
      include: Division,
      attributes: {
        include: [[Sequelize.col("divisionName"), "divisionName"]],
      },
    });
    reply.send(users);
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const getUsersForUpdateTasks = async (projectId, reply) => {
  try {
    console.log(projectId);
    const result = await User.findAll({
      include: {
        model: Project,
        where: {
          id: projectId,
        },
      },
      through: {
        model: UsersProject,
      },
    });

    reply.send(result);
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const getOneUser = async (req, reply) => {
  try {
    console.log("sfdas");
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      reply.code(404).send({ message: messages.userNotFound });
    } else {
      reply.send(user);
    }
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const updateUser = async (req, reply) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    console.log(req.body);
    const newUser = req.body;
    newUser.password = await setPasswordHash(newUser.password.toString(), process.env.SALT);
    await user.update(newUser);

    reply.code(202).send({ message: messages.usersDataIsUpdated });
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  getUsersForUpdateTasks,
};

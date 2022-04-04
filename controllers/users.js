const messages = require("../helpers/routes/messages");
const { User } = require("../db/models");
const { setPasswordHash, catchUnexpectedError } = require("../service");

const getAllUsers = async (req, reply) => {
  try {
    const users = await User.findAll();
    reply.send(users);
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const getOneUser = async (req, reply) => {
  try {
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
};

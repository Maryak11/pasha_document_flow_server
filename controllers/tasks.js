const { catchUnexpectedError } = require("../service");
const tasksService = require("../service/tasks");
const { User, Project } = require("../db/models/division");
const Tasks = require("../db/models/tasks");
const messages = require("../helpers/routes/messages");

const getAllTasks = async (req, reply) => {
  try {
    const scope = await User.findOne({
      where: {
        id: req.query.userId,
      },
    });

    if (scope.scope !== "user") {
      const projects = await tasksService.getTasksByProjectForAdmin(
        req.query.projectId,
        req.query.status,
      );
      reply.send(projects);
    } else {
      const projects = await tasksService.getTasksByProjectForUsers(
        req.query.projectId,
        req.query.status,
        req.query.userId,
      );
      reply.send(projects);
    }
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const addOneTask = async (req, reply) => {
  try {
    const newTask = await Tasks.create(req.body);
    reply.code(202).send({ message: messages.taskIsAdded, body: newTask });
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const updateTask = async (req, reply) => {
  try {
    const task = await Tasks.findOne({
      where: { id: req.params.id },
    });

    const newTask = req.body;

    await task.update(newTask);

    reply.code(202).send({ message: messages.TaskIsUpdated });
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const getOneTask = async (req, reply) => {
  try {
    const task = await Tasks.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: { exclude: ["password", "email", "scope", "phone"] },
        },
      ],
    });
    reply.code(202).send(task);
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

module.exports = {
  getAllTasks,
  addOneTask,
  getOneTask,
  updateTask,
};

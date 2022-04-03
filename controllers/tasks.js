const { catchUnexpectedError } = require("../service");
const tasksService = require("../service/tasks");

const getAllTasks = async (req, reply) => {
  try {
    console.log(req.query.role !== "user");
    if (req.query.role !== "user") {
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

module.exports = {
  getAllTasks,
};

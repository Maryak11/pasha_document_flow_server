const tasksController = require("../controllers/tasks");

module.exports = async function (fastify) {
  fastify.get("/tasks", async function (req, reply) {
    await tasksController.getAllTasks(req, reply);
  });
};

const tasksController = require("../controllers/tasks");

module.exports = async function (fastify) {
  fastify.get("/tasks", async function (req, reply) {
    await tasksController.getAllTasks(req, reply);
  });

  fastify.post("/task", async function (req, reply) {
    await tasksController.addOneTask(req, reply);
  });
  fastify.get("/task/:id", async function (req, reply) {
    await tasksController.getOneTask(req, reply);
  });
  fastify.put("/task/:id", async function (req, reply) {
    await tasksController.updateTask(req, reply);
  });
};

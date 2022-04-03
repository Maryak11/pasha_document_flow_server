// const projectsSchemas = require("../schemas/users");
const projectsController = require("../controllers/projects");

module.exports = async function (fastify) {
  fastify.get("/projects", async function (req, reply) {
    await projectsController.getAllProjets(req, reply);
  });
};

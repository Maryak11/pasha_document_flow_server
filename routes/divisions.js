const divisionsController = require("../controllers/divisions");

module.exports = async function (fastify) {
  fastify.get("/divisions", async function (req, reply) {
    await divisionsController.getAllDivisions(req, reply);
  });
};

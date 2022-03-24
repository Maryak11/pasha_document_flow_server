const refreshSchemas = require("../../schemas/auth/refresh");
const authController = require("../../controllers/auth");

module.exports = async function (fastify) {
  fastify.post("/refresh", refreshSchemas.postRefreshOpts, async function (req, reply) {
    await authController.refresh(req, reply);
  });
};

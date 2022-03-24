const registerSchemas = require("../../schemas/auth/register");
const authController = require("../../controllers/auth");

module.exports = async function (fastify) {
  fastify.post("/register", registerSchemas.registerNewUserOpts, async function (req, reply) {
    await authController.register(req, reply);
  });
};

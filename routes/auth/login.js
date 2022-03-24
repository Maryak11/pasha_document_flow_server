const loginSchemas = require("../../schemas/auth/login");
const authController = require("../../controllers/auth");

module.exports = async function (fastify) {
  fastify.post("/login", loginSchemas.postLoginOpts, async function (req, reply) {
    await authController.login(req, reply);
  });
};

const logoutSchemas = require("../../schemas/auth/logout");
const authController = require("../../controllers/auth");

module.exports = async function (fastify) {
  fastify.post("/logout", logoutSchemas.logoutOpts, async function (req, reply) {
    await authController.logout(req, reply);
  });
};

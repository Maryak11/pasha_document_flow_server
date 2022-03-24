const usersSchemas = require("../schemas/users");
const usersController = require("../controllers/users");

module.exports = async function (fastify) {
  fastify.get("/users", async function (req, reply) {
    await usersController.getAllUsers(req, reply);
  });

  fastify.get("/users/:id", usersSchemas.getUserOpts, async function (req, reply) {
    await usersController.getOneUser(req, reply);
  });

  fastify.put("/users/:id", usersSchemas.putUserOpts, async function (req, reply) {
    await usersController.updateUser(req, reply);
  });
};

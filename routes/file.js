const fileController = require("../controllers/file");

module.exports = async function (fastify) {
  fastify.get("/file/:filename", async (req, reply) => {
    await fileController.sendFileStream(req, reply);
  });
};

const filesController = require("../controllers/filesUpload");
const filesUploadSchemas = require("../schemas/filesUpload");
const messages = require("../helpers/routes/messages");

module.exports = async function (fastify) {
  fastify.setErrorHandler((err, req, reply) => {
    reply.code(500).send({ message: messages.filesUploadError });
  });

  fastify.get("/filesUpload/:page", filesUploadSchemas.getFilesOpts, async (req, reply) => {
    await filesController.getAllFiles(req, reply);
  });

  fastify.post("/filesUpload", filesUploadSchemas.postFilesOpts, async (req, reply) => {
    await filesController.uploadNewFile(req, reply);
  });
  fastify.post(
    "/filesUploadForClient",
    filesUploadSchemas.postFilesForClientOpts,
    async (req, reply) => {
      await filesController.uploadNewFile(req, reply);
    },
  );

  fastify.put("/filesUpload/:id", filesUploadSchemas.putFilesOpts, async (req, reply) => {
    await filesController.updateFile(req, reply);
  });

  fastify.delete("/filesUpload/:id", filesUploadSchemas.deleteFilesOpts, async (req, reply) => {
    await filesController.deleteFile(req, reply);
  });

  fastify.get("/filesUpload/sync", filesUploadSchemas.synchronizeFilesOpts, async (req, reply) => {
    await filesController.synchronizeFiles(req, reply);
  });
};

const fs = require("fs/promises");
const path = require("path");
const messages = require("../helpers/routes/messages");
const filesService = require("../service/files");
const { fileModel } = require("../db/models/file");
const { pagination, isPageNumberPossible, catchUnexpectedError } = require("../service");
const { allowedExtensions, limits } = require("../helpers/routes/files/constants");
const { translitFileName } = require("../helpers/functions");

const filesPerPage = 40;

const getAllFiles = async (req, reply) => {
  try {
    const filesCount = await fileModel.count();
    if (!isPageNumberPossible(filesCount, filesPerPage, req.params.page) && filesCount) {
      reply.code(404).send({ message: messages.pageNotFound });
    }
    const rows = await fileModel.findAll({
      order: [["createdAt", "DESC"]],
      ...pagination(filesPerPage, req.params.page),
    });
    reply.send({ rows, filesPerPage, filesCount });
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const uploadNewFile = async (req, reply) => {
  try {
    console.log(req.files);
    if (req.files && req.files.length > 0) {
      const responseFiles = [];
      for (const file of req.files) {
        console.log(file.name);
        const item = await fileModel.create({
          name: file.filename,
          size: file.size,
          userId: req.query.userId || null,
          url: process.env.BASE_URL + "file/" + file.filename,
        });
        responseFiles.push(item);
      }
      reply.send({ message: messages.filesAreUploaded, body: responseFiles });
    } else {
      reply.code(400).send({ message: messages.needToUploadFiles });
    }
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const updateFile = async (req, reply) => {
  try {
    const file = await fileModel.findOne({ where: { id: req.params.id } });
    if (!file) {
      reply.code(404).send({ message: messages.fileNotFound });
    } else {
      const updatedFile = filesService.convertUpdatedFile(req.body);
      const res = await filesService.renameLocalFile(file.name, updatedFile.name);
      await file.update(updatedFile);

      if (res) {
        reply.code(500).send({ message: messages.undexpectedError });
      } else {
        reply.code(202).send({ message: messages.fileIsUpdated, body: file });
      }
    }
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const deleteFile = async (req, reply) => {
  try {
    const file = await fileModel.findOne({ where: { id: req.params.id } });
    if (!file) {
      reply.code(404).send({ message: messages.fileNotFound });
    } else {
      await file.destroy();
      try {
        await fs.unlink(path.join(process.env.FILES_UPLOAD_DIR, file.name));
      } catch (err) {
        reply.code(202).send({ message: messages.fileIsDeleted });
      }
      reply.code(202).send({ message: messages.fileIsDeleted });
    }
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const synchronizeFiles = async (req, reply) => {
  try {
    const filesInDb = await fileModel.findAll({
      attributes: ["name"],
    });
    const fileNamesInDb = filesInDb.map((f) => f.name);
    const fileNamesInDir = await fs.readdir(process.env.FILES_UPLOAD_DIR);
    const potentialFilesToAdd = fileNamesInDir.filter((f) => !fileNamesInDb.includes(f));
    for (const f of potentialFilesToAdd) {
      const filesize = (await fs.stat(path.join(process.env.FILES_UPLOAD_DIR, f))).size;
      const isSizeSuitable = filesize <= limits.fileSize;
      const isExtensionAllowed = allowedExtensions.includes("." + f.split(".").pop().toLowerCase());

      if (isSizeSuitable && isExtensionAllowed) {
        const filename = +req.query.rename ? Date.now() + "_" + translitFileName(f) : f;
        await fileModel.create({
          name: filename,
          size: filesize,
          userId: null,
          url: process.env.BASE_URL + "file/" + filename,
        });
        if (+req.query.rename) {
          const res = await filesService.renameLocalFile(f, filename);
          if (res) {
            reply.code(500).send({ message: messages.undexpectedError });
          }
        }
      }
    }

    reply.code(202).send({ message: messages.filesAreSynchronized });
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

module.exports = {
  getAllFiles,
  uploadNewFile,
  updateFile,
  deleteFile,
  synchronizeFiles,
};

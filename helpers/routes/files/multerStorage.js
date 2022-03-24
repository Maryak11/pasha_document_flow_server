const multer = require("fastify-multer");
const fileFilter = require("./fileFilter");
const { limits } = require("./constants");
const { translitFileName } = require("../../functions");

module.exports = (resume) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, process.env.FILES_UPLOAD_DIR);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + translitFileName(file.originalname));
      },
    }),
    limits: limits(resume),
    fileFilter: fileFilter(resume),
  });

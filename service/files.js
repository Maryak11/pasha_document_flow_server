const fs = require("fs/promises");
const path = require("path");
const { translitFileName } = require("../helpers/functions");

const convertUpdatedFile = (obj) => {
  const newName = translitFileName(obj.name);
  return {
    ...obj,
    name: newName,
    url: process.env.BASE_URL + "file/" + newName,
  };
};

const renameLocalFile = (oldName, newName) => {
  const oldPath = path.join(process.env.FILES_UPLOAD_DIR, oldName);
  const newPath = path.join(process.env.FILES_UPLOAD_DIR, newName);
  return fs.rename(oldPath, newPath);
};

module.exports = {
  convertUpdatedFile,
  renameLocalFile,
};

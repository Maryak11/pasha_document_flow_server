const fs = require("fs");
const path = require("path");

const models = {};
fs.readdirSync(__dirname).forEach((file) => {
  const fileName = path.parse(file).name;
  if (fileName === "index") return;
  models[fileName + "Model"] = require(path.join(__dirname, fileName));
});

module.exports = models;

"use strict";
require("dotenv").config();
const path = require("path");
const AutoLoad = require("fastify-autoload");
const db = require("./db/");
const multer = require("fastify-multer");

db.authenticate().then(() => {
  console.log("Connection has been established successfully.");
  db.sync();
});

module.exports = async function (fastify, opts) {
  fastify.register(require("fastify-cookie"));
  fastify.register(require("fastify-cors"));
  fastify.register(multer.contentParser);

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};

module.exports.options = {
  maxParamLength: 120,
};

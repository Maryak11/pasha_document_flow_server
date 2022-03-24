const Sequelize = require("sequelize");

const db = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  hooks: {
    beforeDefine: function (columns, model) {
      model.tableName = model.name.plural;
    },
  },
  timezone: process.env.DB_TIMEZONE,
  logging: false,
});

module.exports = db;

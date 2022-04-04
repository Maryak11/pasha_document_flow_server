const { DataTypes } = require("sequelize");
const db = require("../index");
const { User } = require("./division");

const tokenModel = db.define("token", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.TINYINT,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = tokenModel;

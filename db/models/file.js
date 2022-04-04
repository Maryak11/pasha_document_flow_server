const { DataTypes } = require("sequelize");
const db = require("../");
const { User } = require("./division");

const fileModel = db.define(
  "file",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    userId: {
      type: DataTypes.TINYINT,
      references: {
        model: User,
        key: "id",
      },
      required: true,
    },
    url: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
  },
  {
    updatedAt: false,
  },
);

module.exports = { fileModel };

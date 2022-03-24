const { DataTypes } = require("sequelize");
const db = require("../index");
const divisionModel = require("./division");

const userModel = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    displayedName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      default: "",
    },
    phone: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    divisionId: {
      type: DataTypes.INTEGER,
      references: {
        model: divisionModel,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    updatedAt: false,
  },
);
module.exports = userModel;

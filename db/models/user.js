const { DataTypes } = require("sequelize");
const db = require("../index");
const { Division } = require("./division");

const userModel = db.define(
  "user",
  {
    id: {
      type: DataTypes.TINYINT,
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
    scope: {
      type: DataTypes.STRING(50),
      default: "",
    },
    phone: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    divisionId: {
      type: DataTypes.TINYINT,
      references: {
        model: Division,
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

userModel.belongsTo(Division);
module.exports = userModel;

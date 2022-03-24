const { DataTypes } = require("sequelize");
const db = require("../index");

const divisionModel = db.define("division", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  divisionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  divisionTranslitName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = divisionModel;

const { DataTypes } = require("sequelize");
const db = require("../index");
const { Project, User } = require("./division");

const Tasks = db.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskTranslitName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.TINYINT,
    references: {
      model: Project,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
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
});

module.exports = Tasks;

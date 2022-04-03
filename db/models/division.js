const { DataTypes } = require("sequelize");
const db = require("../index");

const Division = db.define("division", {
  id: {
    type: DataTypes.TINYINT,
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

const Project = db.define("project", {
  id: {
    type: DataTypes.TINYINT,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("open", "close"),
  },
  customer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectTranslitName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const DivisionProject = db.define("DivisionProject", {
  divisionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Division,
      key: "id",
    },
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: "id",
    },
  },
});

Division.belongsToMany(Project, { through: DivisionProject, foreignKey: "divisionId" });
Project.belongsToMany(Division, { through: DivisionProject, foreignKey: "projectId" });

module.exports = { Division, Project };

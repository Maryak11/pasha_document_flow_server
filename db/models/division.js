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

const User = db.define(
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

User.belongsTo(Division);

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

const UsersProject = db.define("UsersProject", {
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
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

User.belongsToMany(Project, { through: UsersProject, foreignKey: "userId" });
Project.belongsToMany(User, { through: UsersProject, foreignKey: "projectId" });

module.exports = { Division, Project, User };

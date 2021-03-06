const Tasks = require("../db/models/tasks");
const { User, Project } = require("../db/models/division");
// const Sequelize = require("sequelize");

const getTasksByProjectForUsers = async (projectId, status, userId) => {
  try {
    if (status === "all") {
      const result = await Tasks.findAll({
        where: {
          projectId,
          userId,
        },
        include: User,
      });
      return result;
    } else if (status !== "all") {
      const result = await Tasks.findAll({
        where: {
          status,
          projectId,
          userId,
        },
        include: User,
      });
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};
const getTasksByProjectForAdmin = async (projectId, status) => {
  try {
    if (status === "all") {
      const result = await Tasks.findAll({
        where: {
          projectId,
        },
        include: [
          {
            model: User,
            attributes: { exclude: ["password", "email", "scope", "phone"] },
          },
          {
            model: Project,
          },
        ],
      });
      return result;
    } else {
      const result = await Tasks.findAll({
        where: {
          status,
          projectId,
        },

        include: [
          {
            model: User,
            attributes: { exclude: ["password", "email", "scope", "phone"] },
          },
          {
            model: Project,
          },
        ],
      });
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getTasksByProjectForUsers,
  getTasksByProjectForAdmin,
};

const Tasks = require("../db/models/tasks");
const { User, Project } = require("../db/models/division");
// const Sequelize = require("sequelize");

const getUsersForUpdateTasks = async (projectId) => {
  try {
    const result = await User.findAll({
      include: {
        model: Project,
        where: {
          projectId,
        },
      },
    });

    return result;
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
  getUsersForUpdateTasks,
  getTasksByProjectForAdmin,
};

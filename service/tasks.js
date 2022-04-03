const { Tasks } = require("../db/models/tasks");

const getTasksByProjectForUsers = async (projectId, userId, status) => {
  try {
    if (status === "all") {
      const result = await Tasks.findAll({
        where: {
          projectId,
          userId,
        },
      });
      return result;
    } else if (status !== "all") {
      const result = await Tasks.findAll({
        where: {
          status,
          projectId,
          userId,
        },
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
      });
      return result;
    } else {
      const result = await Tasks.findAll({
        where: {
          status,
          projectId,
        },
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

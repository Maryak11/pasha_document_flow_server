const { Project, Division, DivisionProject } = require("../db/models/division");
const Sequelize = require("sequelize");

const getProjectsCategoryDivisions = async (divisionId, status) => {
  try {
    if (+divisionId !== 0 && status === "all") {
      const result = await Project.findAll({
        include: {
          model: Division,
          where: {
            id: divisionId,
          },
        },

        attributes: {
          include: [[Sequelize.col("divisionName"), "divisionName"]],
        },
        through: {
          model: DivisionProject,
        },
      });
      return result;
    } else if (+divisionId === 0 && status !== "all") {
      const result = await Project.findAll({
        where: {
          status,
        },
        include: {
          model: Division,
        },
        attributes: {
          include: [[Sequelize.col("divisionName"), "divisionName"]],
        },
        through: {
          model: DivisionProject,
        },
      });
      return result;
    } else if (+divisionId !== 0 && status !== "all") {
      const result = await Project.findAll({
        where: {
          status,
        },
        include: {
          model: Division,
          where: {
            id: divisionId,
          },
        },
        attributes: {
          include: [[Sequelize.col("divisionName"), "divisionName"]],
        },
        through: {
          model: DivisionProject,
        },
      });
      return result;
    } else {
      const result = await Project.findAll({
        include: Division,
        attributes: {
          include: [[Sequelize.col("divisionName"), "divisionName"]],
        },
      });
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProjectsCategoryDivisions,
};

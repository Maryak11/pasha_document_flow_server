const { Project, Division, DivisionProject, User } = require("../db/models/division");

const getProjectsCategoryDivisionsForAdmin = async (divisionId, status) => {
  try {
    if (+divisionId !== 0 && status === "all") {
      const result = await Project.findAll({
        include: [
          {
            model: Division,
            where: {
              id: divisionId,
            },
          },
          {
            model: User,
          },
        ],
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
        include: [
          {
            model: Division,
          },
          {
            model: User,
          },
        ],
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
        include: [
          {
            model: Division,
            where: {
              id: divisionId,
            },
          },
          {
            model: User,
          },
        ],
        through: {
          model: DivisionProject,
        },
      });
      return result;
    } else {
      const result = await Project.findAll({
        include: [
          { model: Division },
          {
            model: User,
          },
        ],
      });
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

const getProjectsCategoryDivisionsForUser = async (divisionId, status, userId) => {
  try {
    if (status === "all") {
      const result = await Project.findAll({ //обращение к таблице проектов
        include: [ //отдать проекты только для данного сотрудника, который их просит
          {
            model: User,
            where: {
              id: userId,
            },
          },
          {
            model: Division,
            where: {
              id: divisionId,
            },
          },
        ],
        through: {
          model: DivisionProject,
        },
      });
      console.log(result);
      return result; //отдаю результат в контроллеры
    } else {
      const result = await Project.findAll({
        where: {
          status,
        },
        include: [
          {
            model: Division,
            where: {
              id: divisionId,
            },
          },
          {
            model: User,
            where: {
              id: userId,
            },
          },
        ],
        through: {
          model: DivisionProject,
        },
      });
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

const getOneProject = async (projectId) => {
  try {
    const project = await Project.findOne({
      where: { id: projectId },
      include: [
        { model: Division },
        {
          model: User,
        },
      ],
    });
    return project;
  } catch (err) {
    console.log(err);
  }
};

const updateProject = async (projectId, data) => {
  try {
    const project = await Project.findOne({
      where: {
        id: projectId,
      },
      include: [
        { model: Division },
        {
          model: User,
        },
      ],
    });
    await project.update(data);
    await project.setDivisions(data.divisions);
    await project.setUsers(data.users);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProjectsCategoryDivisionsForAdmin,
  getProjectsCategoryDivisionsForUser,
  getOneProject,
  updateProject,
};

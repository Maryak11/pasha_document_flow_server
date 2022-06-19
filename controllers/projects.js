// const messages = require("../helpers/routes/messages");
const { catchUnexpectedError } = require("../service");
const projectService = require("../service/projects");
const { User, Project } = require("../db/models/division");

const getAllProjets = async (req, reply) => {
  try {
    console.log(req.query.userId);
    const scope = await User.findOne({
      where: {
        id: req.query.userId,
      },
      include: Project,
    });

    if (scope.scope !== "user") { 
      const projects = await projectService.getProjectsCategoryDivisionsForAdmin(
        req.query.divisionId,
        req.query.status,
      );
      reply.send(projects);
    } else {
      const projects = await projectService.getProjectsCategoryDivisionsForUser(
        scope.divisionId,
        req.query.status,
        req.query.userId,
      );
      reply.send(projects);
    }
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const getCurrentProject = async (req, reply) => {
  try {
    console.log(req.params.id);
    const project = await projectService.getOneProject(req.params.id);
    reply.send(project);
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};
const updateOneProject = async (req, reply) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    reply.send(project);
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

module.exports = {
  getAllProjets,
  getCurrentProject,
  updateOneProject,
};

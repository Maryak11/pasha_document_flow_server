// const messages = require("../helpers/routes/messages");
const { catchUnexpectedError } = require("../service");
const projectService = require("../service/projects");

const getAllProjets = async (req, reply) => {
  try {
    console.log(req.query.divisionId);
    const projects = await projectService.getProjectsCategoryDivisions(
      req.query.divisionId,
      req.query.status,
    );
    reply.send(projects);
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

module.exports = {
  getAllProjets,
};

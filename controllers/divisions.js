// const messages = require("../helpers/routes/messages");
const { catchUnexpectedError } = require("../service");
const { Division } = require("../db/models/division");

const getAllDivisions = async (req, reply) => {
  try {
    const divisions = await Division.findAll();
    reply.send(divisions);
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

module.exports = {
  getAllDivisions,
};

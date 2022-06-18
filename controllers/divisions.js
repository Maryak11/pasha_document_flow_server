// const messages = require("../helpers/routes/messages");
const { catchUnexpectedError } = require("../service");
const { Division } = require("../db/models/division");

const getAllDivisions = async (req, reply) => {
  try {
    const divisions = await Division.findAll();
    const mapDivisions = divisions.map((el) => {
      return { ...el, value: el.id, name: el.divisionName };
    });
    reply.send(mapDivisions);
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

module.exports = {
  getAllDivisions,
};

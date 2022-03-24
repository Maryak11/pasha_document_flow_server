// const messages = require("../../helpers/routes/messages");
// const { applicationModel } = require("../../db/models");

// module.exports = async (req, reply) => {
//   const applications = await applicationModel.findAll({
//     where: {
//       userAgent: req.headers["user-agent"],
//     },
//   });
//   if (applications.length > 2) {
//     reply.code(404).send({ message: messages.countApplications });
//   }
// };

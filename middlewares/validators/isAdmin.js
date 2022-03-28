const messages = require("../../helpers/routes/messages");
const { userModel } = require("../../db/models");

module.exports = async (req, reply) => {
  const userId = req.user?.id || null;
  const user = await userModel.findOne({ where: { id: userId } });
  if (user?.scope !== "admin") {
    reply.code(403).send({ message: messages.noAccess });
  }
};

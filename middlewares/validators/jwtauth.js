const { validateAccessToken } = require("../../service/tokens.service");
const messages = require("../../helpers/routes/messages");

module.exports = async (req, reply) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      console.log("Нет хедера авторизации");
      return reply.code(401).send({ message: messages.authError });
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      console.log("Нет токена в хедере");
      return reply.code(401).send({ message: messages.authError });
    }

    const userAccessData = validateAccessToken(accessToken);
    if (!userAccessData) {
      console.log("Невалидный access токен");
      return reply.code(401).send({ message: messages.authError });
    }

    return (req.user = userAccessData);
  } catch (err) {
    console.log(err);
    reply.code(500).send({ message: messages.undexpectedError });
  }
};

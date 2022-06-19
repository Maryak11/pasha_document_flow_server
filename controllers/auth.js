const authService = require("../service/auth");
const messages = require("../helpers/routes/messages");
const { catchUnexpectedError } = require("../service");

const register = async (req, reply) => {
  try {
    const result = await authService.register(req);
    if (result) {
      reply.code(200).send({ message: messages.successRegistration });
    } else {
      reply.code(409).send({ message: messages.userAlreadyExists });
    }
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const login = async (req, reply) => { //функция при логине пользователя 
  try {
    if (!(req.body.email && req.body.password)) {
      reply.code(400).send({ message: messages.fillTheFields });
    }
    const validateUser = await authService.login(req.body, req.headers["user-agent"]);
    if (validateUser) {
      reply.code(200).send({
        message: "Успешно",
        user: validateUser.user,
        accessToken: validateUser.accessToken,
        refreshToken: validateUser.refreshToken,
      });
    }
    reply.code(403).send({ message: messages.wrongLoginOrPassword });
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const refresh = async (req, reply) => {
  try {
    const refreshToken = req.body.refreshToken;
    const validateUser = await authService.refresh(refreshToken, req.headers);
    if (validateUser) {
      reply.code(200).send({
        accessToken: validateUser.accessToken,
        refreshToken: validateUser.refreshToken,
      });
    } else {
      reply.code(401).send({ message: messages.authError });
    }
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

const logout = async (req, reply) => {
  try {
    await authService.logout(req.user.id, req.headers);
    reply.code(200).send({ message: messages.successLogout });
  } catch (err) {
    catchUnexpectedError(err, reply);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};

const messages = require("../helpers/routes/messages");
const userModel = require("../db/models");
const { validateAccessToken } = require("./tokens.service");
const { hash } = require("bcryptjs");

exports.isUserAdmin = async (req) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return false;
  }

  const accessToken = authorizationHeader.split(" ")[1];
  if (!accessToken) {
    return false;
  }

  const userAccessData = validateAccessToken(accessToken);
  if (!userAccessData) {
    return false;
  }

  const userId = userAccessData?.id || null;
  const user = await userModel.findOne({ where: { id: userId } });
  return user?.scope === "admin";
};

exports.pagination = (itemsPerPage, page) => {
  return {
    offset: itemsPerPage * (page - 1),
    limit: itemsPerPage,
  };
};

exports.isPageNumberPossible = (totalCount, itemsPerPage, page) => {
  return Math.ceil(totalCount / itemsPerPage) >= page;
};

exports.setPasswordHash = async (value, salt) => {
  const hashPass = await hash(value, +salt);
  return hashPass;
};

exports.catchUnexpectedError = async (err, reply) => {
  console.log(err);
  reply.code(500).send({ message: messages.unexpectedError });
};

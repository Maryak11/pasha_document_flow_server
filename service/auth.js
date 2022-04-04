const { setPasswordHash } = require("./");
const Sequelize = require("sequelize");
const { tokenModel } = require("../db/models");
const { User } = require("../db/models/division");
const { Division } = require("../db/models/division");
const { generateTokens, saveModelToken, validateRefreshToken } = require("./tokens.service");
const { compare } = require("bcryptjs");

const register = async (payload) => {
  const candidate = await User.findOne({
    where: { email: payload.body.email },
  });
  if (candidate) {
    return null;
  }

  const newUser = {
    email: payload.body.email,
    scope: payload.body.scope,
    displayedName: payload.body.displayedName,
    password: payload.body.password,
    phone: payload.body.phone,
    divisionId: payload.body.divisionId,
  };

  // const userAgent = payload.headers["user-agent"];

  newUser.password = await setPasswordHash(newUser.password.toString(), process.env.SALT);
  const userDB = await User.create(newUser);

  // const tokens = generateTokens({ email: userDB.email, id: userDB.id });
  // await saveModelToken(userDB.id, tokens.refreshToken, userAgent);

  return {
    user: {
      id: userDB.id,
      email: userDB.email,
      scope: userDB.scope,
      divisionId: payload.body.divisionId,
      displayedName: userDB.displayedName,
    },
  };
};

const login = async ({ email, password }, userAgent) => {
  const candidate = await User.findOne({
    where: { email },
    include: Division,
    attributes: {
      include: [
        [Sequelize.col("divisionName"), "divisionName"],
        [Sequelize.col("divisionTranslitName"), "divisionTranslitName"],
      ],
    },
  });
  console.log(candidate.dataValues.divisionName);
  if (!candidate) {
    return false;
  }
  const isPassEqual = await compare(password, candidate.password);
  if (!isPassEqual) {
    return false;
  }
  const tokens = generateTokens({ email: candidate.email, id: candidate.id });
  await saveModelToken(candidate.id, tokens.refreshToken, userAgent);

  return {
    ...tokens,
    user: {
      id: candidate.id,
      displayedName: candidate.displayedName,
      email: candidate.email,
      divisionId: candidate.divisionId,
      divisionName: candidate.dataValues.divisionName,
      scope: candidate.scope,
      createdAt: candidate.createdAt,
    },
  };
};

const refresh = async (refreshToken, headers) => {
  if (!refreshToken) {
    return false;
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDB = await tokenModel.findOne({
    where: {
      token: refreshToken,
    },
  });
  if (!userData || !tokenFromDB) {
    return false;
  }

  const user = await User.findOne({
    where: {
      id: userData.id,
    },
  });
  const userAgent = headers["user-agent"];
  const tokens = generateTokens({ email: user.email, id: user.id });
  await saveModelToken(user.id, tokens.refreshToken, userAgent);

  return {
    ...tokens,
    user: {
      id: user.id,
      email: user.email,
      divisionId: user.divisionId,
      scope: user.scope,
      displayedName: user.displayedName,
    },
  };
};

const logout = (userId, headers) => {
  const refreshToken = tokenModel.destroy({
    where: {
      userId,
      userAgent: headers["user-agent"],
    },
  });
  return refreshToken;
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};

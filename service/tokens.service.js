const jwt = require("jsonwebtoken");
const { tokenModel } = require("../db/models");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1800s",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
};

const saveModelToken = async (userId, refreshToken, userAgent) => {
  const tokenData = await tokenModel.findOne({
    where: {
      userId: userId,
      userAgent: userAgent,
    },
  });
  if (tokenData) {
    tokenData.token = refreshToken;
    return tokenData.save();
  }
  const token = await tokenModel.create({
    userId: userId,
    token: refreshToken,
    userAgent: userAgent,
  });

  return token;
};

const removeToken = async (refreshToken, headers) => {
  console.log("remove");
  const tokenData = await tokenModel.destroy({
    where: {
      token: refreshToken,
      userAgent: headers["user-agent"],
    },
  });

  return tokenData;
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    return userData;
  } catch {
    return null;
  }
};
const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    return userData;
  } catch {
    return null;
  }
};

module.exports = {
  generateTokens,
  saveModelToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
};

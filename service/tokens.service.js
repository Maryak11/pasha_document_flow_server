const jwt = require("jsonwebtoken");
const { tokenModel } = require("../db/models");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { //JWT библиотека для генерации джвт токена
    expiresIn: "1800s", //время жизни токена аксеса 30 минут
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",//время жизни токена рефреш 30 дней
  });
  return {
    accessToken,
    refreshToken,
  };
};

const saveModelToken = async (userId, refreshToken, userAgent) => { //Для проверки входа в систему, обновление аксес токена
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
    userAgent: userAgent, // откуда и когда заходил
  });

  return token;
};

const removeToken = async (refreshToken, headers) => { //Когда пользователь  выходит из системы, удаляет запись с рефреш токена
  console.log("remove");
  const tokenData = await tokenModel.destroy({ //Удалить запись
    where: {
      token: refreshToken,
      userAgent: headers["user-agent"],
    },
  });

  return tokenData;
};

const validateAccessToken = (token) => { //Для валидации токена
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    return userData;
  } catch {
    return null;
  }
};
const validateRefreshToken = (token) => { //Валидации рефреш токена, разные потому что разные секретные слова
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

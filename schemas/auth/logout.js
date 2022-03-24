const { responseMsgObj } = require("../");
const validate = require("../../middlewares/validate");

const logoutOpts = {
  schema: {
    response: {
      200: responseMsgObj,
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
  preValidation: validate(["jwtauth"]),
};

module.exports = { logoutOpts };

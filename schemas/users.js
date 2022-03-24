const validate = require("../middlewares/validate");
const { getUserSchema, responseMsgObj } = require("./");

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: getUserSchema,
      },
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
  preValidation: validate(["jwtauth", "isAdmin"]),
};

const getUserOpts = {
  schema: {
    response: {
      200: getUserSchema,
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
  preValidation: validate(["jwtauth", "isAdmin"]),
};

const putUserOpts = {
  schema: {
    response: {
      202: responseMsgObj,
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
  preValidation: validate(["jwtauth", "isAdmin"]),
};

module.exports = {
  getUsersOpts,
  getUserOpts,
  putUserOpts,
};

const { responseMsgObj } = require("../");

const newUserSchema = {
  type: "object",
  properties: {
    displayedName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    phone: { type: "string" },
    role: { type: "string" },
    divisionId: { type: "number" },
  },
};

const registerNewUserOpts = {
  schema: {
    body: newUserSchema,
    response: {
      200: responseMsgObj,
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
};

module.exports = { registerNewUserOpts };

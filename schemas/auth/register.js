const { responseMsgObj } = require("../");

const newUserSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    displayedName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    phone: { type: "string" },
    scope: { type: "string" },
    divisionId: { type: "number" },
    divisionName: { type: "string" },
  },
};

const registerNewUserOpts = {
  schema: {
    body: newUserSchema,
    response: {
      200: {
        body: newUserSchema,
        message: { type: "string" },
      },

      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
};

module.exports = { registerNewUserOpts };

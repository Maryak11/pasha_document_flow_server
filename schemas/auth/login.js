const { getUserSchema, responseMsgObj } = require("../");

const postLoginOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          user: getUserSchema,
          accessToken: { type: "string" },
          refreshToken: { type: "string" },
        },
      },
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
};
module.exports = { postLoginOpts };

const { responseMsgObj } = require("../");

const postRefreshOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        refreshToken: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          accessToken: { type: "string" },
          refreshToken: { type: "string" },
        },
      },
      500: responseMsgObj,
    },
  },
};

module.exports = { postRefreshOpts };

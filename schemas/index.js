exports.getUserSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    displayedName: { type: "string" },
    email: { type: "string" },
    role: { type: "string" },
    createdAt: { type: "string" },
  },
};

exports.responseMsgObj = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

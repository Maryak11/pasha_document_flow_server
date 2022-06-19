exports.getUserSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    displayedName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    scope: { type: "string" },
    phone: { type: "string" },
    divisionName: { type: "string" },
    divisionId: { type: "string" },
    createdAt: { type: "string" },
  },
};

exports.responseMsgObj = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

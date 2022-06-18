const validate = require("../middlewares/validate");
const upload = require("../helpers/routes/files/multerStorage");
const { responseMsgObj } = require("./");
const resume = true;

const fileItem = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    size: { type: "string" },
    url: { type: "string" },
    createdAt: { type: "string" },
  },
};
const getFilesOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          rows: {
            type: "array",
            items: fileItem,
          },
          filesPerPage: { type: "number" },
          filesCount: { type: "number" },
        },
      },
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
  preValidation: validate(["jwtauth", "isAdmin"]),
};

const postFilesOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          body: {
            type: "array",
            items: fileItem,
          },
        },
      },
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },

  preHandler: upload().array("multi-files", 20),
};
const postFilesForClientOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          body: {
            type: "array",
            items: fileItem,
          },
        },
      },
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
  preValidation: validate(["countApplication"]),
  preHandler: upload(resume).array("multi-files", 1),
};

const putFilesOpts = {
  schema: {
    body: fileItem,
    response: {
      202: {
        type: "object",
        properties: {
          message: { type: "string" },
          body: fileItem,
        },
      },
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
  preValidation: validate(["jwtauth", "isAdmin"]),
};

const deleteFilesOpts = {
  schema: {
    response: {
      202: responseMsgObj,
      "4xx": responseMsgObj,
      500: responseMsgObj,
    },
  },
  preValidation: validate(["jwtauth", "isAdmin"]),
};

const synchronizeFilesOpts = {
  schema: {
    response: {
      202: responseMsgObj,
      500: responseMsgObj,
    },
  },
  preValidation: validate(["jwtauth", "isAdmin"]),
};

module.exports = {
  getFilesOpts,
  postFilesOpts,
  putFilesOpts,
  deleteFilesOpts,
  synchronizeFilesOpts,
  postFilesForClientOpts,
};

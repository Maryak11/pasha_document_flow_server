const mime = require("mime");
const { allowedExtensions, allowedExtensionsForClient } = require("./constants");

module.exports = (resume) => {
  return (req, file, cb) => {
    const extension = resume ? allowedExtensionsForClient : allowedExtensions;
    console.log(resume);

    const fileExtension = file.originalname
      ? "." + file.originalname.split(".").pop()
      : "not allowed";

    const allowedMimeTypes = extension.map((ext) => mime.getType(ext));
    allowedMimeTypes.push("application/octet-stream");

    if (
      !allowedMimeTypes.includes(file.mimetype) ||
      !extension.includes(fileExtension.toLowerCase())
    ) {
      return cb(
        new Error(
          `File extension is not allowed! Allowed file extensions list: ${extension.join(
            ",",
          )}, file mime-type: ${file.mimetype}, file extension: ${fileExtension}`,
        ),
      );
    }

    cb(null, true);
  };
};

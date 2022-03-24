const fs = require("fs");
const path = require("path");
const mime = require("mime");

const sendFileStream = async (req, reply) => {
  const ext = req.params.filename.split(".").pop();
  const rstream = fs.createReadStream(path.join(process.env.FILES_UPLOAD_DIR, req.params.filename));
  reply.type(mime.getType(ext));
  reply.send(rstream);
};

module.exports = {
  sendFileStream,
};

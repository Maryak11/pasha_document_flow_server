exports.allowedExtensions = [
  ".rar",
  ".zip",
  ".mp3",
  ".aif",
  ".flac",
  ".m4a",
  ".mp4",
  ".mov",
  ".avi",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".txt",
  ".jpeg",
  ".jpg",
  ".png",
  ".pdf",
];

exports.allowedExtensionsForClient = [".doc", ".docx", ".pdf"];

exports.limits = (resume) => {
  if (resume) {
    return {
      fileSize: 1024 * 1024,
      fieldNameSize: 1024 * 1024,
      fieldSize: 1024 * 1024,
    };
  }
  return {
    fileSize: 1024 * 1024 * 2000,
    fieldNameSize: 1024 * 1024 * 2000,
    fieldSize: 1024 * 1024 * 2000,
  };
};

exports.limitsForClient = {
  fileSize: 1024 * 1024,
  fieldNameSize: 1024 * 1024,
  fieldSize: 1024 * 1024,
};

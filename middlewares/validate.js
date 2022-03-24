module.exports = (validators) => {
  return async (req, reply, done) => {
    for (const validator of validators) {
      await require("./validators/" + validator)(req, reply, done);
    }
  };
};

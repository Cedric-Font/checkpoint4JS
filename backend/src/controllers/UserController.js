const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);

    if (user === null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  read,
};

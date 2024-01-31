const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const liste = await tables.liste.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (liste == null) {
      res.sendStatus(404);
    } else {
      res.json(liste);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const liste = await tables.liste.readAll();

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (liste == null) {
      res.sendStatus(404);
    } else {
      res.json(liste);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const create = async (req, res, next) => {
  const liste = req.body;
  const { user } = req.body;
  const { categorie } = req.body;

  try {
    // Fetch all items from the database
    const listes = await tables.liste.create(liste, categorie, user);
    // Respond with the items in JSON format
    res.json(listes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  read,
  readAll,
  create,
};

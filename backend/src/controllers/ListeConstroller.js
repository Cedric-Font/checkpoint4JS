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

const Modify = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { task } = req.body;
    const { names } = req.body;
    await tables.liste.updateListes(task, names, id);
    res.status(200).send("updated liste");
  } catch (err) {
    console.error(err);
    res.status(500).send("coucou");
    next(err);
  }
};

const Delete = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await tables.liste.read(id);
    if (result === undefined) {
      return res.send("liste not found");
    }
    await tables.liste.deleteListes(id);
    res.status(200).send("liste was delete");
  } catch (err) {
    console.error(err);
    res.status(500).send("doesn t worf from delete controller");
    next(err);
  }
  return res;
};

module.exports = {
  read,
  readAll,
  create,
  Modify,
  Delete,
};

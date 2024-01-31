const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const listeController = require("./controllers/ListeConstroller");
const userController = require("./controllers/UserController");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */

router.get("/listes/:id", listeController.read);
router.get("/listes", listeController.readAll);
router.post("/listes", listeController.create);
router.put("/listes/:id", listeController.Modify);
router.delete("/listes/:id", listeController.Delete);

/* ************************************************************************* */

router.get("/user/:id", userController.read);

module.exports = router;

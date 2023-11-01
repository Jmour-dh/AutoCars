const router = require("express").Router();
const apiUsers = require("./users");
const apiAuth = require("./auth");
const apiCars = require("./voitures");
const apiMar = require("./marques");
const apiNote = require("./notes");

router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/voitures", apiCars);
router.use("/marques", apiMar);
router.use("/notes", apiNote);

module.exports = router;

const router = require("express").Router();
const apiUsers = require("./users");
const apiAuth = require("./auth");
const apiCars = require("./voitures");
const apiMar = require("./marques");
const apiNote = require("./notes");
const apiFilter = require("./filter");

router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/voitures", apiCars);
router.use("/marques", apiMar);
router.use("/notes", apiNote);
router.use("/filter", apiFilter);

module.exports = router;

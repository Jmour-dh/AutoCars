const router = require("express").Router();
const apiUsers = require("./users");
const apiAuth = require("./auth");
const apiCars = require("./voitures");

router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/voitures", apiCars);



module.exports = router;

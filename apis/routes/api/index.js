const router = require("express").Router();
const apiUsers = require("./users");
const apiAuth = require("./auth");
const apiCars = require("./voitures");
const apiMar = require("./marques");
const apiNote = require("./notes");
const apiFilter = require("./filter");
const apiMess = require("./message");
const apiAvis = require("./avis");
const apiAvisNoValid = require("./avisNoValid");
const apiContact = require("./contact");


router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/voitures", apiCars);
router.use("/marques", apiMar);
router.use("/notes", apiNote);
router.use("/filter", apiFilter);
router.use("/message", apiMess);
router.use("/avis", apiAvis);
router.use("/listNoValid", apiAvisNoValid);
router.use("/contact", apiContact);

module.exports = router;

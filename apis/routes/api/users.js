const bcrypt = require("bcrypt");
const pool = require("../../database/queries");
const router = require("express").Router();

router.post("/client", async (req, res) => {
  let { name, lname, email, password } = req.body;
  password = await bcrypt.hash(password, 8);
  pool.query(
    "INSERT INTO users ( email, password, role_id) VALUES ($1, $2, 1) RETURNING *",
    [ email, password],
    (err, results) => {
      if (err) {
        console.log(err);
        if (err.code === 23505) {
          res.status(400).json("Email déjà utilisé");
        } else {
          res.status(400).json("Oops une erreur est survenue");
        }
      }

      res.json(results);
    }
  );
});

module.exports = router;
const pool = require("../../database/queries");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Requête SQL pour récupérer l'utilisateur par email
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 1) {
      const user = rows[0];
      console.log(user);
      if (bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({}, key, {
          subject: user.user_id.toString(),
          expiresIn: 3600 * 24 * 30 * 6,
          algorithm: "RS256",
        });

        // Supprimez le code de gestion des cookies ici et envoyez simplement le token dans la réponse
        res.cookie("token", token, { httpOnly: true });
        res.json(user);
      } else {
        res.status(400).json("Mauvais email/mot de passe");
      }
    } else {
      res.status(400).json("Mauvais email/mot de passe");
    }
  } catch (e) {
    console.error(e);
    res.status(400).json("Mauvais email/mot de passe");
  }
});

router.get("/current", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);

      // Requête SQL pour récupérer l'utilisateur par ID
      const query = "SELECT * FROM users WHERE user_id = $1";
      const { rows } = await pool.query(query, [decodedToken.sub]);

      if (rows.length === 1) {
        const currentUser = rows[0];
        // Supprimez les champs sensibles, comme le mot de passe
        delete currentUser.password;
        delete currentUser.__v;
        res.json(currentUser);
      } else {
        res.json(null);
      }
    } catch (e) {
      console.error(e);
      res.json(null);
    }
  } else {
    res.json(null);
  }
});

router.delete("/", (req, res) => {
  // Supprimez le cookie côté serveur ici si nécessaire
  res.clearCookie("token");
  res.end();
});

module.exports = router;

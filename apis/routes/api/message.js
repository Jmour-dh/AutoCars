const pool = require("../../database/queries");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { nom, prenom,email, voitureid, user_id, objet, message } = req.body;

  pool.query(
    `INSERT INTO message (
       nom,
       prenom,
       email,
       voitureid,
       user_id,
       objet,
       message
    ) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *`,
    [nom, prenom, email, voitureid, user_id, objet, message],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de l'insertion du message :", error);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json(results.rows);
      }
    }
  );
});

module.exports = router;

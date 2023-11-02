const pool = require("../../database/queries");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const {
    nomvisiter,
    prenomvisiter,
    emailvisiter,
    voitureid,
    user_id,
    note,
    commentaire,
    dateavis,
    etat,
  } = req.body;

  pool.query(
    `INSERT INTO avis (
      nomvisiter,
      prenomvisiter,
      emailvisiter,
       voitureid,
       user_id,
       note,
       commentaire,
       dateavis,
       etat
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false) RETURNING *`,
    [
      nomvisiter,
      prenomvisiter,
      emailvisiter,
      voitureid,
      user_id,
      note,
      commentaire,
      dateavis,
    ],
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


router.get("/:voitureId", async (req, res) => {
  try {
    console.log(req.params);

    // Execute a SQL query to select data for the car by ID with active state
    const result = await pool.query("SELECT * FROM avis WHERE voitureid = $1 AND etat = true", [req.params.voitureId]);

    // Handle the result as needed
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération de la voiture par ID :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;

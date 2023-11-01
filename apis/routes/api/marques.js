const pool = require("../../database/queries");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT  marque, imgmarque FROM voiture GROUP BY  marque, imgmarque"
    );
    console.log("resultat en bas ");
    console.log(result);
    const voitures = result.rows;
    res.json(voitures);
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des marques de voiture :",
      err
    );
    res
      .status(500)
      .json({ error: err.message || "Erreur serveur", fullError: err });
  }
});

router.get("/:marque", async (req, res) => {
  try {
    const marque = req.params.marque;
    console.log(req.params);

    // Exécutez une requête SQL pour sélectionner les données de la voiture par ID
    const result = await pool.query(
      `SELECT * FROM voiture WHERE marque = $1  `,
      [marque]
    );
    // Si la voiture est trouvé, renvoyez les données au format JSON
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ error: "Voiture non trouvé" });
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de l'voiture par ID :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;

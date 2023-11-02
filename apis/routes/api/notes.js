const pool = require("../../database/queries");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    // Exécutez une requête SQL pour sélectionner les données de la voiture par ID
    const result = await pool.query(
      `SELECT v.voitureid, v.titre, v.kilometrage, v.anneecirculation, v.carburant, v.image, v.prix, a.note
      FROM voiture v
      INNER JOIN avis a ON v.voitureid = a.voitureid
      WHERE a.note >= 3
      AND a.dateavis = (
        SELECT MAX(dateavis) 
        FROM avis 
        WHERE avis.voitureid = v.voitureid
      );
      `
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

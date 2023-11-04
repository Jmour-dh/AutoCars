const pool = require("../../database/queries");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    // Execute a SQL query to select all reviews with active state
    const result = await pool.query(
      "SELECT avis.*, voiture.voitureid, voiture.titre FROM avis JOIN voiture ON avis.voitureid = voiture.voitureid WHERE avis.etat = false"
    );

    // Handle the result as needed
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des avis :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.put("/:avisId", async (req, res) => {
  try {
    const avisId = parseInt(req.params.avisId);

    // Vérifiez si l'ID de l'avis est un nombre entier valide
    if (isNaN(avisId)) {
      return res.status(400).json({ error: "L'ID de l'avis doit être un nombre entier valide." });
    }

    // Execute a SQL query to update the state to true
    const result = await pool.query(
      "UPDATE avis SET etat = true WHERE avisId = $1 RETURNING *",
      [avisId]
    );

    // Handle the result as needed
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Avis non trouvé." });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'état de l'avis :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



router.delete("/:avisId", async (req, res) => {
  const avisId= req.params.avisId;
  try {
    // Vérifiez si le avis existe
    const avisExists = await pool.query(
      "SELECT * FROM avis WHERE avisid = $1",
      [avisId]
    );
    if (avisExists.rows.length === 0) {
      return res.status(404).json({ error: "Avis non trouvé" });
    }
    // Supprimez le avis
    await pool.query("DELETE FROM avis WHERE avisid = $1", [avisId]);

    res.json({ message: "Avis supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de le message :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression de le message",
    });
  }
});

module.exports = router;

const pool = require("../../database/queries");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { nom, prenom, email, user_id, objet, message } = req.body;

  pool.query(
    `INSERT INTO contact (
       nom,
       prenom,
       email,
       user_id,
       objet,
       message
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nom, prenom, email, user_id, objet, message], // Correction ici
    (error, results) => {
      if (error) {
        console.error("Erreur lors de l'insertion du contact :", error);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json(results.rows);
      }
    }
  );
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contact");
    console.log(result);
    const contacts = result.rows;

    // Répondez avec les données des messages au format JSON
    res.json(contacts);
  } catch (err) {
    console.error("Erreur lors de la récupération des contacts :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  try {
    // Vérifiez si le contact existe
    const contactExists = await pool.query(
      "SELECT * FROM contact WHERE contactid = $1",
      [contactId]
    );

    if (contactExists.rows.length === 0) {
      return res.status(404).json({ error: "Contact non trouvé" });
    }

    // Supprimez le contact
    await pool.query("DELETE FROM contact WHERE contactid = $1", [contactId]);

    res.json({ message: "Contact supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du contact:", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression du contact",
    });
  }
});


module.exports = router;

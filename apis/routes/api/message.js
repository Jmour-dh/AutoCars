const pool = require("../../database/queries");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { nom, prenom, email, voitureid, user_id, objet, message } = req.body;

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

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM message");
    console.log(result);
    const messages = result.rows;

    // Répondez avec les données des messages au format JSON
    res.json(messages);
  } catch (err) {
    console.error("Erreur lors de la récupération des messages :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/:messageId", async (req, res) => {
  const messageId= req.params.messageId;
  try {
    // Vérifiez si le message existe
    const messageExists = await pool.query(
      "SELECT * FROM message WHERE messageid = $1",
      [messageId]
    );
    if (messageExists.rows.length === 0) {
      return res.status(404).json({ error: "Message non trouvé" });
    }
    // Supprimez le message
    await pool.query("DELETE FROM message WHERE messageid = $1", [messageId]);

    res.json({ message: "Message supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de le message :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression de le message",
    });
  }
});

module.exports = router;

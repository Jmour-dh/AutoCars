const bcrypt = require("bcrypt");
const pool = require("../../database/queries");
const router = require("express").Router();

/*requette Client */

router.post("/client", async (req, res) => {
  let {nom, prenom,adresse, email, tel, password } = req.body;
  password = await bcrypt.hash(password, 8);
  pool.query(
    "INSERT INTO users ( nom, prenom,adresse,email, tel, password, role_id) VALUES ($1, $2,$3,$4,$5,$6, 1) RETURNING *",
    [nom, prenom, adresse, email, tel, password],
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

router.get("/client", async (req, res) => {
  try {
    // Exécutez une requête SQL pour sélectionner tous les clients avec role_id = 1
    const result = await pool.query(
      "SELECT * FROM users WHERE role_id = 1"
    );

    // Répondez avec les données des clients au format JSON
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des clients :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/client/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Exécutez une requête SQL pour sélectionner les données de l'utilisateur par ID
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    // Si l'utilisateur est trouvé, renvoyez les données au format JSON
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur par ID :",
      err
    );
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.put("/client/:user_id", async (req, res) => {
  const { nom, prenom, adresse, email, tel } = req.body;
  const userId = parseInt(req.params.user_id, 10);

  if (isNaN(userId) || userId === undefined) {
    res
      .status(400)
      .json("La valeur 'user_id' n'est pas un nombre entier valide");
    return;
  }

  console.log("userId:", userId);

  pool.query(
    "UPDATE users SET nom = $1, prenom = $2, adresse = $3, email = $4, tel = $5 WHERE user_id = $6 RETURNING *",
    [nom, prenom, adresse, email, tel, userId],

    (err, results) => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .json(
            "Oops une erreur est survenue lors de la mise à jour du client"
          );
        return;
      }

      if (results.rowCount === 0) {
        // No user found with the specified user_id
        res.status(404).json("Utilisateur non trouvé");
        return;
      }

      res.json(results.rows[0]);
    }
  );
});

router.delete("/client/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    // Vérifiez si l'utilisateur existe
    const userExists = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );
    if (userExists.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    // Supprimez l'utilisateur
    await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression de l'utilisateur",
    });
  }
});

/*requette Personnel */

router.post("/personnel", async (req, res) => {
  let { nom, prenom, adresse, email, tel, password } = req.body;
  password = await bcrypt.hash(password, 8);
  pool.query(
    "INSERT INTO users (nom,prenom, adresse, email, tel, password, role_id) VALUES ($1,$2,$3,$4,$5,$6, 3) RETURNING *",
    [nom, prenom, adresse, email, tel, password],
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

router.get("/personnel", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT user_id,nom,prenom, adresse, email, tel FROM users WHERE role_id = 3"
    );
    console.log(result);
    const users = result.rows;

    // Répondez avec les données des utilisateurs au format JSON
    res.json(users);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/personnel/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Exécutez une requête SQL pour sélectionner les données de l'utilisateur par ID
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    // Si l'utilisateur est trouvé, renvoyez les données au format JSON
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur par ID :",
      err
    );
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.put("/personnel/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const { nom, prenom, adresse, email, tel } = req.body;

    // Exécutez une requête SQL pour mettre à jour les données de l'utilisateur
    const result = await pool.query(
      "UPDATE users SET nom=$1, prenom=$2, adresse=$3, email=$4, tel=$5 WHERE user_id=$6 RETURNING *",
      [nom, prenom, adresse, email, tel, userId]
    );
    // Répondez avec les données mises à jour de l'utilisateur au format JSON
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/personnel/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    // Vérifiez si l'utilisateur existe
    const userExists = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );
    if (userExists.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    // Supprimez l'utilisateur
    await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression de l'utilisateur",
    });
  }
});

module.exports = router;

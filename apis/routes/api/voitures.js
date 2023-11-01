const pool = require("../../database/queries");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const {
    titre,
    modele,
    marque,
    imgmarque,
    immatriculation,
    description,
    anneefabrication,
    anneecirculation,
    kilometrage,
    image,
    carburant,
    prix,
  } = req.body;

  pool.query(
    `INSERT INTO voiture (
      titre,
      modele,
      marque,
      imgmarque,
      immatriculation,
      description,
      anneefabrication,
      anneecirculation,
      kilometrage,
      image,
      carburant,
      prix
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    [
      titre,
      modele,
      marque,
      imgmarque,
      immatriculation,
      description,
      anneefabrication,
      anneecirculation,
      kilometrage,
      image,
      carburant,
      prix,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        if (err.code === "23505") {
          res.status(400).json("Immatriculation déjà utilisée");
        } else {
          res.status(400).json("Une erreur est survenue");
        }
      }
      res.json(results);
    }
  );
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT voitureid,image,titre,modele,marque,imgmarque,anneefabrication,immatriculation, kilometrage,prix FROM voiture"
    );
    console.log(result);
    const voitures = result.rows;

    // Répondez avec les données des utilisateurs au format JSON
    res.json(voitures);
  } catch (err) {
    console.error("Erreur lors de la récupération des voitures :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/:voitureId", async (req, res) => {
  try {
    const voitureId = req.params.voitureId;
    console.log(req.params);

    // Exécutez une requête SQL pour sélectionner les données de la voiture par ID
    const result = await pool.query(
      "SELECT * FROM voiture WHERE voitureid = $1",
      [voitureId]
    );
    // Si la voiture est trouvé, renvoyez les données au format JSON
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Voiture non trouvé" });
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de l'voiture par ID :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.put("/:voitureId", async (req, res) => {
  try {
    const voitureId = req.params.voitureId;
    const {
      titre,
      modele,
      marque,
      imgmarque,
      immatriculation,
      description,
      anneefabrication,
      anneecirculation,
      kilometrage,
      image,
      carburant,
      prix,
    } = req.body;

    // Exécutez une requête SQL pour mettre à jour les données de la voiture
    const result = await pool.query(
      `UPDATE voiture SET 
      titre=$1, 
      modele=$2,  
      marque=$3, 
      imgmarque=$4, 
      immatriculation=$5,
      description=$6,
      anneefabrication=$7,
      anneecirculation=$8,
      kilometrage=$9,
      image=$10,
      carburant=$11,
      prix=$12
      WHERE voitureid=$13 RETURNING *`,
      [
        titre,
        modele,
        marque,
        imgmarque,
        immatriculation,
        description,
        anneefabrication,
        anneecirculation,
        kilometrage,
        image,
        carburant,
        prix,
        voitureId,
      ]
    );
    // Répondez avec les données mises à jour de la voiture au format JSON
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de la voiture :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/:voitureId", async (req, res) => {
  const voitureId = req.params.voitureId;
  try {
    // Vérifiez si l'utilisateur existe
    const userExists = await pool.query(
      "SELECT * FROM voiture WHERE voitureid = $1",
      [voitureId]
    );
    if (userExists.rows.length === 0) {
      return res.status(404).json({ error: "Voiture non trouvé" });
    }
    // Supprimez l'utilisateur
    await pool.query("DELETE FROM voiture WHERE voitureid = $1", [voitureId]);

    res.json({ message: "Voiture supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la voiture :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression de la voiture",
    });
  }
});

module.exports = router;

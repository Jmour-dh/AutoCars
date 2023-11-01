const pool = require("../../database/queries");
const router = require("express").Router();

router.get("/voitures", async (req, res) => {
  try {
    // Récupérez les filtres depuis les paramètres de requête
    const { marque, kilometrage, anneecirculation } = req.query;

    // Construisez la requête SQL en fonction des filtres fournis
    const filterConditions = [];
    const filterValues = [];

    let paramCount = 1;

    if (marque) {
      filterConditions.push(`marque = $${paramCount}`);
      filterValues.push(marque);
      paramCount++;
    }

    if (kilometrage) {
      filterConditions.push(`kilometrage <= $${paramCount}`);
      filterValues.push(kilometrage);
      paramCount++;
    }

    if (anneecirculation) {
      // Utilisez l'opérateur >= si vous souhaitez inclure les années supérieures
      filterConditions.push(`anneecirculation = $${paramCount}`);
      filterValues.push(anneecirculation);
      paramCount++;
    }

    const filterQuery =
      filterConditions.length > 0
        ? `WHERE ${filterConditions.join(" AND ")}`
        : "";

    const result = await pool.query(
      `SELECT * FROM voiture ${filterQuery} ORDER BY voitureid`,
      filterValues
    );

    const voitures = result.rows;
    res.json(voitures);
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des voitures filtrées :",
      err
    );
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;

// Occasion.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Occasion.module.scss";
import BanniereFilter from "./BanniereFilter";
import { Link } from "react-router-dom";

function Occasion() {
  const [voitures, setVoitures] = useState([]);
  const [filters, setFilters] = useState({
    marque: "",
    kilometrage: "",
    anneecirculation: "",
  });

  const fetchVoitures = async () => {
    try {
      const response = await axios.get("/api/filter/voitures", {
        params: filters,
      });
      setVoitures(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des voitures :", error);
    }
  };

  useEffect(() => {
    fetchVoitures();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.Occasion}>
      <div className={styles.filterSection}>
        <BanniereFilter onFilterChange={handleFilterChange} filters={filters} />
      </div>
      <div className={styles.carsList}>
        <ul>
          {voitures.map((voiture) => (
            <li key={voiture.voitureid}>
              <Link to={`/voitures/${voiture.voitureid}`}>
                <img src={voiture.image} alt={voiture.titre} />
                <div className={styles.details}>
                  <h3>{voiture.titre}</h3>
                  <div className="d-flex justify-content-center">
                    <p className="p-10 m-5 mr-10 border-right">
                      {voiture.anneecirculation}
                    </p>
                    <p className="p-10 m-5 mr-10 border-right">
                      {voiture.kilometrage} km
                    </p>
                    <p className="p-10 m-5 mr-10 border-right">
                      {voiture.carburant}
                    </p>
                  </div>
                  <p className="p-10 m-5 ">{voiture.prix} €</p>
                </div>
              </Link>
            </li>
          
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Occasion;

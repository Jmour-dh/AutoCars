import styles from "./BanniereMarque.module.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BanniereMarque() {
  const [marques, setMarques] = useState([]);

  useEffect(() => {
    axios
      .get("/api/marques")
      .then((response) => {
        console.log("Réponse de l'API :", response.data);
        setMarques(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des marques :", error);
      });
  }, []);

  return (
    <div className={styles.marques}>
    <h2>Les marques les plus populaires</h2>
      <div className={styles.logoMarque}>
      
        {marques[0]
          ? marques.map((marque) => (
              <Link to={`/marques/${marque.marque}`}
                key={marque.voitureid}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <img src={marque.imgmarque} alt="logo" />
                {marque.marque}
              </Link>
            ))
          : ""}
      </div>
    </div>
  );
}

export default BanniereMarque;

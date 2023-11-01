import styles from "./MarqureList.module.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function MarqureList() {
  const { marque } = useParams();
  const [marques, setMarques] = useState([]);

  useEffect(() => {
    // Définir le chemin de l'API en fonction de votre structure
    const apiUrl = `/api/marques/${marque}`;

    // Faire la requête GET avec Axios
    axios
      .get(apiUrl)
      .then((response) => {
        // Mettre à jour le state avec les données reçues
        setMarques(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des marques :", error);
      });
  }, [marque]);
  return (
    <div className={styles.allCars}>
      <h2>Liste des voiture avec la marque {marque}</h2>
      <div className={styles.CarCard}>
        {marques[0]
          ? marques.map((car) => (
              <Link key={car.voitureid}>
                <img
                  src={car.image} alt={car.titre}
                />
                <div className={styles.details}>
                  <h3>{car.titre}</h3>
                  <div className="d-flex  justify-content-center">
                    <p className="p-10 m-5 mr-10 border-right">{car.anneecirculation}</p>
                    <p className="p-10 m-5 mr-10 border-right">{car.kilometrage} km</p>
                    <p className="p-10 m-5 mr-10 border-right">{car.carburant}</p>
                  </div>
                  <p className="p-10 m-5 ">{car.prix} €</p>
                </div>
              </Link>
              
              
            ))
          : ""}
      </div>
    </div>
  );
}

export default MarqureList;
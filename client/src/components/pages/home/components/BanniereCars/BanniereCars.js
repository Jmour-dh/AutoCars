import styles from "./BanniereCars.module.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BanniereCars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("/api/notes")
      .then((response) => {
        console.log("Réponse de l'API :", response.data);
        setCars(response.data.slice(0, 4));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des voitures :", error);
      });
  }, []);

  return (
    <div className={styles.cars}>
      <h2>Les marques les plus populaires</h2>
      <div className={styles.carsList}>
        {cars[0]
          ? cars.map((car) => (
              <Link key={car.voitureid}>
                <img src={car.image} alt={car.titre} />
                <div className={styles.details}>
                  <h3>{car.titre}</h3>
                  <div className="d-flex justify-content-center">
                    <p className="p-10 m-5 mr-10 border-right">
                      {car.anneecirculation}
                    </p>
                    <p className="p-10 m-5 mr-10 border-right">
                      {car.kilometrage} km
                    </p>
                    <p className="p-10 m-5 mr-10 border-right">
                      {car.carburant}
                    </p>
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

export default BanniereCars;

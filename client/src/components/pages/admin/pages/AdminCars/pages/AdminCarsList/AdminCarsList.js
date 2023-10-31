import styles from "./AdminCarsList.module.scss";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function AdminCarsList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("/api/voitures")
      .then((response) => {
        console.log("Réponse de l'API :", response.data);
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des users :", error);
      });
  }, []);

  const handleDelete = async (voitureId) => {
    try {
      if (voitureId === undefined) {
        console.error("L'ID de l'utilisateur est indéfini.");
        return;
      }
      await axios.delete(`/api/voitures/${voitureId}`);
      setCars((prevCars) =>
        prevCars.filter((car) => car.voitureid !== voitureId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la voiture :", error);
    }
  };
  return (
    <div className={styles.userTable}>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Titre</th>
            <th>Modèle</th>
            <th>Marque</th>
            <th>Logo du marque</th>
            <th>Année de fabrication</th>
            <th>Immatriculation</th>
            <th>Kilomètrage</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars[0]
            ? cars.map((car) => (
                <tr key={car.voitureid}>
                  <td className={styles.photo}>
                    <img src={car.image} alt={car.titre} />
                  </td>
                  <td>{car.titre}</td>
                  <td>{car.modele}</td>
                  <td>{car.marque}</td>
                  <td className={styles.logo}>
                    <img src={car.imgmarque} alt={car.titre} />
                  </td>
                  <td>{car.anneefabrication}</td>
                  <td>{car.immatriculation}</td>
                  <td>{car.kilometrage}</td>
                  <td>{car.prix} €</td>
                  <td>
                    <NavLink to={`../editCars/${car.voitureid}`}>
                      <button className="btn1 btn-secondary ">Editer</button>
                    </NavLink>
                    <button
                      onClick={() => handleDelete(car.voitureid)}
                      className="btn1 btn-danger"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCarsList;

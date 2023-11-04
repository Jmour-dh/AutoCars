import React, { useState, useEffect } from "react";
import styles from "./AdminAvisListNoValid.module.scss";
import { BsStarFill } from "react-icons/bs";
import axios from "axios";

function AdminAvisListNoValid() {
  const [avisNoValid, setAvisNoValid] = useState([]);

  useEffect(() => {
    fetchAvisNoValid();
  }, []);

  const fetchAvisNoValid = async () => {
    try {
      const response = await axios.get("/api/listNoValid");
      console.log("Réponse de l'API :", response.data);
      setAvisNoValid(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des avis non valid :", error);
    }
  };

  const handleDelete = async (avisId) => {
    try {
      if (avisId === undefined) {
        console.error("L'ID de l'avis est indéfini.");
        return;
      }

      // Effectuer une requête DELETE à l'API pour supprimer l'avis
      await axios.delete(`/api/listNoValid/${avisId}`);

      // Mettre à jour la liste des avis après la suppression
      fetchAvisNoValid();
    } catch (error) {
      console.error("Erreur lors de la suppression d'avis :", error);
    }
  };

  const handleValidate = async (avisId) => {
    try {
      if (avisId === undefined) {
        console.error("L'ID de l'avis est indéfini.");
        return;
      }

      // Effectuer une requête PUT à l'API pour mettre à jour l'état à true
      await axios.put(`/api/listNoValid/${avisId}`);

      // Mettre à jour la liste des avis après la validation
      fetchAvisNoValid();
    } catch (error) {
      console.error("Erreur lors de la validation d'avis :", error);
    }
  };

  return (
    <div className={styles.userTable}>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Titre de voiture</th>
            <th>Note</th>
            <th>Commentaires</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {avisNoValid[0]
            ? avisNoValid.map((avis) => (
                <tr key={avis.avisid}>
                  <td>{avis.nomvisiter}</td>
                  <td>{avis.prenomvisiter}</td>
                  <td>{avis.emailvisiter}</td>
                  <td>{avis.titre}</td>
                  <td> {[...Array(avis.note)].map((star, index) => (
                          <BsStarFill color="#f39c12" key={index} />
                        ))}</td>
                  <td>{avis.commentaire}</td>
                  <td className={styles.action}>
                    <button
                      onClick={() => handleValidate(avis.avisid)}
                      className="btn1 btn-success"
                    >
                      Valider
                    </button>

                    <button
                      onClick={() => handleDelete(avis.avisid)}
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

export default AdminAvisListNoValid;

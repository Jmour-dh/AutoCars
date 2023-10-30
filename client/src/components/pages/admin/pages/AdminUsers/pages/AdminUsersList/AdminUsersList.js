import styles from "./AdminUsersList.module.scss";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function AdminUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users/client")
      .then((response) => {
        console.log("Réponse de l'API :", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des users :", error);
      });
  }, []);

  const handleDelete = async (userId) => {
    try {
      if (userId === undefined) {
        console.error("L'ID de l'utilisateur est indéfini.");
        return;
      }
  
      // Effectuer une requête DELETE à l'API pour supprimer l'utilisateur
      await axios.delete(`/api/users/client/${userId}`);
  
      // Mettre à jour la liste des users après la suppression
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.user_id !== userId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };
  return (
    <div className={styles.userTable}>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users[0]
            ? users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.adresse}</td>
                  <td>{user.email}</td>
                  <td>{user.tel}</td>
                  <td className={styles.action}>
                    <NavLink to={`../editUser/${user.user_id}`}>
                      <button className="btn1 btn-secondary ">Editer</button>
                    </NavLink>

                    <button
                      onClick={() => handleDelete(user.user_id)}
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

export default AdminUsersList;

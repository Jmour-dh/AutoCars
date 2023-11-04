import React, { useState, useEffect } from "react";
import styles from "./AdminMessageList.module.scss";
import axios from "axios";

function AdminMessageList() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios
      .get("/api/message")
      .then((response) => {
        console.log("Réponse de l'API :", response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des message :", error);
      });
  }, []);

  const handleDelete = async (messageId) => {
    try {
      if (messageId === undefined) {
        console.error("L'ID de message est indéfini.");
        return;
      }

      // Effectuer une requête DELETE à l'API pour supprimer le message
      await axios.delete(`/api/message/${messageId}`);

      // Mettre à jour la liste des messages après la suppression
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.messageid !== messageId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de message :", error);
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
            <th>Objet</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages[0]
            ? messages.map((message) => (
                <tr key={message.messageid}>
                  <td>{message.nom}</td>
                  <td>{message.prenom}</td>
                  <td>{message.email}</td>
                  <td>{message.objet}</td>
                  <td>{message.message}</td>
                  <td className={styles.action}>
                    <button
                      onClick={() => handleDelete(message.messageid)}
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

export default AdminMessageList;

import React, { useState, useEffect } from "react";
import styles from "./AdmonContactsList.module.scss";
import axios from "axios";

function AdminContactsList() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/contact")
      .then((response) => {
        console.log("Réponse de l'API :", response.data);
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des contacts :", error);
      });
  }, []);

  const handleDelete = async (contactId) => {
    try {
      if (contactId === undefined) {
        console.error("L'ID de contact est indéfini.");
        return;
      }

      // Effectuer une requête DELETE à l'API pour supprimer le contact
      await axios.delete(`/api/contact/${contactId}`);

      // Mettre à jour la liste des contacts après la suppression
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.contactid !== contactId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de contact :", error);
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
          {contacts[0]
            ? contacts.map((contact) => (
                <tr key={contact.contactid}>
                  <td>{contact.nom}</td>
                  <td>{contact.prenom}</td>
                  <td>{contact.email}</td>
                  <td>{contact.objet}</td>
                  <td>{contact.message}</td>
                  <td className={styles.action}>
                    <button
                      onClick={() => handleDelete(contact.contactid)}
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

export default AdminContactsList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Effectue une requête GET à l'API pour récupérer la liste des contacts
    axios.get('/api/contacts')
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des contacts :', error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des Contacts</h1>
      <ol>
        {contacts.map((contact) => (
          <li key={contact.id}>
            Nom: {contact.name} {contact.lname}, Email: {contact.email}, Téléphone: {contact.phone}, Message: {contact.msg}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default AdminContacts;

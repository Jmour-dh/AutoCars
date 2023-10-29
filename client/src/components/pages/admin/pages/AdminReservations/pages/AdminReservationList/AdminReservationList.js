import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminReservationList() {
  const [reserves, setReserves] = useState([]);
  useEffect(() => {
    // Effectue une requête GET à l'API pour récupérer la liste des réservations avec les détails des utilisateurs
    axios.get('/api/reserver')
      .then((response) => {
        setReserves(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des réservations :', error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des Réservations et Utilisateurs</h1>
      <ul>
        {reserves.map((reserve) => (
          <li key={reserve.id}>
            {/* Affichez les détails de la réservation */}
            <strong>Réservation:</strong> 
            Date In: {reserve.datein}, Date Out: {reserve.dateout}, 
            Adultes: {reserve.adulte}, Enfants: {reserve.enfant}, Chambre: {reserve.chambre}

            <div>
              <strong>Utilisateur:</strong> Nom: {reserve.user_name}, Prénom: {reserve.user_lname}, Email: {reserve.user_email}, ...
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminReservationList;

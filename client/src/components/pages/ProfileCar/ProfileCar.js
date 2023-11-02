// Importez les dépendances nécessaires
import React, { useState, useEffect } from "react";
import styles from "./ProfileCar.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

import { useContext } from "react";
import { AuthContext } from "../../context";

// Composant de la page de détail de la voiture
function ProfileCar() {
  const { user } = useContext(AuthContext);
  const { voitureId } = useParams(); // Obtenez l'ID de la voiture depuis les paramètres de l'URL
  const [voiture, setVoiture] = useState({});
  const navigate = useNavigate();

  const [showTelephoneModal, setShowTelephoneModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    subject: `Intérêt pour la voiture ${voiture.titre}`,
  });

  useEffect(() => {
    // Effectuez la requête uniquement si l'ID de la voiture est défini
    if (voitureId) {
      const fetchVoiture = async () => {
        try {
          const response = await axios.get(`/api/voitures/${voitureId}`);
          setVoiture(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de la voiture par ID :",
            error
          );
          // Gérez l'erreur selon vos besoins
        }
      };

      fetchVoiture();
    }
  }, [voitureId]); // Assurez-vous de dépendre de voitureId pour recharger les données lorsque l'ID change

  // Affichez un message si l'ID de la voiture n'est pas défini
  if (!voitureId) {
    return (
      <div>Aucune voiture sélectionnée. Veuillez sélectionner une voiture.</div>
    );
  }

  const handleTelephoneClick = () => {
    // Affichez la modal lorsque le bouton "Téléphone" est cliqué
    setShowTelephoneModal(true);
  };

  const handleMessageClick = () => {
    // Affichez la modal lorsque le bouton "Message" est cliqué
    setShowMessageModal(true);
    const subject = `Intérêt pour la voiture ${voiture.titre} `;

    // Mettez à jour les informations de contact avec le nouveau sujet
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      subject,
    }));
  };

  const handleCloseTelephoneModal = () => {
    // Fermez la modal Téléphone
    setShowTelephoneModal(false);
  };

  const handleCloseMessageModal = () => {
    // Fermez la modal Message
    setShowMessageModal(false);
  };

  const handleInputChange = (e) => {
    // Mettez à jour les informations de contact lorsque les champs sont modifiés
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleInputClick = (e) => {
    // Empêchez la propagation de l'événement de clic
    e.stopPropagation();
  };

  const handleSendMessage = async () => {
    try {
      // Construire l'objet à envoyer dans la requête POST
      const messageData = {
        nom: user ? user.nom : contactInfo.lastName,
        prenom: user ? user.prenom : contactInfo.firstName,
        voitureid: voitureId,
        user_id: user ? user.user_id : null,
        objet: contactInfo.subject,
        message: contactInfo.message,
      };

      // Envoyer la requête POST avec Axios
      const response = await axios.post("/api/message", messageData);

      // Logique à exécuter après l'envoi du message (par exemple, fermer la modal)
      console.log("Message envoyé avec succès !", response.data);
      handleCloseMessageModal();
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      // Gérer l'erreur selon vos besoins (afficher un message d'erreur, etc.)
    }
  };

  return (
    <>
      <div className={styles.titre}>
        <Link className="btn btn-primary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="m-5" />
          Retour
        </Link>
        <h2>Details de la voiture</h2>
      </div>
      <div className={styles.detailsVoi}>
        <div className={styles.DescImg}>
          <img src={voiture.image} alt={voiture.titre} />
          <p className="p-10">{voiture.description}</p>
        </div>
        <div className={styles.Voi}>
          <div className={styles.details}>
            <h3>{voiture.titre}</h3>
            <div className="d-flex justify-content-center">
              <p className="p-10 m-5 mr-10 border-right">
                {voiture.anneecirculation}
              </p>
              <p className="p-10 m-5 mr-10 border-right">
                {voiture.kilometrage} km
              </p>
              <p className="p-10 m-5 mr-10 border-right">{voiture.carburant}</p>
            </div>
            <p className="p-10 m-5 ">{voiture.prix} €</p>
            <div className={styles.contact}>
              <button
                className="btn  btn-success m-5"
                onClick={handleTelephoneClick}
              >
                Télephone
              </button>
              <button
                className="btn btn-secondary  m-5"
                onClick={handleMessageClick}
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour afficher le numéro de téléphone */}
      {showTelephoneModal && (
        <div
          className={styles.modalBackdrop}
          onClick={handleCloseTelephoneModal}
        >
          <div className={styles.modalContent}>
            <p>Numéro de téléphone : 02 65 58 47</p>
            <button
              className="btn btn-danger"
              onClick={handleCloseTelephoneModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour envoyer un message */}
      {showMessageModal && (
        <div className={styles.modalBackdrop} onClick={handleCloseMessageModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Envoyer un message</h3>
            {user ? (
              <>
                <div className="mb-3">
                  <label htmlFor="message" className={styles.formLabel}>
                    Message
                  </label>
                  <textarea
                    className={styles.formControl}
                    id="message"
                    name="message"
                    onClick={handleInputClick} // Empêcher la propagation de l'événement de clic
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button
                  className="btn2 btn-primary"
                  onClick={handleSendMessage}
                >
                  Envoyer
                </button>
                <button
                  className="btn2 btn-danger"
                  onClick={handleCloseMessageModal}
                >
                  Fermer
                </button>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="firstName" className={styles.formLabel}>
                    Prénom
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="firstName"
                    name="firstName"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className={styles.formLabel}>
                    Nom
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="lastName"
                    name="lastName"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    className={styles.formControl}
                    id="email"
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className={styles.formLabel}>
                    Message
                  </label>
                  <textarea
                    className={styles.formControl}
                    id="message"
                    name="message"
                    onClick={handleInputClick} // Empêcher la propagation de l'événement de clic
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button
                  className="btn2 btn-primary"
                  onClick={handleSendMessage}
                >
                  Envoyer
                </button>
                <button
                  className="btn2 btn-danger"
                  onClick={handleCloseMessageModal}
                >
                  Fermer
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCar;

import React, { useState, useEffect } from "react";
import styles from "./ProfileCar.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { BsStarFill } from "react-icons/bs";

import { format } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../../context";

import { parseISO, isValid } from "date-fns";

function ProfileCar() {
  const { user } = useContext(AuthContext);
  const { voitureId } = useParams();
  const [voiture, setVoiture] = useState({});
  const [avisList, setAvisList] = useState([]);
  const [selectedStar, setSelectedStar] = useState(0);
  const [avisEnvoye, setAvisEnvoye] = useState(false);

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

  const initialAvisState = {
    note: 0,
    commentaire: "",
    nomvisiteur: "", 
    prenomvisiteur: "", 
    emailvisiteur: "", 
  };

  const [avis, setAvis] = useState(initialAvisState);

  const [hoveredStars, setHoveredStars] = useState(0);

  useEffect(() => {
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
        }
      };

      const fetchAvis = async () => {
        try {
          const response = await axios.get(`/api/avis/${voitureId}`);
          setAvisList(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des avis :", error);
        }
      };

      fetchVoiture();
      fetchAvis();
    }
  }, [voitureId]);

  if (!voitureId) {
    return (
      <div>Aucune voiture sélectionnée. Veuillez sélectionner une voiture.</div>
    );
  }

  const userInfo = user
    ? {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        user_id: user.user_id,
      }
    : {
        nom: contactInfo.lastName,
        prenom: contactInfo.firstName,
        email: contactInfo.email,
        user_id: null,
      };

  const handleTelephoneClick = () => {
    setShowTelephoneModal(true);
  };

  const handleMessageClick = () => {
    setShowMessageModal(true);
    const subject = `Intérêt pour la voiture ${voiture.titre}`;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      subject,
    }));
  };

  const handleCloseTelephoneModal = () => {
    setShowTelephoneModal(false);
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAvisInputChange = (e) => {
    const { name, value } = e.target;
    setAvis((prevAvis) => ({
      ...prevAvis,
      [name]: value,
    }));
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleSendMessage = async () => {
    try {
      const messageData = {
        ...userInfo,
        voitureid: voitureId,
        objet: contactInfo.subject,
        message: contactInfo.message,
      };

      const response = await axios.post("/api/message", messageData);

      console.log("Message envoyé avec succès !", response.data);
      handleCloseMessageModal();
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  const handleSendAvis = async (e) => {
    e.preventDefault();

    try {
      if (avis.note && avis.commentaire) {
        const avisData = {
          ...userInfo,
          voitureid: voitureId,
          note: avis.note,
          commentaire: avis.commentaire,
          dateavis: new Date(),
        };

        if (user) {
          // Utilisateur connecté, utilisez les informations du contexte d'authentification
          avisData.user_id = user.user_id;
          avisData.nomvisiter = user.nom;
          avisData.prenomvisiter = user.prenom;
          avisData.emailvisiter = user.email;
        } else {
          // Utilisateur non connecté, utilisez les informations de contactInfo
          avisData.user_id = null;
          avisData.nomvisiter = avis.nomvisiteur;
          avisData.prenomvisiter = avis.prenomvisiteur;
          avisData.emailvisiter = avis.emailvisiteur;
        }

        const response = await axios.post("/api/avis", avisData);

        console.log("Avis envoyé avec succès !", response.data);
        setAvisEnvoye(true);
        setAvis(initialAvisState); // Réinitialiser les champs du formulaire
        setSelectedStar(0);
        setHoveredStars(0);
      } else {
        console.log("Veuillez remplir tous les champs obligatoires");
        setSelectedStar(0);
        setHoveredStars(0);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis :", error);
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
                className="btn btn-success m-5"
                onClick={handleTelephoneClick}
              >
                Télephone
              </button>
              <button
                className="btn btn-secondary m-5"
                onClick={handleMessageClick}
              >
                Message
              </button>
            </div>
          </div>
          <div className={styles.avisLists}>
            <h3>Avis des utilisateurs</h3>
            {avisList.length > 0 ? (
              <ul>
                {avisList.map((avis) => (
                  <li key={avis.id} className={styles.avisItem}>
                    <p className="p-5">
                      <span className={styles.avisUser}>
                        {avis.prenomvisiter}
                      </span>
                      a donné une note de
                      <span className={styles.avisStars}>
                        {[...Array(avis.note)].map((star, index) => (
                          <BsStarFill color="#f39c12" key={index} />
                        ))}
                      </span>
                    </p>
                    <p className="p-5">Commentaire: {avis.commentaire}</p>
                    <p className="p-5">
                      Date:{" "}
                      {isValid(parseISO(avis.dateavis))
                        ? format(parseISO(avis.dateavis), "dd/MM/yyyy HH:mm:ss")
                        : "Date non valide"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun avis disponible pour le moment.</p>
            )}

            <div className={styles.laisserAvis}>
              <h3>Laissez votre avis</h3>

              {!avisEnvoye ? (
                <>
                  <form onSubmit={handleSendAvis}>
                    <div className={styles.stars}>
                      {[1, 2, 3, 4, 5].map((index) => (
                        <BsStarFill
                          key={index}
                          className={`${styles.star} ${
                            index <= (hoveredStars || selectedStar)
                              ? styles.hovered
                              : ""
                          }`}
                          onClick={() => {
                            setAvis((prevAvis) => ({
                              ...prevAvis,
                              note: index,
                            }));
                            setSelectedStar(index);
                          }}
                          onMouseEnter={() => setHoveredStars(index)}
                          onMouseLeave={() => setHoveredStars(0)}
                        />
                      ))}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="commentaire" className={styles.formLabel}>
                        Commentaire
                      </label>
                      <textarea
                        className={styles.formControl}
                        id="commentaire"
                        name="commentaire"
                        onClick={handleInputClick}
                        onChange={handleAvisInputChange}
                      ></textarea>
                    </div>
                    {!user && (
                      <>
                        <div className="mb-3">
                          <label
                            htmlFor="nomvisiteur"
                            className={styles.formLabel}
                          >
                            Nom
                          </label>
                          <input
                            type="text"
                            className={styles.formControl}
                            id="nomvisiteur"
                            name="nomvisiteur"
                            value={avis.nomvisiteur}
                            onChange={handleAvisInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="prenomvisiteur"
                            className={styles.formLabel}
                          >
                            Prénom
                          </label>
                          <input
                            type="text"
                            className={styles.formControl}
                            id="prenomvisiteur"
                            name="prenomvisiteur"
                            value={avis.prenomvisiteur}
                            onChange={handleAvisInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="emailvisiteur"
                            className={styles.formLabel}
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className={styles.formControl}
                            id="emailvisiteur"
                            name="emailvisiteur"
                            value={avis.emailvisiteur}
                            onChange={handleAvisInputChange}
                          />
                        </div>
                      </>
                    )}
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSendAvis}
                      >
                        Envoyer l'avis
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <p>Votre avis a été envoyé avec succès !</p>
              )}
            </div>
          </div>
        </div>
      </div>

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

      {showMessageModal && (
        <div className={styles.modalBackdrop} onClick={handleCloseMessageModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
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
                    onClick={handleInputClick}
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
                    onClick={handleInputClick}
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

import React, { useContext, useState } from "react";
import styles from "./BanniereContact.module.scss";
import { AuthContext } from "../../../context";
import axios from "axios";

// ... (autres imports)

function BanniereContact() {
  const { user } = useContext(AuthContext);

  // État du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    objet: "",
    message: "",
  });

  // Gestion des changements dans les champs du formulaire
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Utilisez userInfo pour récupérer les données correctes
    const dataToSend = {
      nom: userInfo.nom,
      prenom: userInfo.prenom,
      email: userInfo.email,
      objet: formData.objet,
      message: formData.message,
      user_id: userInfo.user_id,
    };

    try {
      // Requête POST vers le serveur
      const response = await axios.post("/api/contact", dataToSend);

      // Gérer la réponse du serveur si nécessaire
      console.log(response.data);

      // Réinitialiser le formulaire après la soumission
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        objet: "",
        message: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  };

  const userInfo = user
    ? {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        user_id: user.user_id,
      }
    : {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        user_id: null,
      };

  return (
    <div className={styles.BanContact}>
      <h2>Contactez-Nous</h2>
      <div className={styles.ctcContainer}>
        <div className={styles.contact}>
          {user ? (
            <form onSubmit={handleSubmit}>
              <div className={styles.form}>
                <div className="mb-3 d-flex flex-column align-items-center">
                  <label htmlFor="objet" className={styles.formLabel}>
                    Objet
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="objet"
                    name="objet"
                    value={formData.objet}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                  <label htmlFor="message" className={styles.formLabel}>
                    Message
                  </label>
                  <textarea
                    className={styles.formControl}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn2 btn-primary">
                Envoyer
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.form}>
                <div className="mb-3 d-flex flex-column align-items-center">
                  <label htmlFor="nom" className={styles.formLabel}>
                    Nom
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                  <label htmlFor="prenom" className={styles.formLabel}>
                    Prénom
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                  <label htmlFor="email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    className={styles.formControl}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                  <label htmlFor="objet" className={styles.formLabel}>
                    Objet
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="objet"
                    name="objet"
                    value={formData.objet}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                  <label htmlFor="message" className={styles.formLabel}>
                    Message
                  </label>
                  <textarea
                    className={styles.formControl}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn2 btn-primary">
                Envoyer
              </button>
            </form>
          )}
        </div>
        <div className={styles.card}>
          <h3>Horaire d'ouverture</h3>
          <p>Lun: 08:45 - 12:00, 14:00 - 18:00 </p>
          <p>Mar: 08:45 - 12:00, 14:00 - 18:00 </p>
          <p>Jeu: 08:45 - 12:00, 14:00 - 18:00 </p>
          <p>Vend: 08:45 - 12:00, 14:00 - 18:00 </p>
          <p>Sam: 08:45 - 12:00, 14:00 - 18:00 </p>
          <p>Dim: Fermé </p>
          <h3>Notre adresse</h3>
          <p>Auto Cars, 32 Rue de Nantes, Lyon </p>
        </div>
      </div>
    </div>
  );
}

export default BanniereContact;

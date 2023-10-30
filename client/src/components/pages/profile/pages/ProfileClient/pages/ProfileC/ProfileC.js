import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../../../../context";
import { useContext } from "react";

function ProfileC() {
  const { user } = useContext(AuthContext);
  const userId = user.user_id;

  return (
    <div style={{ width: 400 }}>
      "Optimisez votre expérience dès maintenant ! Remplissez vos coordonnées
      pour accéder à des offres exclusives et des avantages personnalisés. Votre
      satisfaction est notre priorité, et nous sommes impatients de vous offrir
      un service exceptionnel. Remplissez vos informations dès aujourd'hui et
      découvrez une nouvelle dimension de confort et d'excellence."
      <NavLink to={`../editClient/${userId}`}>
        <button className="btn btn-primary mr-15">Editer</button>
      </NavLink>
    </div>
  );
}

export default ProfileC;

import "./AdminUsersEdit.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";

function AdminUsersEdit() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const validationSchema = yup.object({
    nom: yup
      .string()
      .required("Il faut préciser votre nom")
      .min(2, "Un vrai nom"),
    prenom: yup
      .string()
      .required("Il faut préciser votre prénom")
      .min(2, "Un vrai prénom"),
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide"),
    adresse: yup.string().required("Il faut préciser votre adresse"),
    tel: yup.string().required("Il faut préciser votre numéro de téléphone"),
  });

  const initialValues = {
    nom: "",
    prenom: "",
    adresse: "",
    email: "",
    tel: "",
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await axios.get(`/api/users/client/${userId}`);
        const user = response.data;
        // Pré-remplir le formulaire avec les détails du user
        Object.keys(user).forEach((key) => {
          setValue(key, user[key]);
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du user par ID :",
          error
        );
      }
    };

    fetchUserById();
  }, [userId, setValue]);

  const submit = handleSubmit(async (user) => {
    try {
      clearErrors();
      // Envoyez la mise à jour au backend
      await axios.put(`/api/users/client/${userId}`, user);
      navigate("/admin/users/list");
    } catch (error) {
      setError("generic", { type: "generic", message: error.message });
    }
  });
  return (
    <form onSubmit={submit}>
      <div className="mb-10 d-flex flex-column">
        <label htmlFor="nom" className="mb-10">
          Nom :
        </label>
        <input
          type="text"
          name="nom"
          placeholder="Entrez votre Nom..."
          {...register("nom")}
        />
        {errors.nom && <p className="form-error">{errors.nom.message}</p>}
      </div>
      <div className="mb-10 d-flex flex-column">
        <label htmlFor="pernom" className="mb-10">
          Prénom :
        </label>
        <input
          type="text"
          name="prenom"
          placeholder="Entrez votre Prénom..."
          {...register("prenom")}
        />
        {errors.prenom && <p className="form-error">{errors.prenom.message}</p>}
      </div>
      <div className="mb-10 d-flex flex-column">
        <label htmlFor="adresse" className="mb-10">
          Adresse :
        </label>
        <input
          type="text"
          name="adresse"
          placeholder="Entrez votre Adresse..."
          {...register("adresse")}
        />
        {errors.adresse && (
          <p className="form-error">{errors.adresse.message}</p>
        )}
      </div>
      <div className="mb-10 d-flex flex-column">
        <label htmlFor="email" className="mb-10">
          Email :
        </label>
        <input
          type="text"
          name="email"
          placeholder="Entrez votre Email... "
          {...register("email")}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>
      <div className="mb-10 d-flex flex-column">
        <label htmlFor="tel" className="mb-10">
          Numéro de téléphone :
        </label>
        <input
          type="text"
          name="tel"
          placeholder="Entrez votre Tel..."
          {...register("tel")}
        />
        {errors.tel && <p className="form-error">{errors.tel.message}</p>}
      </div>
      {errors.generic && (
        <div className="mb-10">
          <p className="form-error">{errors.generic.message}</p>
        </div>
      )}
      <button disabled={isSubmitting} className="btn btn-primary  m-10">
        Enregister les modifications
      </button>
    </form>
  )
}

export default AdminUsersEdit
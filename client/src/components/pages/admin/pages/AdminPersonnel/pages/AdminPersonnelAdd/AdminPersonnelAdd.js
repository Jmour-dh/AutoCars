import React from "react";
import  "./AdminPersonnelAdd.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createPersonnel } from "../../../../../../../apis/users";

function AdminPersonnelAdd() {
  const navigate = useNavigate();
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
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
  });

  const initialValues = {
    nom: "",
    prenom: "",
    adresse: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });
  const submit = handleSubmit(async (personnel) => {
    try {
      clearErrors();
      await createPersonnel(personnel);
      navigate("/admin/personnels/list");
    } catch (message) {
      setError("generic", { type: "generic", message });
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
      <div className="mb-10 d-flex flex-column">
        <label htmlFor="password" className="mb-10">
          Mot de passe :
        </label>
        <input
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe..."
          {...register("password")}
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-10 d-flex flex-column">
        <label htmlFor="name" className="mb-10">
          Vérification de mot de passe :
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Entrez votre mot de passe..."
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="form-error">{errors.confirmPassword.message}</p>
        )}
      </div>
      {errors.generic && (
        <div className="mb-10">
          <p className="form-error">{errors.generic.message}</p>
        </div>
      )}
      <button disabled={isSubmitting} className="btn btn-primary  m-10">
        Enregister
      </button>
    </form>
  );
}

export default AdminPersonnelAdd;

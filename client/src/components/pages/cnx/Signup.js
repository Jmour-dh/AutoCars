import React from "react";
import styles from "./Signup.module.scss";
import ImgLogo from "../../../assets/images/Logo.png";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../apis/users";

function Signup() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide"),
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
    email: "",
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
  const submit = handleSubmit(async (user) => {
    try {
      clearErrors();
      await createUser(user);
      navigate("/signin");
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });
  return (
    <div className={styles.ins}>
      <div className={styles.signup}>
        <img className={styles.logo} src={ImgLogo} alt="logo" />
        <h2>Inscription</h2>
        <span>
          Vous y être presque! <br />
          Parlez-nous un peu plus de vous
        </span>
        <form onSubmit={submit} className={styles.form}>
          <div className="mb-10 d-flex flex-column">
            <label htmlFor="email" className="mb-10">
              Email :
            </label>
            <input
              type="text"
              name="email"
              placeholder="Entrez votre mail..."
              {...register("email")}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
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
          <div className="d-flex justify-content-center ">
            <button disabled={isSubmitting} className="btn btn-primary  m-10">
              Valider
            </button>
          </div>
        </form>
        <div className="p-10">
          <p>
            Déja Inscrit ?{" "}
            <NavLink className={styles.linkIns} to="/signin">
              Connectez-vous
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

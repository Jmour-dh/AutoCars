import React from "react";
import "./AdminCarsAdd.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createVoiture } from "../../../../../../../apis/voitures";

function AdminCarsAdd() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    titre: yup.string().required("Il faut préciser le titre"),
    modele: yup.string().required("Il faut préciser le modele"),
    marque: yup.string().required("Il faut préciser la marque"),
    imgmarque: yup.string().required("Il faut préciser le logo"),
    immatriculation: yup
      .string()
      .required("Il faut préciser l'immatriculation"),
    description: yup.string().required("Il faut préciser la discription"),
    anneefabrication: yup
      .number()
      .required("Il faut préciser l'année de fabrication"),
    anneecirculation: yup
      .number()
      .required("Il faut préciser l'année de circulation"),
    kilometrage: yup.number().required("Il faut préciser le kilomètrage"),
    image: yup.string().required("Il faut préciser l'image de la voiture"),
    carburant: yup.string().required("Il faut préciser le carburant"),
    prix: yup.number().required("Il préciser le prix"),
  });

  const initialValues = {
    marque: "",
    imgmarque: "",
    immatriculation: "",
    description: "",
    anneefabrication: "",
    anneecirculation: "",
    kilometrage: "",
    image: "",
    carburant: "",
    prix: "",
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
      await createVoiture(personnel);
      navigate("/admin/cars/list");
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <form onSubmit={submit}>
      <div className="mb-10 d-flex flex-column">
        <label htmlFor="titre" className="mb-10">
          Titre :
        </label>
        <input
          type="text"
          name="titre"
          placeholder="Entrez votre Nom..."
          {...register("titre")}
        />
        {errors.titre && <p className="form-error">{errors.titre.message}</p>}
      </div>
      <div className=" d-flex flex-column">
        <label htmlFor="modele">Modèle :</label>
        <input
          type="text"
          name="modele"
          placeholder="Entrez le modèle..."
          {...register("modele")}
        />
        {errors.modele && <p className="form-error">{errors.modele.message}</p>}
      </div>
      <div className=" d-flex flex-column">
        <label htmlFor="marque">Marque :</label>
        <input
          type="text"
          name="marque"
          placeholder="Entrez  la marque..."
          {...register("marque")}
        />
        {errors.marque && <p className="form-error">{errors.marque.message}</p>}
      </div>
      <div className=" d-flex flex-column">
        <label htmlFor="imgmarque">Logo :</label>
        <input
          type="text"
          name="imgmarque"
          placeholder="Entrez le logo de la marque..."
          {...register("imgmarque")}
        />
        {errors.imgmarque && (
          <p className="form-error">{errors.imgmarque.message}</p>
        )}
      </div>
      <div className=" d-flex flex-column">
        <label htmlFor="immatriculation">Immatriculation :</label>
        <input
          type="text"
          name="immatriculation"
          placeholder="Entrez l'immatriculation... "
          {...register("immatriculation")}
        />
        {errors.immatriculation && (
          <p className="form-error">{errors.immatriculation.message}</p>
        )}
      </div>
      <div className=" d-flex flex-column">
        <label htmlFor="description">Description :</label>
        <input
          type="text"
          name="description"
          placeholder="Entrez la description..."
          {...register("description")}
        />
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="anneefabrication">Année de fabrication :</label>
        <input
          type="number"
          name="anneefabrication"
          placeholder="Entrez votre mot de passe..."
          {...register("anneefabrication")}
        />
        {errors.anneefabrication && (
          <p className="form-error">{errors.anneefabrication.message}</p>
        )}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="name">Année de circulation :</label>
        <input
          type="number"
          name="anneecirculation"
          placeholder="Entrez votre mot de passe..."
          {...register("anneecirculation")}
        />
        {errors.anneecirculation && (
          <p className="form-error">{errors.anneecirculation.message}</p>
        )}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="kilometrage">Kilomètrage :</label>
        <input
          type="number"
          name="kilometrage"
          placeholder="Entrez le kilomètrage..."
          {...register("kilometrage")}
        />
        {errors.kilometrage && (
          <p className="form-error">{errors.kilometrage.message}</p>
        )}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="image">Image de voiture :</label>
        <input
          type="text"
          name="image"
          placeholder="Entrez l'image..."
          {...register("image")}
        />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="carburant">Carburant :</label>
        <input
          type="text"
          name="carburant"
          placeholder="Il faut précisè le carburant..."
          {...register("carburant")}
        />
        {errors.carburant && (
          <p className="form-error">{errors.carburant.message}</p>
        )}
      </div>
      <div className=" d-flex flex-column">
        <label htmlFor="name">Prix :</label>
        <input
          type="number"
          name="prix"
          placeholder="Entrez le prix..."
          {...register("prix")}
        />
        {errors.prix && <p className="form-error">{errors.prix.message}</p>}
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

export default AdminCarsAdd;

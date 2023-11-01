// BanniereFilter.jsx
import React, { useState, useEffect } from "react";
import styles from "./BanniereFilter.module.scss";
import axios from "axios";

function BanniereFilter({ onFilterChange, filters }) {
  const [marqueFilter, setMarqueFilter] = useState(filters.marque);
  const [kilometrageFilter, setKilometrageFilter] = useState(
    filters.kilometrage
  );
  const [anneecirculationFilter, setAnneecirculationFilter] = useState(
    filters.anneecirculation
  );
  const [marques, setMarques] = useState([]);
  const [kilometrageIntervals, setKilometrageIntervals] = useState([
    { label: "0-50000", value: "50000", checked: false },
    { label: "50001-100000", value: "100000", checked: false },
    { label: "100001+", value: "500000", checked: false },
  ]);

  const [annees, setAnnees] = useState([]);

  useEffect(() => {
    // Charger la liste des marques et des années au montage du composant
    fetchMarques();
    fetchAnnees();
  }, []);

  const fetchMarques = async () => {
    try {
      const response = await axios.get("/api/marques");
      setMarques(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des marques :", error);
    }
  };

  const fetchAnnees = () => {
    const currentYear = new Date().getFullYear();
    const anneesArray = Array.from(
      { length: currentYear - 2009 },
      (_, index) => currentYear - index
    ).sort((a, b) => a - b); // Tri croissant
  
    setAnnees(anneesArray);
  };

  const handleFilterChange = () => {
    onFilterChange({
      marque: marqueFilter,
      kilometrage: getSelectedKilometrage(),
      anneecirculation: anneecirculationFilter,
    });
  };

  const getSelectedKilometrage = () => {
    const selectedIntervals = kilometrageIntervals.filter(
      (interval) => interval.checked
    );

    const selectedValues = selectedIntervals.map((interval) => interval.value);
    return selectedValues.join(",");
  };

  const toggleKilometrageInterval = (value) => {
    const updatedIntervals = kilometrageIntervals.map(
      (interval) =>
        interval.value === value
          ? { ...interval, checked: !interval.checked }
          : { ...interval, checked: false } // Assurez-vous qu'une seule case est cochée
    );
    setKilometrageIntervals(updatedIntervals);
  };

  return (
    <div className={styles.BanniereFilter}>
      <h2>Filtrer par :</h2>
      <label>
        Marque :
        <select
          value={marqueFilter}
          onChange={(e) => setMarqueFilter(e.target.value)}
        >
          <option value="">Sélectionnez une marque</option>
          {marques.map((marque) => (
            <option key={marque.marque} value={marque.marque}>
              {marque.marque}
            </option>
          ))}
        </select>
      </label>
      <label>
        Kilométrage :
        {kilometrageIntervals.map((interval) => (
          <div key={interval.value}>
            <input
              type="checkbox"
              checked={interval.checked || false}
              onChange={() => toggleKilometrageInterval(interval.value)}
            />
            <span>{interval.label}</span>
          </div>
        ))}
      </label>
      <label>
        Année de circulation :
        <select
          value={anneecirculationFilter}
          onChange={(e) => setAnneecirculationFilter(e.target.value)}
        >
          <option value="">Sélectionnez une année</option>
          {annees.map((annee) => (
            <option key={annee} value={annee}>
              {annee}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleFilterChange}>Appliquer le filtre</button>
    </div>
  );
}

export default BanniereFilter;

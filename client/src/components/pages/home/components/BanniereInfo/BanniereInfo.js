import React from "react";
import styles from "./BanniereInfo.module.scss";
import imgInfo from "../.././../../../assets/images/imageinfo.png";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineFileDone,
  AiOutlineCalculator,AiOutlineSetting
} from "react-icons/ai";

function BanniereInfo() {
  return (
    <div className={styles.banInfo}>
      <div>
        <img src={imgInfo} alt="imgInfo " />
      </div>
      <div className={styles.details}>
        <h2>Notre expertise à votre service</h2>
        <p className="d-flex align-items-center p-10">
          <AiOutlineFundProjectionScreen className={styles.icon} />
          Une analyse objective des prix
        </p>
        <p className="d-flex align-items-center p-10">
          <AiOutlineFileDone className={styles.icon} />
          Une visibilité complète sur l'historique du véhicule
        </p>
        <p className="d-flex align-items-center p-10">
          <AiOutlineCalculator className={styles.icon} />
          Un budget maîtrisé avec notre simulateur de financement
        </p>
        <p className="d-flex align-items-center p-10">
          <AiOutlineSetting className={styles.icon} />
          Une projection claire sur les futurs entretiens
        </p>
      </div>
    </div>
  );
}

export default BanniereInfo;

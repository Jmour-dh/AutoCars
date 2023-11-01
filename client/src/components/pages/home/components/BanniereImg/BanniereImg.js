import React from "react";
import sytles from "./BanniereImg.module.scss";
import ImgAcc from "../../../../../assets/images/imgAccueil.png";
import ImgAcc2 from "../../../../../assets/images/imgaccueil2.svg";

function BanniereImg() {
  return (
    <div className={sytles.ban}>
      <div className={sytles.banImg}>
      <div className={sytles.img1}>
          <img id="img1" src={ImgAcc2} alt="imgAcc2" />
        </div>
        <div className={sytles.img2}>
          <h2>
            Nous sélectionnons les meilleurs véhicules. À vous de choisir.
          </h2>
          <img src={ImgAcc} alt="imgAcc" />
        </div>
      
      </div>
    </div>
  );
}

export default BanniereImg;

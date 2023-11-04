import React from "react";
import styles from "./BanniereDetailsServ.module.scss";
import ImgServ1 from "../../../../assets/images/pneux.png";
import ImgServ2 from "../../../../assets/images/vidange.jpg";
import ImgServ3 from "../../../../assets/images/diagnostic electro.jpg";

function BanniereDetailsServ() {
  return (
    <div className={styles.detailsServ}>
      <h2>Nos services</h2>
      <div className={styles.serv}>
        <div className={styles.servContient}>
          <img src={ImgServ1} alt="pneus" />
          <p>
            Notre service de garde et changement de pneus vous offre la
            tranquillité d'esprit en assurant un remplacement rapide et efficace
            de vos pneumatiques, vous permettant de reprendre la route en toute
            sécurité sans tracas.
          </p>
          <span> Prix à partir 15 € par pneu</span>
        </div>
        <div className={styles.servContient}>
          <img src={ImgServ2} alt="vidange" />
          <p>
            Confiez la vidange de votre voiture à notre service de garage
            professionnel. Nous vous garantissons un entretien méticuleux,
            utilisant des huiles de qualité supérieure, pour assurer la
            lubrification adéquate de votre moteur et préserver son bon
            fonctionnement
          </p>
          <span> Prix à partir 50 € </span>
        </div>
        <div className={styles.servContient}>
          <img src={ImgServ3} alt="duagnostic" />
          <p>
            Notre service de garage propose un diagnostic moteur avancé,
            utilisant des technologies de pointe pour identifier rapidement et
            précisément les problèmes éventuels, permettant ainsi des
            réparations ciblées et efficaces pour optimiser les performances de
            votre véhicule.
          </p>
          <span> Prix à partir 39 €</span>
        </div>
      </div>
    </div>
  );
}

export default BanniereDetailsServ;

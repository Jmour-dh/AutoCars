import React from 'react'
import styles from "./BanniereServ.module.scss"
import imgServ from "../../../../assets/images/serv.jpg"

function BanniereServ() {
  return (
    <div className={styles.profileServ}>
      <img src={imgServ} alt="imgAbout" />
      <h1>À propos de nous</h1>
    </div>
  )
}

export default BanniereServ
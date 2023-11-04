import React from 'react'
import BanniereServ from './BanniereServ/BanniereServ'
import BanniereInfo from "../home/components/BanniereInfo/BanniereInfo"
import BanniereDetailsServ from './BanniereDetailsServ/BanniereDetailsServ'
import styles from "./About.module.scss"
import BanniereContact from './BanniereContact/BanniereContact'

function About() {
  return (
    <div className={styles.about}>
      <BanniereServ/>
      <BanniereInfo/>
      <BanniereDetailsServ/>
      <BanniereContact/>
    </div>
  )
}

export default About
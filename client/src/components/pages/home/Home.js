import React from 'react'
import BanniereImg from './components/BanniereImg/BanniereImg'
import BanniereInfo from './components/BanniereInfo/BanniereInfo'
import BanniereMarque from './components/BanniereMarque/BanniereMarque'
import styles from "./Home.module.scss"
import BanniereCars from './components/BanniereCars/BanniereCars'


function Home() {
  return (
    <div className={styles.home}>
      <BanniereImg/>
      <BanniereInfo/>
      <BanniereMarque/>
      <BanniereCars/>
    </div>
  )
}

export default Home
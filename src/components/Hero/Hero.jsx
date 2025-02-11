import { Link } from "react-router-dom";
import { Container } from "../Container/Container.jsx";

import hero from "../../assets/img/hero-1x.jpg";

import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.section}>
      <Container paddingLeft="64px" paddingRight="64px">
        <div className={styles.box}>
          <div className={styles.boxText}>
            <h1 className={styles.title}>
              Unlock your potential with the best{" "}
              <span className={styles.spanTitle}>language</span> tutors
            </h1>
            <p className={styles.text}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link className={styles.link} to="/teachers">
              Get started
            </Link>
          </div>
          <img className={styles.boxImg} src={hero} alt="Student with laptop" />
        </div>
        <ul className={styles.listInfo}>
          <li className={styles.itemInfo}>
            <p className={styles.currentInfo}>32,000&nbsp;+</p>
            <p className={styles.textInfo}>Experienced tutors</p>
          </li>
          <li className={styles.itemInfo}>
            <p className={styles.currentInfo}>300,000&nbsp;+</p>
            <p className={styles.textInfo}>5-star tutor reviews</p>
          </li>
          <li className={styles.itemInfo}>
            <p className={styles.currentInfo}>120&nbsp;+</p>
            <p className={styles.textInfo}>Subjects taught</p>
          </li>
          <li className={styles.itemInfo}>
            <p className={styles.currentInfo}>200&nbsp;+</p>
            <p className={styles.textInfo}>Tutor nationalities</p>
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default Hero;

import styles from "./EducationHero.module.css";

function EducationHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Education</span>

        <span className={styles.meta}>
          Técnica
          <br />
          prática
          <br />
          experiência
        </span>
      </div>

      <div className={styles.title}>
        <h1>
          Aprenda a<span>entender a beleza.</span>
        </h1>
      </div>

      <div className={styles.bottom}>
        <div className={styles.imageWrapper}>
          <img
            src="/assets/images/education/education-hero.webp"
            alt="Bruno Menezes ensinando técnicas de maquiagem"
          />
        </div>

        <p>
          Cursos presenciais para quem quer compreender melhor a própria
          maquiagem ou aprofundar a técnica profissional.
        </p>
      </div>
    </section>
  );
}

export default EducationHero;

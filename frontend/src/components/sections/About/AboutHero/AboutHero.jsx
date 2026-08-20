import styles from "./AboutHero.module.css";

function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroHeading}>
        <span className={styles.eyebrow}>O artista</span>

        <h1 className={styles.title}>
          Bruno
          <span>Menezes</span>
        </h1>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src="/assets/images/about/bruno-about.jpeg"
          alt="Bruno Menezes trabalhando como maquiador"
          className={styles.heroImage}
        />
      </div>

      <div className={styles.heroIntro}>
        <p className={styles.location}>
          Brasileiro.
          <br />
          Em Barcelona.
        </p>

        <p className={styles.description}>
          Maquiagem como expressão, identidade e encontro — criada para
          valorizar quem está diante dele.
        </p>
      </div>
    </section>
  );
}

export default AboutHero;

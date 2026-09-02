import styles from "./PortfolioHero.module.css";

function PortfolioHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.top}>
        <span className={styles.eyebrow}>Portfólio</span>

        <span className={styles.meta}>
          Makeup Artist
          <br />
          Barcelona
        </span>
      </div>

      <div className={styles.heading}>
        <h1>
          One artist.
          <span>Many expressions.</span>
        </h1>
      </div>

      <div className={styles.bottom}>
        <p>
          Pessoas, histórias, câmeras, celebrações e ideias transformadas
          através da maquiagem.
        </p>

        <span className={styles.scroll}>Explore ↓</span>
      </div>
    </section>
  );
}

export default PortfolioHero;

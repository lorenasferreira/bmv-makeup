import styles from "./ServicesHero.module.css";

function ServicesHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>Serviços</span>

        <h1>
          Beleza para
          <span>cada história.</span>
        </h1>
      </div>

      <div className={styles.visual}>
        <div className={styles.imageWrapper}>
          <img
            src="/assets/images/services/services-hero.webp"
            alt="Trabalho de maquiagem por Bruno Menezes"
          />
        </div>

        <span className={styles.imageLabel}>Barcelona · Worldwide</span>
      </div>

      <div className={styles.intro}>
        <span>01 — 06</span>

        <p>
          Da beleza natural à criação artística, cada trabalho começa pela mesma
          pergunta: o que faz sentido para você?
        </p>
      </div>
    </section>
  );
}

export default ServicesHero;

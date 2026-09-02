import styles from "./ServicesExperience.module.css";

function ServicesExperience() {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        <img
          src="/assets/images/services/services-experience.webp"
          alt="Bruno Menezes durante uma sessão de maquiagem"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.sectionLabel}>
          <span>02</span>
          <span>A experiência</span>
        </div>

        <h2>
          Antes da maquiagem,
          <br />
          vem a escuta.
        </h2>

        <div className={styles.copy}>
          <p>
            Não existe uma fórmula única. Cada atendimento começa entendendo a
            pessoa, a ocasião e como ela quer se sentir.
          </p>

          <p>
            A partir daí, técnica e sensibilidade se encontram para construir
            uma maquiagem que faça sentido no espelho, diante da câmera e no
            momento que ela foi criada para acompanhar.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ServicesExperience;

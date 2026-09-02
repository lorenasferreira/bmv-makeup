import styles from "./WeddingsProcess.module.css";

const steps = [
  {
    number: "01",
    title: "The Vision",
    image: "/assets/images/weddings/vision.webp",
    text: "Referências, estilo, cerimônia e a forma como você quer se sentir. Antes de decidir a maquiagem, entendemos a mulher e o momento.",
  },
  {
    number: "02",
    title: "The Trial",
    image: "/assets/images/weddings/trial.webp",
    text: "Um espaço para experimentar, ajustar e construir o look com calma até que cada escolha faça sentido para você.",
  },
  {
    number: "03",
    title: "The Wedding Day",
    image: "/assets/images/weddings/wedding-day.webp",
    text: "No grande dia, tudo o que foi pensado anteriormente ganha forma com atenção ao tempo, aos detalhes e à durabilidade.",
  },
  {
    number: "04",
    title: "The Celebration",
    image: "/assets/images/weddings/celebration.webp",
    text: "A maquiagem acompanha você entre abraços, fotografias, lágrimas, dança e tudo o que vier depois.",
  },
];

function WeddingsProcess() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.label}>
          <span>02</span>
          <span>A experiência</span>
        </div>

        <h2>
          From Vision
          <br />
          <em>to Celebration.</em>
        </h2>

        <p>
          A construção do look acontece em etapas para que, quando o dia chegar,
          você não precise pensar na maquiagem. Só viver.
        </p>
      </div>

      <div className={styles.cards}>
        {steps.map((step) => (
          <article className={styles.card} key={step.number}>
            <div className={styles.imageWrapper}>
              <img src={step.image} alt={step.title} />

              <span className={styles.number}>{step.number}</span>
            </div>

            <div className={styles.cardContent}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WeddingsProcess;

import styles from "./WeddingsPartners.module.css";

const categories = [
  "Photography",
  "Hair",
  "Nails",
  "Massage",
  "Beauty",
  "Wedding Services",
];

function WeddingsPartners() {
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <div className={styles.label}>
          <span>04</span>
          <span>Trusted Network</span>
        </div>

        <span className={styles.status}>Coming soon</span>
      </div>

      <div className={styles.content}>
        <h2>
          Um casamento
          <br />
          é feito por
          <br />
          <em>muitas mãos.</em>
        </h2>

        <div className={styles.right}>
          <p>
            Ao longo dos anos, Bruno cruza caminhos com profissionais que
            compartilham o mesmo cuidado com experiência, detalhe e atendimento.
          </p>

          <p>
            Esta área reunirá uma seleção de profissionais e serviços
            recomendados para complementar a experiência do casamento.
          </p>

          <div className={styles.categories}>
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeddingsPartners;

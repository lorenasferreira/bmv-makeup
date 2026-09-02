import styles from "./WeddingsIntro.module.css";

function WeddingsIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.label}>
        <span>01</span>
        <span>Bridal Beauty</span>
      </div>

      <div className={styles.content}>
        <div className={styles.statement}>
          <h2>
            Não existe uma
            <br />
            única forma de
            <br />
            <em>ser noiva.</em>
          </h2>
        </div>

        <div className={styles.copy}>
          <div className={styles.imageWrapper}>
            <img
              src="/assets/images/weddings/weddings-intro.webp"
              alt="Noiva maquiada por Bruno Menezes"
            />
          </div>

          <p>
            Algumas querem pele leve. Outras querem olhos marcantes. Algumas já
            chegam sabendo exatamente o que desejam e outras preferem descobrir
            durante o processo.
          </p>

          <p>
            O trabalho começa entendendo você, seu estilo, sua celebração e como
            quer se sentir quando se olhar no espelho.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WeddingsIntro;

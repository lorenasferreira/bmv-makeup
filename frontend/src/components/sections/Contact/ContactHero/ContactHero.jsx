import styles from "./ContactHero.module.css";

function ContactHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.top}>
        <span className={styles.eyebrow}>Contato</span>

        <span className={styles.meta}>
          Barcelona
          <br />
          Disponível para projetos
        </span>
      </div>

      <div className={styles.heading}>
        <h1>
          Vamos criar
          <span>algo juntos.</span>
        </h1>
      </div>

      <div className={styles.bottom}>
        <p>
          Casamentos, eventos, produções, projetos criativos ou educação. Conte
          um pouco sobre o que você está procurando e fale diretamente com
          Bruno.
        </p>

        <span className={styles.number}>+34 613 09 51 71</span>
      </div>
    </section>
  );
}

export default ContactHero;

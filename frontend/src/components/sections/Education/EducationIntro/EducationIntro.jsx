import styles from "./EducationIntro.module.css";

function EducationIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>
        <span>01</span>
        <span>Aprender fazendo</span>
      </div>

      <div className={styles.content}>
        <h2>
          Conhecimento que
          <br />
          sai da bancada
          <br />
          <em>para as suas mãos.</em>
        </h2>

        <div className={styles.copy}>
          <p>
            A proposta é prática: entender produtos, técnicas e escolhas para
            que você consiga reproduzir o que aprendeu depois da aula.
          </p>

          <p>
            Existem opções voltadas para automaquiagem e também uma formação
            específica para profissionais que querem aprofundar o trabalho com
            noivas.
          </p>
        </div>
      </div>
    </section>
  );
}

export default EducationIntro;

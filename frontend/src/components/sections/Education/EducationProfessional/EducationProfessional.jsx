import styles from "./EducationProfessional.module.css";

function EducationProfessional() {
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <div className={styles.sectionLabel}>
          <span>03</span>
          <span>Para profissionais</span>
        </div>

        <span className={styles.module}>Módulo Noivas</span>
      </div>

      <div className={styles.heading}>
        <h2>
          Maquiagem
          <br />
          <em>Nupcial.</em>
        </h2>

        <p>
          Uma formação voltada a profissionais que querem aprofundar a técnica e
          a experiência de atendimento no universo bridal.
        </p>
      </div>

      <div className={styles.visual}>
        <div className={styles.imageMain}>
          <img
            src="/assets/images/education/bridal-main.webp"
            alt="Maquiagem de noiva por Bruno Menezes"
          />
        </div>

        <div className={styles.imageDetail}>
          <img
            src="/assets/images/education/bridal-detail.webp"
            alt="Detalhe de maquiagem nupcial"
          />
        </div>
      </div>

      <div className={styles.information}>
        <div className={styles.learning}>
          <span className={styles.label}>Conteúdo</span>

          <div className={styles.learningList}>
            <span>Otimização de cores</span>
            <span>Abordagem e atendimento da noiva</span>
            <span>Pele de alta resistência</span>
            <span>Técnicas de retoque</span>
            <span>Construção de um look completo</span>
          </div>
        </div>

        <div className={styles.details}>
          <span className={styles.label}>Informações</span>

          <div>
            <span>Investimento</span>
            <strong>€300</strong>
          </div>

          <div>
            <span>Duração</span>
            <strong>Até 4 horas</strong>
          </div>

          <div>
            <span>Modelo adicional</span>
            <strong>€60</strong>
          </div>
        </div>

        <div className={styles.condition}>
          <span className={styles.label}>Importante</span>

          <p>
            A aluna deve levar sua própria modelo. Caso seja necessário
            providenciar uma modelo para a aula, será acrescentado o valor de
            €60.
          </p>

          <p>A aula inclui uma pausa de 15 minutos para café.</p>
        </div>
      </div>
    </section>
  );
}

export default EducationProfessional;

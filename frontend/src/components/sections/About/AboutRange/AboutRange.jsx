import styles from "./AboutRange.module.css";

const firstRow = ["Casamentos", "Beleza", "Social", "Campanhas"];

const secondRow = ["Ensaios", "Artístico", "Audiovisual", "Editorial"];

function AboutRange() {
  return (
    <section className={styles.range}>
      <div className={styles.content}>
        <div className={styles.sectionLabel}>
          <span>04</span>
          <span>Versatilidade</span>
        </div>

        <div className={styles.rangeHeader}>
          <h2 className={styles.rangeTitle}>
            Um artista.
            <br />
            Diferentes histórias.
          </h2>

          <p>
            Da beleza natural ao trabalho criativo, diferentes contextos pedem
            diferentes linguagens.
          </p>
        </div>
      </div>

      <div className={styles.marquees}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            {[...firstRow, ...firstRow].map((service, index) => (
              <span key={`${service}-${index}`}>
                {service}
                <i>—</i>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.marquee}>
          <div className={`${styles.track} ${styles.trackReverse}`}>
            {[...secondRow, ...secondRow].map((service, index) => (
              <span key={`${service}-${index}`}>
                {service}
                <i>—</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutRange;

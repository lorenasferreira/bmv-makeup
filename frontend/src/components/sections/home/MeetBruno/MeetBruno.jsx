import styles from "./MeetBruno.module.css";

function MeetBruno() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.imageColumn}>
        <div className={styles.imagePlaceholder}>
          <span>Bruno Portrait</span>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Meet the artist</p>

        <h2>
          Beauty is personal.
          <br />
          <em>Makeup should be too.</em>
        </h2>

        <div className={styles.copy}>
          <p>
            Brazilian makeup artist based in Barcelona, creating beauty
            experiences shaped around each face, personality and moment.
          </p>

          <p>
            From timeless beauty to bold creative work, every look begins with
            the same idea: enhancing identity rather than hiding it.
          </p>
        </div>

        <a href="#about-bruno" className={styles.link}>
          Discover Bruno
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <span className={styles.signature}>BMV</span>
    </section>
  );
}

export default MeetBruno;

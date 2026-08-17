import styles from "./SelectedWork.module.css";

const works = [
  {
    id: 1,
    className: "heroWork",
    label: "Beauty Portrait",
  },
  {
    id: 2,
    className: "portraitWork",
    label: "Editorial",
  },
  {
    id: 3,
    className: "detailWork",
    label: "Beauty Detail",
  },
  {
    id: 4,
    className: "wideWork",
    label: "Campaign",
  },
  {
    id: 5,
    className: "finalWork",
    label: "Artistic",
  },
];

function SelectedWork() {
  return (
    <section className={styles.section} id="portfolio">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Selected work</p>

        <h2>
          Faces become
          <br />
          <em>the canvas.</em>
        </h2>
      </header>

      <div className={styles.gallery}>
        {works.map((work) => (
          <div
            key={work.id}
            className={`${styles.work} ${styles[work.className]}`}
          >
            <div className={styles.placeholder}>
              <span>{work.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>
          A selection of beauty, editorial
          <br />
          and creative work.
        </p>

        <a href="/portfolio" className={styles.link}>
          View portfolio
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export default SelectedWork;

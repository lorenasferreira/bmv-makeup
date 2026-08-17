import styles from "./BehindTheBrush.module.css";

const moments = [
  {
    id: 1,
    label: "Skin Preparation",
    className: "large",
  },
  {
    id: 2,
    label: "Behind the Scenes",
    className: "smallTop",
  },
  {
    id: 3,
    label: "Client Moment",
    className: "smallBottom",
  },
];

function BehindTheBrush() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Behind the brush</p>

        <h2>
          More than
          <br />
          <em>the final look.</em>
        </h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.copy}>
          <p>
            The work begins long before the final photo. Preparation, trust,
            conversation and the small details are part of every BMV experience.
          </p>

          <p>
            Behind every finished look is a process shaped around the person in
            the chair.
          </p>
        </div>

        <div className={styles.gallery}>
          {moments.map((moment) => (
            <div
              key={moment.id}
              className={`${styles.image} ${styles[moment.className]}`}
            >
              <span>{moment.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.statement}>
        <span>Artistry.</span>
        <span>Connection.</span>
        <span>Experience.</span>
      </div>
    </section>
  );
}

export default BehindTheBrush;

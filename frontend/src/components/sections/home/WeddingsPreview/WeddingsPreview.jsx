import styles from "./WeddingsPreview.module.css";

function WeddingsPreview() {
  return (
    <section className={styles.section} id="weddings">
      <div className={styles.content}>
        <p className={styles.eyebrow}>Weddings</p>

        <h2>
          From prep
          <br />
          <em>to celebration.</em>
        </h2>

        <p className={styles.description}>
          Every detail matters long before the final look. A bridal experience
          created around the person, the moment and everything that comes with
          it.
        </p>

        <a href="/services/weddings" className={styles.link}>
          Discover the bridal experience
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={styles.visual}>
        <div className={styles.mainImage}>
          <span>Bride Portrait</span>
        </div>

        <div className={styles.secondaryImage}>
          <span>Bruno Working</span>
        </div>

        <span className={styles.number}>05</span>
      </div>
    </section>
  );
}

export default WeddingsPreview;

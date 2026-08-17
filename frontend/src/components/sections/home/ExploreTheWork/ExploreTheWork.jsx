import styles from "./ExploreTheWork.module.css";

const categories = [
  {
    id: "weddings",
    number: "01",
    title: "Weddings",
    description: "For moments you'll remember forever.",
  },
  {
    id: "campaigns",
    number: "02",
    title: "Campaigns",
    description: "Beauty created for brands and stories.",
  },
  {
    id: "social",
    number: "03",
    title: "Social",
    description: "Elevated beauty for your moments.",
  },
  {
    id: "photoshoots",
    number: "04",
    title: "Photoshoots",
    description: "Makeup designed for the lens.",
  },
  {
    id: "artistic",
    number: "05",
    title: "Artistic",
    description: "No rules. Just creation.",
  },
  {
    id: "audiovisual",
    number: "06",
    title: "Audiovisual",
    description: "Beauty made for camera.",
  },
];

function ExploreTheWork() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Explore the work</p>

        <h2>
          One artist.
          <br />
          <em>Many expressions.</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => (
          <article className={styles.item} key={category.id}>
            <div className={styles.imagePlaceholder}>
              <span>{category.title}</span>
            </div>

            <div className={styles.meta}>
              <span className={styles.number}>{category.number}</span>

              <div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <a href="#services" className={styles.link}>
        Explore all services
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

export default ExploreTheWork;

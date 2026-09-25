import { useTranslation } from "react-i18next";

import styles from "./WeddingsReviews.module.css";

const reviews = [
  {
    name: "Clare",
    source: "Bodas.net",
    image: "/assets/images/reviews/clare.webp",
    title: "weddings.reviews.items.clare.title",
    text: "weddings.reviews.items.clare.description",
  },
  {
    name: "Marina",
    source: "Bodas.net",
    image: "/assets/images/reviews/marina.webp",
    title: "weddings.reviews.items.marina.title",
    text: "weddings.reviews.items.marina.description",
  },
];

function WeddingsReviews() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.label}>
          <span>03</span>
          <span>{t("weddings.reviews.eyebrow")}</span>
        </div>

        <h2>
          {t("weddings.reviews.title")}
          <br />
          {t("weddings.reviews.titleSecond")}
          <br />
          <em>{t("weddings.reviews.titleAccent")}</em>
        </h2>
      </div>

      <div className={styles.reviews}>
        {reviews.map((review, index) => (
          <article className={styles.review} key={review.name}>
            <span className={styles.reviewNumber}>0{index + 1}</span>

            <div className={styles.person}>
              <img src={review.image} alt={review.name} />

              <div>
                <strong>{review.name}</strong>
                <span>{review.source}</span>
              </div>
            </div>

            <div className={styles.reviewContent}>
              <h3>{t(review.title)}</h3>
              <p>{t(review.text)}</p>
            </div>
          </article>
        ))}
      </div>

      <a
        href="https://www.bodas.net/belleza-novias/bmv-makeup--e248810"
        target="_blank"
        rel="noreferrer"
        className={styles.external}
      >
        {t("weddings.reviews.cta")}
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export default WeddingsReviews;

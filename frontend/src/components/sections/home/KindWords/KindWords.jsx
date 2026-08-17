import { useTranslation } from "react-i18next";

import styles from "./KindWords.module.css";

const reviews = [
  {
    id: "helena-vargas",
    author: "Helena Vargas",
    rating: 5,
    source: "Google",
    text: "Bruno did a wonderful job. From the moment we contacted him, he was incredibly attentive and professional. On the day of the event, he was punctual, welcoming, and executed exactly what I wanted. I loved his work.",
  },
  {
    id: "alejandra",
    author: "Alejandra",
    rating: 5,
    source: "Bodas.net",
    text: "Bruno is one of the best makeup artists in Barcelona. Top professionally and personally. He made me feel like a queen on my wedding day, and I would recommend him without hesitation.",
  },
];

function KindWords() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{t("home.reviews.eyebrow")}</p>

        <h2>
          {t("home.reviews.title")}
          <br />
          <em>{t("home.reviews.titleAccent")}</em>
        </h2>
      </div>

      <div className={styles.reviews}>
        {reviews.map((review, index) => (
          <article className={styles.review} key={review.id}>
            <div className={styles.reviewHeader}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={styles.stars}
                aria-label={`${review.rating} out of 5 stars`}
              >
                {"★".repeat(review.rating)}
              </span>
            </div>

            <blockquote>“{review.text}”</blockquote>

            <footer>
              <span className={styles.author}>{review.author}</span>
              <span className={styles.source}>{review.source}</span>
            </footer>
          </article>
        ))}
      </div>

      <div className={styles.bottom}>
        <p>
          {t("home.reviews.footerLine1")}
          <br />
          {t("home.reviews.footerLine2")}
        </p>

        <div className={styles.externalLinks}>
          <a href="#google-reviews">
            {t("home.reviews.google")}
            <span aria-hidden="true">↗</span>
          </a>

          <a href="#bodas-reviews">
            {t("home.reviews.bodas")}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default KindWords;

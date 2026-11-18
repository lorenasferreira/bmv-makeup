import OptimizedImage from "../../../common/OptimizedImage/OptimizedImage";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./ExploreTheWork.module.css";

const categories = [
  {
    id: "weddings",
    number: "01",
    image: "/assets/images/home/explore-work/seaside-bridal-portrait.webp",
  },
  {
    id: "social",
    number: "02",
    image: "/assets/images/home/explore-work/braided-hair-beauty-portrait.webp",
  },
  {
    id: "artistic",
    number: "03",
    image: "/assets/images/shared/artistic/frankenstein-character-portrait.webp",
  },
];

function ExploreTheWork() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="services">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{t("home.work.eyebrow")}</p>

        <h2 id="explore-work-title">
          {t("home.work.title")}
          <br />
          <em>{t("home.work.titleAccent")}</em>
        </h2>
      </div>

      <div className={styles.grid} tabIndex={0} role="region" aria-labelledby="explore-work-title">
        {categories.map((category) => (
          <article className={styles.item} key={category.id}>
            <div className={styles.imageWrapper}>
              <OptimizedImage sizes="(max-width: 640px) 100vw, 33vw"
                src={category.image}
                alt={t(`home.work.items.${category.id}.imageAlt`)}
                loading="lazy"
              />
            </div>

            <div className={styles.meta}>
              <span className={styles.number}>{category.number}</span>

              <div>
                <h3>{t(`home.work.items.${category.id}.title`)}</h3>

                <p>{t(`home.work.items.${category.id}.description`)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link to="/services" className={styles.link}>
        {t("home.work.cta")}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default ExploreTheWork;

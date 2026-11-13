import OptimizedImage from "../../../common/OptimizedImage/OptimizedImage";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./ExploreTheWork.module.css";

const categories = [
  {
    id: "weddings",
    number: "01",
    image: "/assets/images/optimized/explore-weddings.webp",
  },
  {
    id: "social",
    number: "02",
    image: "/assets/images/optimized/explore-social.webp",
  },
  {
    id: "artistic",
    number: "03",
    image: "/assets/images/curated/art-11.webp",
  },
];

function ExploreTheWork() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="services">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{t("home.work.eyebrow")}</p>

        <h2>
          {t("home.work.title")}
          <br />
          <em>{t("home.work.titleAccent")}</em>
        </h2>
      </div>

      <div className={styles.grid}>
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

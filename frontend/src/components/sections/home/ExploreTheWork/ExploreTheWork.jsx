import { useTranslation } from "react-i18next";

import styles from "./ExploreTheWork.module.css";

const categories = [
  { id: "weddings", number: "01" },
  { id: "campaigns", number: "02" },
  { id: "social", number: "03" },
  { id: "photoshoots", number: "04" },
  { id: "artistic", number: "05" },
  { id: "audiovisual", number: "06" },
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
            <div className={styles.imagePlaceholder}>
              <span>{t(`home.work.items.${category.id}.title`)}</span>
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

      <a href="/services" className={styles.link}>
        {t("home.work.cta")}
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

export default ExploreTheWork;

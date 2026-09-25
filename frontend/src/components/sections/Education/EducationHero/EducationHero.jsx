import { useTranslation } from "react-i18next";

import styles from "./EducationHero.module.css";

function EducationHero() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{t("education.hero.eyebrow")}</span>

        <span className={styles.meta}>
          {t("education.hero.metaTechnique")}
          <br />
          {t("education.hero.metaPractice")}
          <br />
          {t("education.hero.metaExperience")}
        </span>
      </div>

      <div className={styles.title}>
        <h1>
          {t("education.hero.title")}<span>{t("education.hero.titleAccent")}</span>
        </h1>
      </div>

      <div className={styles.bottom}>
        <div className={styles.imageWrapper}>
          <img
            src="/assets/images/education/education-hero.webp"
            alt={t("education.hero.imageAlt")}
          />
        </div>

        <p>
          {t("education.hero.description")}
        </p>
      </div>
    </section>
  );
}

export default EducationHero;

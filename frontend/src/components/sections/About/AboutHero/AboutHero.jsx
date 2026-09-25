import { useTranslation } from "react-i18next";

import styles from "./AboutHero.module.css";

function AboutHero() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={styles.heroHeading}>
        <span className={styles.eyebrow}>{t("about.hero.eyebrow")}</span>

        <h1 className={styles.title}>
          Bruno
          <span>Menezes</span>
        </h1>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src="/assets/images/about/bruno-about.jpeg"
          alt={t("about.hero.imageAlt")}
          className={styles.heroImage}
        />
      </div>

      <div className={styles.heroIntro}>
        <p className={styles.location}>
          {t("about.hero.origin")}
          <br />
          {t("about.hero.location")}
        </p>

        <p className={styles.description}>
          {t("about.hero.description")}
        </p>
      </div>
    </section>
  );
}

export default AboutHero;

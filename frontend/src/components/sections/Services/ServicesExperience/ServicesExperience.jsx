import { useTranslation } from "react-i18next";

import styles from "./ServicesExperience.module.css";

function ServicesExperience() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        <img
          src="/assets/images/services/services-experience.webp"
          alt={t("services.experience.imageAlt")}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.sectionLabel}>
          <span>02</span>
          <span>{t("services.experience.eyebrow")}</span>
        </div>

        <h2>
          {t("services.experience.title")}
          <br />
          {t("services.experience.titleAccent")}
        </h2>

        <div className={styles.copy}>
          <p>
            {t("services.experience.paragraph1")}
          </p>

          <p>
            {t("services.experience.paragraph2")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ServicesExperience;

import { useTranslation } from "react-i18next";

import styles from "./EducationPreview.module.css";

function EducationPreview() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="education">
      <div className={styles.visual}>
        <div className={styles.imagePlaceholder}>
          <span>Beauty Education</span>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("home.education.eyebrow")}</p>

        <h2>
          {t("home.education.title")}
          <br />
          <em>{t("home.education.titleAccent")}</em>
        </h2>

        <p className={styles.description}>{t("home.education.description")}</p>

        <div className={styles.offers}>
          <span>{t("home.education.selfMakeup")}</span>
          <span>{t("home.education.professional")}</span>
          <span>{t("home.education.workshops")}</span>
        </div>

        <a href="/education" className={styles.link}>
          {t("home.education.cta")}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export default EducationPreview;

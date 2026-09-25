import { useTranslation } from "react-i18next";

import styles from "./EducationIntro.module.css";

function EducationIntro() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>
        <span>01</span>
        <span>{t("education.intro.eyebrow")}</span>
      </div>

      <div className={styles.content}>
        <h2>
          {t("education.intro.title")}
          <br />
          {t("education.intro.titleSecond")}
          <br />
          <em>{t("education.intro.titleAccent")}</em>
        </h2>

        <div className={styles.copy}>
          <p>
            {t("education.intro.paragraph1")}
          </p>

          <p>
            {t("education.intro.paragraph2")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default EducationIntro;

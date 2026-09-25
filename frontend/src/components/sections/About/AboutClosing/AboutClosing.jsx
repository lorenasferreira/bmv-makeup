import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./AboutClosing.module.css";

function AboutClosing() {
  const { t } = useTranslation();

  return (
    <>
      <section className={styles.human}>
        <div className={styles.humanContent}>
          <div className={styles.sectionLabel}>
            <span>05</span>
            <span>{t("about.closing.eyebrow")}</span>
          </div>

          <h2 className={styles.sectionTitle}>
            {t("about.closing.title")}
            <br />
            {t("about.closing.titleAccent")}
          </h2>

          <p>
            {t("about.closing.description")}
          </p>
        </div>

        <div className={styles.humanImages}>
          <img
            src="/assets/images/about/bruno-backstage-1.jpeg"
            alt={t("about.closing.backstageAlt")}
          />

          <img
            src="/assets/images/about/bruno-backstage-2.jpeg"
            alt={t("about.closing.workingAlt")}
          />
        </div>
      </section>

      <section className={styles.cta}>
        <span className={styles.eyebrow}>{t("about.closing.ctaEyebrow")}</span>

        <h2>
          {t("about.closing.ctaTitle")}
          <br />
          {t("about.closing.ctaTitleAccent")}
        </h2>

        <Link to="/portfolio" className={styles.ctaLink}>
          {t("about.closing.cta")}
        </Link>
      </section>
    </>
  );
}

export default AboutClosing;

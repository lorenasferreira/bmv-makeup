import { useTranslation } from "react-i18next";

import styles from "./FinalCTA.module.css";

function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="contact">
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("home.cta.eyebrow")}</p>

        <h2>
          {t("home.cta.title")}
          <br />
          <em>{t("home.cta.titleAccent")}</em>
        </h2>

        <p className={styles.description}>{t("home.cta.description")}</p>

        <div className={styles.actions}>
          <a href="/contact" className={styles.primary}>
            {t("home.cta.primary")}
            <span aria-hidden="true">→</span>
          </a>

          <a href="/services" className={styles.secondary}>
            {t("home.cta.secondary")}
          </a>
        </div>
      </div>

      <span className={styles.brandMark}>BMV</span>
    </section>
  );
}

export default FinalCTA;

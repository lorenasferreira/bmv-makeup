import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./ServicesCTA.module.css";

function ServicesCTA() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>{t("services.cta.eyebrow")}</span>

      <h2>
        {t("services.cta.title")}
        <br />
        <em>{t("services.cta.titleAccent")}</em>
      </h2>

      <p>
        {t("services.cta.description")}
      </p>

      <Link to="/contact" className={styles.link}>
        {t("services.cta.link")}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default ServicesCTA;

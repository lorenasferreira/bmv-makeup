import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./PortfolioCTA.module.css";

function PortfolioCTA() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <span>{t("portfolio.cta.face")}</span>
        <span>{t("portfolio.cta.story")}</span>
      </div>

      <h2>
        {t("portfolio.cta.title")}
        <br />
        <em>{t("portfolio.cta.titleAccent")}</em>
      </h2>

      <div className={styles.bottom}>
        <p>
          {t("portfolio.cta.description")}
        </p>

        <Link to="/contact" className={styles.link}>
          {t("portfolio.cta.link")}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export default PortfolioCTA;

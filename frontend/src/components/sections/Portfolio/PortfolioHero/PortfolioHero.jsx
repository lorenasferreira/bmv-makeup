import { useTranslation } from "react-i18next";

import styles from "./PortfolioHero.module.css";

function PortfolioHero() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={styles.top}>
        <span className={styles.eyebrow}>{t("portfolio.hero.eyebrow")}</span>

        <span className={styles.meta}>
          {t("portfolio.hero.profession")}
          <br />
          Barcelona
        </span>
      </div>

      <div className={styles.heading}>
        <h1>
          {t("portfolio.hero.title")}
          <span>{t("portfolio.hero.titleAccent")}</span>
        </h1>
      </div>

      <div className={styles.bottom}>
        <p>
          {t("portfolio.hero.description")}
        </p>

        <span className={styles.scroll}>{t("portfolio.hero.scroll")}</span>
      </div>
    </section>
  );
}

export default PortfolioHero;

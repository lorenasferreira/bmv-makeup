import OptimizedImage from "../../../common/OptimizedImage/OptimizedImage";
import { useTranslation } from "react-i18next";

import styles from "./ServicesHero.module.css";

function ServicesHero() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>{t("services.hero.eyebrow")}</span>

        <h1>
          {t("services.hero.title")}
          <span>{t("services.hero.titleAccent")}</span>
        </h1>
      </div>

      <div className={styles.visual}>
        <div className={styles.imageWrapper}>
          <OptimizedImage sizes="(max-width: 700px) 100vw, 40vw" loading="eager" fetchPriority="high"
            src="/assets/images/services/beauty/glowing-skin-portrait.webp"
            alt={t("services.hero.imageAlt")}
          />
        </div>

        <span className={styles.imageLabel}>{t("services.hero.location")}</span>
      </div>

      <div className={styles.intro}>
        <span>01 — 06</span>

        <p>
          {t("services.hero.description")}
        </p>
      </div>
    </section>
  );
}

export default ServicesHero;

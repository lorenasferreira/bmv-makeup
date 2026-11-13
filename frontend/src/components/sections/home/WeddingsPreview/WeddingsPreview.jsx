import OptimizedImage from "../../../common/OptimizedImage/OptimizedImage";
import { useTranslation } from "react-i18next";

import styles from "./WeddingsPreview.module.css";

function WeddingsPreview() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="weddings">
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("home.weddings.eyebrow")}</p>

        <h2>
          {t("home.weddings.title")}
          <em>{t("home.weddings.titleAccent")}</em>
        </h2>

        <p className={styles.description}>{t("home.weddings.description")}</p>

        <a href="/services/weddings" className={styles.link}>
          {t("home.weddings.cta")}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={styles.visual}>
        <div className={styles.mainImage}>
          <OptimizedImage sizes="(max-width: 640px) 85vw, 40vw" src="/assets/images/curated/cas-03.webp" alt={t("home.weddings.mainImageLabel")} loading="lazy" />
        </div>

        <div className={styles.secondaryImage}>
          <OptimizedImage sizes="(max-width: 640px) 85vw, 40vw" src="/assets/images/curated/bru-20.webp" alt={t("home.weddings.secondaryImageLabel")} loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export default WeddingsPreview;

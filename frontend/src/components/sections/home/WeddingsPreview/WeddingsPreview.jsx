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
          <br />
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
          <span>Bride Portrait</span>
        </div>

        <div className={styles.secondaryImage}>
          <span>Bruno Working</span>
        </div>

        <span className={styles.number}>05</span>
      </div>
    </section>
  );
}

export default WeddingsPreview;

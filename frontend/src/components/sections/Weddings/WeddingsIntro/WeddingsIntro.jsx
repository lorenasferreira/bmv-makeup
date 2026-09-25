import { useTranslation } from "react-i18next";

import styles from "./WeddingsIntro.module.css";

function WeddingsIntro() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.label}>
        <span>01</span>
        <span>{t("weddings.intro.eyebrow")}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.statement}>
          <h2>
            {t("weddings.intro.title")}
            <br />
            {t("weddings.intro.titleSecond")}
            <br />
            <em>{t("weddings.intro.titleAccent")}</em>
          </h2>
        </div>

        <div className={styles.copy}>
          <div className={styles.imageWrapper}>
            <img
              src="/assets/images/weddings/weddings-intro.webp"
              alt={t("weddings.intro.imageAlt")}
            />
          </div>

          <p>
            {t("weddings.intro.paragraph1")}
          </p>

          <p>
            {t("weddings.intro.paragraph2")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default WeddingsIntro;

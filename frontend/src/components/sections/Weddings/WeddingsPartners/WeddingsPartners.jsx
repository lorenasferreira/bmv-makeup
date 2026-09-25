import { useTranslation } from "react-i18next";

import styles from "./WeddingsPartners.module.css";

const categories = [
  "weddings.partners.categories.photography",
  "weddings.partners.categories.hair",
  "weddings.partners.categories.nails",
  "weddings.partners.categories.massage",
  "weddings.partners.categories.beauty",
  "weddings.partners.categories.weddingServices",
];

function WeddingsPartners() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <div className={styles.label}>
          <span>04</span>
          <span>{t("weddings.partners.eyebrow")}</span>
        </div>

        <span className={styles.status}>{t("weddings.partners.status")}</span>
      </div>

      <div className={styles.content}>
        <h2>
          {t("weddings.partners.title")}
          <br />
          {t("weddings.partners.titleSecond")}
          <br />
          <em>{t("weddings.partners.titleAccent")}</em>
        </h2>

        <div className={styles.right}>
          <p>
            {t("weddings.partners.paragraph1")}
          </p>

          <p>
            {t("weddings.partners.paragraph2")}
          </p>

          <div className={styles.categories}>
            {categories.map((category) => (
              <span key={t(category)}>{t(category)}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeddingsPartners;

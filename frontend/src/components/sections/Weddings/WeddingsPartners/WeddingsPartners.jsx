import { useTranslation } from "react-i18next";

import styles from "./WeddingsPartners.module.css";

const partners = [
  { name: "Priscila Prince", category: "massage", url: "https://www.instagram.com/priscilla_princee" },
  { name: "Paula Morgan", category: "photography", url: "https://www.instagram.com/paulamorganphoto" },
  { name: "Fran Ruiz", category: "photography", url: "https://www.instagram.com/franruizphotographer" },
  { name: "Charles", category: "hair", url: "https://www.instagram.com/hairbycharless" },
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
            {partners.map((partner) => (
              <a key={partner.url} href={partner.url} target="_blank" rel="noopener noreferrer">
                <span>{partner.name}</span>
                <small>{t(`weddings.partners.categories.${partner.category}`)}</small>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeddingsPartners;

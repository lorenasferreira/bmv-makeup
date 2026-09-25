import { useTranslation } from "react-i18next";

import styles from "./WeddingsCTA.module.css";

function WeddingsCTA() {
  const { t } = useTranslation();

  const message = t("weddings.whatsapp.message");

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>{t("weddings.cta.eyebrow")}</span>

      <h2>
        {t("weddings.cta.title")}
        <br />
        <em>{t("weddings.cta.titleAccent")}</em>
      </h2>

      <p>
        {t("weddings.cta.description")}
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={styles.cta}
      >
        {t("weddings.cta.link")}
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

export default WeddingsCTA;

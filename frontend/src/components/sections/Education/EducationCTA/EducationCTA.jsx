import { useTranslation } from "react-i18next";

import styles from "./EducationCTA.module.css";

function EducationCTA() {
  const { t } = useTranslation();

  const message = t("education.whatsapp.message");

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>{t("education.cta.eyebrow")}</span>

      <h2>
        {t("education.cta.title")}
        <br />
        <em>{t("education.cta.titleAccent")}</em>
      </h2>

      <p>
        {t("education.cta.description")}
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        {t("education.cta.link")}
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

export default EducationCTA;

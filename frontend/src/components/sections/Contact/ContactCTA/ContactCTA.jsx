import { useTranslation } from "react-i18next";

import styles from "./ContactCTA.module.css";

function ContactCTA() {
  const { t } = useTranslation();

  const message = t("contact.whatsapp.project");

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>{t("contact.cta.eyebrow")}</span>

      <h2>
        {t("contact.cta.title")}
        <br />
        <em>{t("contact.cta.titleAccent")}</em>
      </h2>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={styles.contact}
      >
        <span>WhatsApp</span>
        <strong>+34 613 09 51 71</strong>
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export default ContactCTA;

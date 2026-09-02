import { useTranslation } from "react-i18next";

import styles from "./ContactCTA.module.css";

const messages = {
  pt: "Olá, Bruno! Vi seu trabalho no site da BMV Makeup e gostaria de conversar sobre um projeto.",
  en: "Hi Bruno! I saw your work on the BMV Makeup website and I'd like to talk about a project.",
  es: "¡Hola, Bruno! Vi tu trabajo en la web de BMV Makeup y me gustaría hablar sobre un proyecto.",
  ca: "Hola, Bruno! He vist el teu treball al web de BMV Makeup i m'agradaria parlar sobre un projecte.",
};

function ContactCTA() {
  const { i18n } = useTranslation();

  const language = i18n.resolvedLanguage?.split("-")[0] || "pt";
  const message = messages[language] || messages.pt;

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>Vamos conversar</span>

      <h2>
        Seu próximo
        <br />
        <em>projeto começa aqui.</em>
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

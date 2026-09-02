import { useTranslation } from "react-i18next";

import styles from "./WeddingsCTA.module.css";

const messages = {
  pt: "Olá, Bruno! Vi a página de Weddings no site da BMV Makeup e gostaria de saber mais sobre disponibilidade para o meu casamento.",
  en: "Hi Bruno! I saw the Weddings page on the BMV Makeup website and I'd like to know more about availability for my wedding.",
  es: "¡Hola, Bruno! Vi la página de Weddings en la web de BMV Makeup y me gustaría saber más sobre disponibilidad para mi boda.",
  ca: "Hola, Bruno! He vist la pàgina de Weddings al web de BMV Makeup i m'agradaria saber més sobre disponibilitat per al meu casament.",
};

function WeddingsCTA() {
  const { i18n } = useTranslation();

  const language = i18n.resolvedLanguage?.split("-")[0] || "pt";
  const message = messages[language] || messages.pt;

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>Your Wedding · BMV Makeup</span>

      <h2>
        Agora falta
        <br />
        <em>a sua história.</em>
      </h2>

      <p>
        Conte a Bruno quando e onde será o casamento e o que você está
        imaginando para o seu look.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={styles.cta}
      >
        Falar com Bruno
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

export default WeddingsCTA;

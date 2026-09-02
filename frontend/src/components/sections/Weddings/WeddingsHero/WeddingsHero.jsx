import { useTranslation } from "react-i18next";

import styles from "./WeddingsHero.module.css";

const messages = {
  pt: "Olá, Bruno! Vi a página de Weddings no site da BMV Makeup e gostaria de saber mais sobre disponibilidade para o meu casamento.",
  en: "Hi Bruno! I saw the Weddings page on the BMV Makeup website and I'd like to know more about availability for my wedding.",
  es: "¡Hola, Bruno! Vi la página de Weddings en la web de BMV Makeup y me gustaría saber más sobre disponibilidad para mi boda.",
  ca: "Hola, Bruno! He vist la pàgina de Weddings al web de BMV Makeup i m'agradaria saber més sobre disponibilitat per al meu casament.",
};

function WeddingsHero() {
  const { i18n } = useTranslation();

  const language = i18n.resolvedLanguage?.split("-")[0] || "pt";
  const message = messages[language] || messages.pt;

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.hero}>
      <div className={styles.visual}>
        <img
          src="/assets/images/weddings/weddings-hero.webp"
          alt="Maquiagem de noiva por Bruno Menezes"
        />

        <span className={styles.location}>
          Barcelona · Destination Weddings
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.eyebrow}>Weddings</span>
          <span className={styles.number}>01 / BMV</span>
        </div>

        <div className={styles.heading}>
          <h1>
            Your day.
            <span>Your beauty.</span>
          </h1>

          <p>
            Uma maquiagem pensada para continuar parecendo você — só que na
            versão que você escolheu viver nesse dia.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.cta}
        >
          Consultar disponibilidade
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

export default WeddingsHero;

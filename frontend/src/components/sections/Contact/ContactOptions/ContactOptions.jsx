import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

import styles from "./ContactOptions.module.css";

const messages = {
  pt: "Olá, Bruno! Vi seu trabalho no site da BMV Makeup e gostaria de saber mais sobre disponibilidade e valores.",
  en: "Hi Bruno! I saw your work on the BMV Makeup website and I'd like to know more about availability and pricing.",
  es: "¡Hola, Bruno! Vi tu trabajo en la web de BMV Makeup y me gustaría saber más sobre disponibilidad y precios.",
  ca: "Hola, Bruno! He vist el teu treball al web de BMV Makeup i m'agradaria saber més sobre disponibilitat i preus.",
};

function ContactOptions() {
  const { i18n } = useTranslation();

  const language = i18n.resolvedLanguage?.split("-")[0] || "pt";
  const message = messages[language] || messages.pt;

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>
        <span>01</span>
        <span>Fale com Bruno</span>
      </div>

      <div className={styles.content}>
        <div className={styles.intro}>
          <h2>
            Direto,
            <br />
            simples,
            <br />
            <em>pessoal.</em>
          </h2>

          <p>
            Sem intermediários. Você fala diretamente com Bruno para explicar o
            que precisa, consultar disponibilidade e alinhar os próximos passos.
          </p>
        </div>

        <div className={styles.options}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.option}
          >
            <div>
              <span className={styles.optionLabel}>Principal</span>
              <h3>WhatsApp</h3>
            </div>

            <div className={styles.optionBottom}>
              <span>+34 613 09 51 71</span>
              <FiArrowUpRight aria-hidden="true" />
            </div>
          </a>

          <a
            href="https://www.instagram.com/bmvmakeup/"
            target="_blank"
            rel="noreferrer"
            className={styles.option}
          >
            <div>
              <span className={styles.optionLabel}>Social</span>
              <h3>Instagram</h3>
            </div>

            <div className={styles.optionBottom}>
              <span>@bmvmakeup</span>
              <FiArrowUpRight aria-hidden="true" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactOptions;

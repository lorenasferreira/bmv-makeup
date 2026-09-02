import { useTranslation } from "react-i18next";

import styles from "./EducationCTA.module.css";

const messages = {
  pt: "Olá, Bruno! Vi os cursos no site da BMV Makeup e gostaria de saber mais sobre as aulas.",
  en: "Hi Bruno! I saw the courses on the BMV Makeup website and I'd like to know more about the classes.",
  es: "¡Hola, Bruno! Vi los cursos en la web de BMV Makeup y me gustaría saber más sobre las clases.",
  ca: "Hola, Bruno! He vist els cursos al web de BMV Makeup i m'agradaria saber més sobre les classes.",
};

function EducationCTA() {
  const { i18n } = useTranslation();

  const language = i18n.resolvedLanguage?.split("-")[0] || "pt";
  const message = messages[language] || messages.pt;

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>Próxima aula</span>

      <h2>
        Pronta para
        <br />
        <em>aprender?</em>
      </h2>

      <p>
        Fale diretamente com Bruno para tirar dúvidas, consultar disponibilidade
        e escolher o módulo ideal para você.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        Falar com Bruno
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

export default EducationCTA;

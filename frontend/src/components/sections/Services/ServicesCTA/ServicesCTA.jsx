import { Link } from "react-router-dom";

import styles from "./ServicesCTA.module.css";

function ServicesCTA() {
  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>Seu momento</span>

      <h2>
        Tem algo
        <br />
        <em>em mente?</em>
      </h2>

      <p>
        Conte um pouco sobre a ocasião, o projeto ou a ideia. A partir daí,
        encontramos juntos o formato que faz mais sentido.
      </p>

      <Link to="/contact" className={styles.link}>
        Falar com Bruno
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default ServicesCTA;

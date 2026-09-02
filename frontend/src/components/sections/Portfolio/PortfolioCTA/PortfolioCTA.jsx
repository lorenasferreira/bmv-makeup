import { Link } from "react-router-dom";

import styles from "./PortfolioCTA.module.css";

function PortfolioCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <span>Seu rosto.</span>
        <span>Sua história.</span>
      </div>

      <h2>
        E a próxima
        <br />
        <em>pode ser a sua.</em>
      </h2>

      <div className={styles.bottom}>
        <p>
          Para eventos, casamentos, produções ou projetos criativos, conte um
          pouco sobre o que você tem em mente.
        </p>

        <Link to="/contact" className={styles.link}>
          Falar com Bruno
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export default PortfolioCTA;

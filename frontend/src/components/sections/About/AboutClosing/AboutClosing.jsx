import { Link } from "react-router-dom";

import styles from "./AboutClosing.module.css";

function AboutClosing() {
  return (
    <>
      <section className={styles.human}>
        <div className={styles.humanContent}>
          <div className={styles.sectionLabel}>
            <span>05</span>
            <span>Além do artista</span>
          </div>

          <h2 className={styles.sectionTitle}>
            Técnica importa.
            <br />
            Conexão também.
          </h2>

          <p>
            O trabalho acontece nos detalhes: na preparação, na conversa, na
            confiança e na forma como cada pessoa se sente durante o processo.
          </p>
        </div>

        <div className={styles.humanImages}>
          <img
            src="/assets/images/about/bruno-backstage-1.jpeg"
            alt="Bruno Menezes nos bastidores"
          />

          <img
            src="/assets/images/about/bruno-backstage-2.jpeg"
            alt="Bruno Menezes trabalhando"
          />
        </div>
      </section>

      <section className={styles.cta}>
        <span className={styles.eyebrow}>Conheça o trabalho</span>

        <h2>
          Cada rosto conta
          <br />
          uma história diferente.
        </h2>

        <Link to="/portfolio" className={styles.ctaLink}>
          Explorar portfólio →
        </Link>
      </section>
    </>
  );
}

export default AboutClosing;

import { useTranslation } from "react-i18next";

import styles from "./Footer.module.css";

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <a href="/" className={styles.logo} aria-label="BMV Makeup - Home">
            BMV
            <span>Makeup</span>
          </a>

          <p>{t("footer.tagline")}</p>
        </div>

        <div className={styles.column}>
          <p className={styles.label}>{t("footer.navigation")}</p>

          <nav aria-label="Footer navigation">
            <a href="/about">{t("footer.artist")}</a>
            <a href="/services">{t("footer.services")}</a>
            <a href="/portfolio">{t("footer.portfolio")}</a>
            <a href="/education">{t("footer.education")}</a>
            <a href="/reviews">{t("footer.reviews")}</a>
          </nav>
        </div>

        <div className={styles.column}>
          <p className={styles.label}>{t("footer.contact")}</p>

          <div className={styles.links}>
            <a href="/contact">{t("footer.book")}</a>
          </div>
        </div>

        <div className={styles.column}>
          <p className={styles.label}>{t("footer.social")}</p>

          <div className={styles.links}>
            <a href="#" target="_blank" rel="noreferrer">
              {t("footer.instagram")} ↗
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {currentYear} {t("footer.copyright")}
        </p>

        <p>{t("footer.credit")}</p>
      </div>
    </footer>
  );
}

export default Footer;

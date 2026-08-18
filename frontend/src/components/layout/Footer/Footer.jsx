import { useTranslation } from "react-i18next";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

import styles from "./Footer.module.css";

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.brand}>
          <a href="/" className={styles.logo} aria-label="BMV Makeup - Home">
            BMV
            <span>Makeup</span>
          </a>

          <p>{t("footer.tagline")}</p>
        </div>

        <nav className={styles.navigation} aria-label="Footer navigation">
          <a href="/about">{t("footer.artist")}</a>
          <a href="/services">{t("footer.services")}</a>
          <a href="/portfolio">{t("footer.portfolio")}</a>
          <a href="/education">{t("footer.education")}</a>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>
          © {currentYear} {t("footer.copyright")}
        </p>
        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/bmvmakeup/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram aria-hidden="true" />
          </a>

          <a
            href="https://wa.me/34613095171"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp aria-hidden="true" />
          </a>

          <a
            href="https://www.facebook.com/BMV.makeup"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF aria-hidden="true" />
          </a>
        </div>
        <p className={styles.credit}>
          <a
            href="https://lorenaferreira.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("footer.credit")}
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

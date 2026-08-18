import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu } from "react-icons/fi";

import MobileMenu from "./MobileMenu";

import styles from "./Header.module.css";

function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand} aria-label="BMV Makeup - Home">
        BMV
        <span>Makeup</span>
      </a>

      <nav className={styles.navigation} aria-label="Main navigation">
        <a href="/about">{t("navigation.about")}</a>
        <a href="/services">{t("navigation.services")}</a>
        <a href="/portfolio">{t("navigation.portfolio")}</a>
        <a href="/education">{t("navigation.education")}</a>
        <a href="/contact">{t("navigation.book")}</a>
      </nav>

      <button
        type="button"
        className={styles.menuButton}
        aria-label="Open navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen(true)}
      >
        <FiMenu aria-hidden="true" />
      </button>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}

export default Header;

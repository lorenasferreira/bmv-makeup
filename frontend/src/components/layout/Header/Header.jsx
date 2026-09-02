import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";
import MobileMenu from "./MobileMenu";

import styles from "./Header.module.css";

function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`${styles.header} ${!isHome ? styles.headerInternal : ""}`}
    >
      <Link to="/" className={styles.brand} aria-label="BMV Makeup - Home">
        BMV
        <span>Makeup</span>
      </Link>

      <nav className={styles.navigation} aria-label="Main navigation">
        <Link to="/">{t("navigation.home")}</Link>
        <Link to="/about">{t("navigation.about")}</Link>
        <Link to="/services">{t("navigation.services")}</Link>
        <Link to="/portfolio">{t("navigation.portfolio")}</Link>
        <Link to="/education">{t("navigation.education")}</Link>
        <Link to="/contact">{t("navigation.book")}</Link>
      </nav>

      <div className={styles.actions}>
        <LanguageSwitcher variant="header" />

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
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}

export default Header;

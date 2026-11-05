import { useCallback, useEffect, useRef, useState } from "react";
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
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  useEffect(() => {
    let previous = Math.max(0, window.scrollY);
    let distance = 0;
    const onScroll = () => {
      const current = Math.max(0, window.scrollY);
      const delta = current - previous;
      previous = current;
      setIsScrolled(current > 80);
      if (current <= 80 || isMenuOpen || headerRef.current?.contains(document.activeElement)) {
        distance = 0;
        setIsHidden(false);
        return;
      }
      distance = Math.sign(delta) === Math.sign(distance) ? distance + delta : delta;
      if (Math.abs(distance) >= 12) {
        setIsHidden(distance > 0);
        distance = 0;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen, location.pathname]);
  const menuButtonRef = useRef(null);
  const brandRef = useRef(null);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const isHome = location.pathname === "/";

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setIsHidden(false)}
      className={`${styles.header} ${!isHome ? styles.headerInternal : ""} ${isHome && isScrolled ? styles.scrolled : ""} ${isHidden && !isMenuOpen ? styles.hidden : ""}`}
    >
      <Link ref={brandRef} to="/" className={styles.brand} aria-label={t("accessibility.home")}>
        BMV
        <span>Makeup</span>
      </Link>

      <nav className={styles.navigation} aria-label={t("accessibility.mainNavigation")}>
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
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-label={t("accessibility.openMenu")}
          aria-expanded={isMenuOpen}
          aria-haspopup="dialog"
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen(true)}
        >
          <FiMenu aria-hidden="true" />
        </button>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        triggerRef={menuButtonRef}
        desktopFocusRef={brandRef}
      />
    </header>
  );
}

export default Header;

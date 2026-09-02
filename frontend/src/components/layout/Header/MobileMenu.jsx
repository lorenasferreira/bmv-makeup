import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";

import styles from "./MobileMenu.module.css";

function MobileMenu({ isOpen, onClose }) {
  const { t } = useTranslation();

  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`${styles.layer} ${isOpen ? styles.open : ""}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />

      <aside
        id="mobile-navigation"
        className={styles.menu}
        aria-label="Mobile navigation"
      >
        <div className={styles.header}>
          <span className={styles.brand}>BMV</span>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.navigation}>
          <Link to="/" onClick={onClose}>
            <span>01</span>
            {t("navigation.home")}
          </Link>

          <Link to="/about" onClick={onClose}>
            <span>02</span>
            {t("navigation.about")}
          </Link>

          <Link to="/services" onClick={onClose}>
            <span>03</span>
            {t("navigation.services")}
          </Link>

          <Link to="/portfolio" onClick={onClose}>
            <span>04</span>
            {t("navigation.portfolio")}
          </Link>

          <Link to="/education" onClick={onClose}>
            <span>05</span>
            {t("navigation.education")}
          </Link>

          <Link to="/contact" onClick={onClose}>
            <span>06</span>
            {t("navigation.book")}
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <div className={styles.footer}>
          <a
            href="https://www.instagram.com/bmvmakeup/"
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.externalLink}>
              Instagram
              <FiArrowUpRight aria-hidden="true" />
            </span>
          </a>

          <LanguageSwitcher variant="mobile" />
        </div>
      </aside>
    </div>
  );
}

export default MobileMenu;

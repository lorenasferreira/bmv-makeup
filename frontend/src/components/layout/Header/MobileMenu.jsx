import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";

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
          <a href="/about" onClick={onClose}>
            <span>01</span>
            {t("navigation.about")}
          </a>

          <a href="/services" onClick={onClose}>
            <span>02</span>
            {t("navigation.services")}
          </a>

          <a href="/portfolio" onClick={onClose}>
            <span>03</span>
            {t("navigation.portfolio")}
          </a>

          <a href="/education" onClick={onClose}>
            <span>04</span>
            {t("navigation.education")}
          </a>

          <a href="/contact" onClick={onClose}>
            <span>05</span>
            {t("navigation.book")}
            <span aria-hidden="true">→</span>
          </a>
        </nav>

        <div className={styles.footer}>
          <a
            href="https://www.instagram.com/bmvmakeup/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>

          <div className={styles.languages}>
            <button type="button">PT</button>
            <button type="button">ES</button>
            <button type="button">EN</button>
            <button type="button">CA</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default MobileMenu;

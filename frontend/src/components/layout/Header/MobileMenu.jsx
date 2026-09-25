import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";

import styles from "./MobileMenu.module.css";

function MobileMenu({ isOpen, onClose, triggerRef, desktopFocusRef }) {
  const { t } = useTranslation();

  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Keep this breakpoint aligned with Header and LanguageSwitcher CSS.
    const mobileLayout = window.matchMedia("(max-width: 1000px)");
    if (!mobileLayout.matches) {
      onClose();
      return;
    }

    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const desktopFocusTarget = desktopFocusRef.current;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleLayoutChange = () => {
      if (!mobileLayout.matches) {
        onClose();
      }
    };

    mobileLayout.addEventListener("change", handleLayoutChange);
    window.addEventListener("popstate", onClose);

    return () => {
      mobileLayout.removeEventListener("change", handleLayoutChange);
      window.removeEventListener("popstate", onClose);
      dialog.close();
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;

      const target = mobileLayout.matches ? trigger : desktopFocusTarget;
      if (target?.isConnected) {
        target.focus({ preventScroll: true });
      }
    };
  }, [isOpen, onClose, triggerRef, desktopFocusRef]);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-navigation"
      className={`${styles.layer} ${isOpen ? styles.open : ""}`}
      aria-label={t("accessibility.mobileNavigation")}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;

        const controls = event.currentTarget.querySelectorAll(
          'aside a[href], aside button:not([disabled])',
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus({ preventScroll: true });
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={() => {
        if (!dialogRef.current?.open) onClose();
      }}
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label={t("accessibility.closeMenu")}
        tabIndex={-1}
        onClick={onClose}
      />

      <aside className={styles.menu}>
        <div className={styles.header}>
          <span className={styles.brand}>BMV</span>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            aria-label={t("accessibility.closeMenu")}
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
    </dialog>
  );
}

export default MobileMenu;

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import styles from "./ScrollToTop.module.css";

function ScrollToTop() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const button = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame;
    const update = () => {
      const bounds = button.current.getBoundingClientRect();
      const overlapsControl = Array.from(document.querySelectorAll(
        "main a, main button, main input, main select, main textarea, footer a, footer button",
      )).some((control) => {
        const rect = control.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 &&
          rect.left < bounds.right + 8 && rect.right > bounds.left - 8 &&
          rect.top < bounds.bottom + 8 && rect.bottom > bounds.top - 8;
      });
      setVisible(window.scrollY > Math.max(600, window.innerHeight * 0.8) && !overlapsControl);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "instant" : "smooth" });
  };

  return (
    <button
      ref={button}
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      aria-label={t("common.scrollToTop")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </button>
  );
}

export default ScrollToTop;

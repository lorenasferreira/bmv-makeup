import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import styles from "./ScrollReveal.module.css";

function ScrollReveal() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section"));

    if (!sections.length) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motion.matches || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = sections.filter(
      (section) => !section.matches("[class*='hero'], [class*='Hero']"),
    );

    elements.forEach((element) => {
      element.classList.add(styles.reveal);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();

      elements.forEach((element) => {
        element.classList.remove(styles.reveal, styles.visible);
      });
    };
  }, [pathname]);

  return null;
}

export default ScrollReveal;

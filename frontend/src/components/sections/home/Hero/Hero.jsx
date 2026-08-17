import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Hero.module.css";

const slides = [
  { id: 1, label: "Bruno Working" },
  { id: 2, label: "Beauty Portrait" },
  { id: 3, label: "Bridal" },
  { id: 4, label: "Campaign / Editorial" },
  { id: 5, label: "Artistic Makeup" },
  { id: 6, label: "Audiovisual / Social" },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useTranslation();
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.slides} aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              index === activeSlide ? styles.active : ""
            }`}
          >
            <span>{slide.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("home.hero.eyebrow")}</p>

        <h1>
          {t("home.hero.title")}
          <br />
          {t("home.hero.titleAccent")}
        </h1>

        <a href="#portfolio" className={styles.cta}>
          {t("home.hero.cta")}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={styles.counter} aria-hidden="true">
        <span>{String(activeSlide + 1).padStart(2, "0")}</span>
        <span className={styles.counterLine} />
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

export default Hero;

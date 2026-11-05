import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Hero.module.css";

const slides = [
  { id: 1, image: "/assets/images/home/hero/bruno-working.webp", label: "home.hero.slides.working" },
  { id: 2, label: "home.hero.slides.portrait" },
  { id: 3, image: "/assets/images/home/hero/bridal.webp", label: "home.hero.slides.bridal" },
  { id: 4, label: "home.hero.slides.editorial" },
  { id: 5, image: "/assets/images/home/hero/artistic.webp", label: "home.hero.slides.artistic" },
  { id: 6, label: "home.hero.slides.audiovisual" },
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
            {slide.image ? <img src={slide.image} alt="" /> : <span>{t(slide.label)}</span>}
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

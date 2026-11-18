import imageMetadata from "../../../../data/image-metadata.json";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import styles from "./Hero.module.css";

const slides = [
  { id: 1, desktop: "/assets/images/shared/weddings/bride-behind-white-bouquet.webp", mobile: "/assets/images/home/hero/mobile/red-dress-glamour-portrait.webp" },
  { id: 2, desktop: "/assets/images/home/hero/desktop/bride-holding-makeup-mirror.webp", mobile: "/assets/images/home/hero/mobile/newlyweds-garden-embrace.webp" },
  { id: 3, desktop: "/assets/images/home/hero/desktop/newlyweds-closeup.webp", mobile: "/assets/images/shared/beauty/structured-bodice-portrait.webp" },
  { id: 4, desktop: "/assets/images/home/hero/desktop/blonde-soft-glamour-closeup.webp", mobile: "/assets/images/home/hero/mobile/bruno-preparing-male-client.webp" },
  { id: 5, desktop: "/assets/images/home/hero/desktop/sunlit-curls-and-sunglasses.webp", mobile: "/assets/images/home/hero/mobile/brunette-soft-glamour-portrait.webp" },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearTimeout(interval);
  }, [activeSlide]);

  return (
    <section className={styles.hero} aria-label={t("home.hero.carousel")}>
      <div id="home-hero-slides" className={styles.slides} aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              index === activeSlide ? styles.active : ""
            }`}
          >
            <picture>
              <source media="(max-width: 768px)" srcSet={slide.mobile} />
              <img src={slide.desktop} alt="" width={imageMetadata[slide.desktop].width} height={imageMetadata[slide.desktop].height} decoding="async" fetchPriority={index === 0 ? "high" : "low"} />
            </picture>
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

      <button type="button" className={`${styles.arrow} ${styles.previous}`} aria-label={t("home.hero.previous")} aria-controls="home-hero-slides" onClick={() => setActiveSlide(current => (current - 1 + slides.length) % slides.length)}>
        <FiChevronLeft aria-hidden="true" />
      </button>
      <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label={t("home.hero.next")} aria-controls="home-hero-slides" onClick={() => setActiveSlide(current => (current + 1) % slides.length)}>
        <FiChevronRight aria-hidden="true" />
      </button>

      <div className={styles.counter} aria-hidden="true">
        <span>{String(activeSlide + 1).padStart(2, "0")}</span>
        <span className={styles.counterLine} />
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

export default Hero;

import imageMetadata from "../../../../data/image-metadata.json";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Hero.module.css";

const slides = [
  { id: 1, desktop: "/assets/images/curated/cas-09.webp", mobile: "/assets/images/curated/nov-c0a362f3c9338b3b.webp" },
  { id: 2, desktop: "/assets/images/curated/cas-13.webp", mobile: "/assets/images/curated/nov-1ee9718a69d99658.webp" },
  { id: 3, desktop: "/assets/images/curated/nov-b94ca63befe18347.webp", mobile: "/assets/images/curated/nov-ee9b3959e5e231e9.webp" },
  { id: 4, desktop: "/assets/images/curated/soc-10.webp", mobile: "/assets/images/curated/nov-8578c4c71970766e.webp" },
  { id: 5, desktop: "/assets/images/curated/soc-08.webp", mobile: "/assets/images/curated/nov-e517b557a712e6f1.webp" },
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

      <div className={styles.counter} aria-hidden="true">
        <span>{String(activeSlide + 1).padStart(2, "0")}</span>
        <span className={styles.counterLine} />
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

export default Hero;

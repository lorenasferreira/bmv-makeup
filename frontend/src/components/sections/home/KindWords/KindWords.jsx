import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import styles from "./KindWords.module.css";

const reviews = [
  {
    id: "natalia",
    author: "Natalia",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/natalia.webp",
    text: "home.reviews.items.natalia",
  },
  {
    id: "lorena",
    author: "Lorena",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/lorena.webp",
    text: "home.reviews.items.lorena",
  },
  {
    id: "gabriela",
    author: "Gabriela",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/gabriela.webp",
    text: "home.reviews.items.gabriela",
  },
  {
    id: "maria",
    author: "María",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/maria.webp",
    text: "home.reviews.items.maria",
  },
  {
    id: "aline",
    author: "Aline",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/aline.webp",
    text: "home.reviews.items.aline",
  },
  {
    id: "lolys",
    author: "Lolys",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/lolys.webp",
    text: "home.reviews.items.lolys",
  },
];

function KindWords() {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const activeReview = reviews[activeIndex];

  const goToReview = (index) => {
    setActiveIndex(index);
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? reviews.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === reviews.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    if (isPaused || hasFocus || reviews.length <= 1) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval;
    const updateAutoplay = () => {
      window.clearInterval(interval);
      if (!reducedMotion.matches) {
        interval = window.setInterval(() => {
          setActiveIndex((current) => (current + 1) % reviews.length);
        }, 6500);
      }
    };

    updateAutoplay();
    reducedMotion.addEventListener("change", updateAutoplay);

    return () => {
      window.clearInterval(interval);
      reducedMotion.removeEventListener("change", updateAutoplay);
    };
  }, [isPaused, hasFocus]);

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{t("home.reviews.eyebrow")}</p>

        <h2>
          {t("home.reviews.title")}
          <br />
          <em>{t("home.reviews.titleAccent")}</em>
        </h2>
      </div>

      <div
        className={styles.reviewArea}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setHasFocus(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
        }}
      >
        <article className={styles.review} key={activeReview.id}>
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>

          <blockquote>{t(activeReview.text)}</blockquote>

          <footer>
            <img
              src={activeReview.image}
              alt={activeReview.author}
              className={styles.authorImage}
            />

            <div className={styles.authorInfo}>
              <span className={styles.author}>{activeReview.author}</span>

              <span
                className={styles.stars}
                aria-label={t("home.reviews.rating", { rating: activeReview.rating })}
              >
                {"★".repeat(activeReview.rating)}
              </span>

              <span className={styles.source}>{activeReview.source}</span>
            </div>
          </footer>
        </article>

        <div className={styles.navigation}>
          <div className={styles.indicators}>
            {reviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                className={`${styles.indicator} ${
                  index === activeIndex ? styles.indicatorActive : ""
                }`}
                aria-label={t("home.reviews.goTo", { number: index + 1 })}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => goToReview(index)}
              />
            ))}
          </div>

          <div className={styles.controls}>
            <span className={styles.counter}>
              {String(activeIndex + 1).padStart(2, "0")}
              <span>/</span>
              {String(reviews.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={showPrevious}
              aria-label={t("home.reviews.previous")}
            >
              <FiArrowLeft aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label={t("home.reviews.next")}
            >
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          {t("home.reviews.footerLine1")}
          <br />
          {t("home.reviews.footerLine2")}
        </p>

        <div className={styles.externalLinks}>
          <a href="https://maps.app.goo.gl/ytKqqcuCR61eWxrr6">
            {t("home.reviews.google")}
            <span aria-hidden="true">↗</span>
          </a>

          <a
            href="https://www.bodas.net/belleza-novias/bmv-makeup--e248810"
            target="_blank"
            rel="noreferrer"
          >
            {t("home.reviews.bodas")}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default KindWords;

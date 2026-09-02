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
    text: "Bruno busca entender você e aconselhar a melhor opção, sempre se adaptando ao seu estilo e à sua personalidade. É próximo, alegre e um verdadeiro artista. Não me canso de recomendá-lo.",
  },
  {
    id: "lorena",
    author: "Lorena",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/lorena.webp",
    text: "Como mulher negra, uma das minhas maiores preocupações era encontrar um profissional que realmente soubesse trabalhar com o meu tom de pele. Bruno acertou perfeitamente o tom, valorizou minha pele sem alterar sua cor e criou uma maquiagem linda, pensada para mim. Além de extremamente atencioso, é um profissional que sabe trabalhar com diferentes tons e tipos de pele.",
  },
  {
    id: "gabriela",
    author: "Gabriela",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/gabriela.webp",
    text: "Para me casar na Sagrada Família, escolhi Bruno para a minha maquiagem. Ele conseguiu entender meu sonho com muito profissionalismo e carinho, fazendo tudo com qualidade e utilizando sempre os melhores produtos.",
  },
  {
    id: "maria",
    author: "María",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/maria.webp",
    text: "Mesmo sendo muito indecisa, Bruno e eu nos entendemos muito bem e encontramos a maquiagem com a qual me senti confortável e linda para o meu casamento. Durante todo o processo ele foi muito gentil. Sem dúvida, recomendo.",
  },
  {
    id: "aline",
    author: "Aline",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/aline.webp",
    text: "Bruno foi educado, gentil e me fez confiar tranquilamente em seu trabalho. Foi um sonho realizado e ele fez parte disso. Sempre vou me lembrar daquele dia e, claro, da sensibilidade que teve comigo.",
  },
  {
    id: "lolys",
    author: "Lolys",
    rating: 5,
    source: "Bodas.net",
    image: "/assets/images/reviews/lolys.webp",
    text: "Não poderia ter escolhido um maquiador melhor para o dia do meu casamento. Ele captou exatamente o que eu queria e me fez sentir linda e super confortável durante todo o dia. Um grande profissional, próximo e atencioso.",
  },
];

function KindWords() {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    if (isPaused || reviews.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        current === reviews.length - 1 ? 0 : current + 1,
      );
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

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
      >
        <article className={styles.review} key={activeReview.id}>
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>

          <blockquote>{activeReview.text}</blockquote>

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
                aria-label={`${activeReview.rating} de 5 estrelas`}
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
                aria-label={`Ver avaliação ${index + 1}`}
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
              aria-label="Avaliação anterior"
            >
              <FiArrowLeft aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Próxima avaliação"
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

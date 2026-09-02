import styles from "./WeddingsReviews.module.css";

const reviews = [
  {
    name: "Clare",
    source: "Bodas.net",
    image: "/assets/images/reviews/clare.webp",
    title: "Confiança desde a prova até o casamento.",
    text: "Clare destacou todo o acompanhamento durante o processo, da preparação do look à execução no dia do casamento, além da segurança de se sentir compreendida em cada escolha.",
  },
  {
    name: "Marina",
    source: "Bodas.net",
    image: "/assets/images/reviews/marina.webp",
    title: "Uma experiência construída com calma.",
    text: "Marina ressaltou o cuidado durante todo o processo bridal, a atenção aos detalhes e a tranquilidade de chegar ao casamento sabendo que o resultado já havia sido construído em conjunto.",
  },
];

function WeddingsReviews() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.label}>
          <span>03</span>
          <span>Kind Words</span>
        </div>

        <h2>
          Quando confiança
          <br />
          também faz parte
          <br />
          <em>da beleza.</em>
        </h2>
      </div>

      <div className={styles.reviews}>
        {reviews.map((review, index) => (
          <article className={styles.review} key={review.name}>
            <span className={styles.reviewNumber}>0{index + 1}</span>

            <div className={styles.person}>
              <img src={review.image} alt={review.name} />

              <div>
                <strong>{review.name}</strong>
                <span>{review.source}</span>
              </div>
            </div>

            <div className={styles.reviewContent}>
              <h3>{review.title}</h3>
              <p>{review.text}</p>
            </div>
          </article>
        ))}
      </div>

      <a
        href="https://www.bodas.net/belleza-novias/bmv-makeup--e248810"
        target="_blank"
        rel="noreferrer"
        className={styles.external}
      >
        Ver avaliações no Bodas.net
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export default WeddingsReviews;

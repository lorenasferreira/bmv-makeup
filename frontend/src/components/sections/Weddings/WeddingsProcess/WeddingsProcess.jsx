import { useTranslation } from "react-i18next";

import styles from "./WeddingsProcess.module.css";

const steps = [
  {
    number: "01",
    title: "weddings.process.steps.vision.title",
    image: "/assets/images/weddings/vision.webp",
    text: "weddings.process.steps.vision.description",
  },
  {
    number: "02",
    title: "weddings.process.steps.trial.title",
    image: "/assets/images/weddings/trial.webp",
    text: "weddings.process.steps.trial.description",
  },
  {
    number: "03",
    title: "weddings.process.steps.weddingDay.title",
    image: "/assets/images/weddings/wedding-day.webp",
    text: "weddings.process.steps.weddingDay.description",
  },
  {
    number: "04",
    title: "weddings.process.steps.celebration.title",
    image: "/assets/images/weddings/celebration.webp",
    text: "weddings.process.steps.celebration.description",
  },
];

function WeddingsProcess() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.label}>
          <span>02</span>
          <span>{t("weddings.process.eyebrow")}</span>
        </div>

        <h2>
          {t("weddings.process.title")}
          <br />
          <em>{t("weddings.process.titleAccent")}</em>
        </h2>

        <p>
          {t("weddings.process.description")}
        </p>
      </div>

      <div className={styles.cards}>
        {steps.map((step) => (
          <article className={styles.card} key={step.number}>
            <div className={styles.imageWrapper}>
              <img src={step.image} alt={t(step.title)} />

              <span className={styles.number}>{step.number}</span>
            </div>

            <div className={styles.cardContent}>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WeddingsProcess;

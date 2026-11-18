import { useTranslation } from "react-i18next";

import styles from "./WeddingsProcess.module.css";

const steps = [
  {
    number: "01",
    title: "weddings.process.steps.vision.title",
    text: "weddings.process.steps.vision.description",
  },
  {
    number: "02",
    title: "weddings.process.steps.trial.title",
    text: "weddings.process.steps.trial.description",
  },
  {
    number: "03",
    title: "weddings.process.steps.weddingDay.title",
    text: "weddings.process.steps.weddingDay.description",
  },
  {
    number: "04",
    title: "weddings.process.steps.celebration.title",
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

        <h2 id="wedding-process-title">
          {t("weddings.process.title")}
          {" "}
          <em>{t("weddings.process.titleAccent")}</em>
        </h2>

        <p>
          {t("weddings.process.description")}
        </p>
      </div>

      <ol className={styles.cards} tabIndex={0} aria-labelledby="wedding-process-title">
        {steps.map((step) => (
          <li className={styles.card} key={step.number}>
            <span className={styles.number}>{step.number}</span>

            <div className={styles.cardContent}>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WeddingsProcess;

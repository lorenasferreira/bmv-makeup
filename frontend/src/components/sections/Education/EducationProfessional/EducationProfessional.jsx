import { useTranslation } from "react-i18next";

import styles from "./EducationProfessional.module.css";

function EducationProfessional() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <div className={styles.sectionLabel}>
          <span>03</span>
          <span>{t("education.professional.eyebrow")}</span>
        </div>

        <span className={styles.module}>{t("education.professional.module")}</span>
      </div>

      <div className={styles.heading}>
        <h2>
          {t("education.professional.title")}
          <br />
          <em>{t("education.professional.titleAccent")}</em>
        </h2>

        <p>
          {t("education.professional.description")}
        </p>
      </div>

      <div className={styles.visual}>
        <div className={styles.imageMain}>
          <img
            src="/assets/images/education/bridal-main.webp"
            alt={t("education.professional.mainImageAlt")}
          />
        </div>

        <div className={styles.imageDetail}>
          <img
            src="/assets/images/education/bridal-detail.webp"
            alt={t("education.professional.detailImageAlt")}
          />
        </div>
      </div>

      <div className={styles.information}>
        <div>
          <span className={styles.label}>{t("education.professional.contentLabel")}</span>

          <div className={styles.learningList}>
            <span>{t("education.professional.topics.colour")}</span>
            <span>{t("education.professional.topics.clientCare")}</span>
            <span>{t("education.professional.topics.skin")}</span>
            <span>{t("education.professional.topics.touchUps")}</span>
            <span>{t("education.professional.topics.completeLook")}</span>
          </div>
        </div>

        <div className={styles.details}>
          <span className={styles.label}>{t("education.professional.informationLabel")}</span>

          <div>
            <span>{t("education.professional.investmentLabel")}</span>
            <strong>€300</strong>
          </div>

          <div>
            <span>{t("education.professional.durationLabel")}</span>
            <strong>{t("education.professional.durationValue")}</strong>
          </div>

          <div>
            <span>{t("education.professional.modelLabel")}</span>
            <strong>100 €</strong>
          </div>
        </div>

        <div className={styles.condition}>
          <span className={styles.label}>{t("education.professional.conditionLabel")}</span>

          <p>
            {t("education.professional.condition")}
          </p>

          <p>{t("education.professional.note")}</p>
        </div>
      </div>
    </section>
  );
}

export default EducationProfessional;

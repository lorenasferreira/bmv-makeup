import { useTranslation } from "react-i18next";

import styles from "./SelectedWork.module.css";

const works = [
  { id: 1, className: "heroWork", label: "Beauty Portrait" },
  { id: 2, className: "portraitWork", label: "Editorial" },
  { id: 3, className: "detailWork", label: "Beauty Detail" },
  { id: 4, className: "wideWork", label: "Campaign" },
  { id: 5, className: "finalWork", label: "Artistic" },
];

function SelectedWork() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="portfolio">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>{t("home.selectedWork.eyebrow")}</p>

        <h2>
          {t("home.selectedWork.title")}
          <br />
          <em>{t("home.selectedWork.titleAccent")}</em>
        </h2>
      </header>

      <div className={styles.gallery}>
        {works.map((work) => (
          <div
            key={work.id}
            className={`${styles.work} ${styles[work.className]}`}
          >
            <div className={styles.placeholder}>
              <span>{work.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>{t("home.selectedWork.description")}</p>

        <a href="/portfolio" className={styles.link}>
          {t("home.selectedWork.cta")}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export default SelectedWork;

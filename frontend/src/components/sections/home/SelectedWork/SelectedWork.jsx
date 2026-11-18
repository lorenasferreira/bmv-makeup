import OptimizedImage from "../../../common/OptimizedImage/OptimizedImage";
import { useTranslation } from "react-i18next";

import styles from "./SelectedWork.module.css";

const works = [
  { id: 1, className: "heroWork", image: "/assets/images/shared/beauty/structured-bodice-portrait.webp", label: "home.selectedWork.items.portrait" },
  { id: 2, className: "portraitWork", image: "/assets/images/home/selected-work/brunette-makeup-closeup.webp", label: "home.selectedWork.items.editorial" },
  { id: 3, className: "detailWork", image: "/assets/images/home/selected-work/dramatic-editorial-portrait.webp", label: "home.selectedWork.items.detail" },
  { id: 5, className: "finalWork", image: "/assets/images/home/selected-work/halloween-couple-portrait.webp", label: "home.selectedWork.items.artistic" },
];

function SelectedWork() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="portfolio">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>{t("home.selectedWork.eyebrow")}</p>

        <h2>
          {t("home.selectedWork.title")}
          {" "}
          <em>{t("home.selectedWork.titleAccent")}</em>
        </h2>
      </header>

      <div className={styles.gallery}>
        {works.map((work) => (
          <div
            key={work.id}
            className={`${styles.work} ${styles[work.className]}`}
          >
            <div className={styles.imageWrapper}>
              <OptimizedImage sizes="(max-width: 640px) 100vw, 55vw" src={work.image} alt={t(work.label)} loading="lazy" />
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

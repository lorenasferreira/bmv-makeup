import OptimizedImage from "../../../common/OptimizedImage/OptimizedImage";
import { useTranslation } from "react-i18next";

import styles from "./BehindTheBrush.module.css";

const moments = [
  { id: 1, image: "/assets/images/home/behind-the-brush/bridal-lipstick-preparation.webp", label: "home.behindTheBrush.moments.preparation", className: "large" },
  { id: 2, image: "/assets/images/home/behind-the-brush/bride-on-grand-staircase.webp", label: "home.behindTheBrush.moments.backstage", className: "smallTop" },
  { id: 3, image: "/assets/images/home/behind-the-brush/finished-bridal-makeup.webp", label: "home.behindTheBrush.moments.client", className: "smallBottom" },
];

function BehindTheBrush() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{t("home.behindTheBrush.eyebrow")}</p>

        <h2>
          {t("home.behindTheBrush.title")}
          <br />
          <em>{t("home.behindTheBrush.titleAccent")}</em>
        </h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.copy}>
          <p>{t("home.behindTheBrush.paragraph1")}</p>
          <p>{t("home.behindTheBrush.paragraph2")}</p>
        </div>

        <div className={styles.gallery}>
          {moments.map((moment) => (
            <div
              key={moment.id}
              className={`${styles.image} ${styles[moment.className]}`}
            >
              <OptimizedImage sizes="(max-width: 640px) 100vw, 40vw" src={moment.image} alt={t(moment.label)} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.statement}>
        <span>{t("home.behindTheBrush.statement1")}</span>
        <span>{t("home.behindTheBrush.statement2")}</span>
        <span>{t("home.behindTheBrush.statement3")}</span>
      </div>
    </section>
  );
}

export default BehindTheBrush;

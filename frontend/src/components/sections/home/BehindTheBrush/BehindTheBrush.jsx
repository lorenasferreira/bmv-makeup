import { useTranslation } from "react-i18next";

import styles from "./BehindTheBrush.module.css";

const moments = [
  { id: 1, label: "Skin Preparation", className: "large" },
  { id: 2, label: "Behind the Scenes", className: "smallTop" },
  { id: 3, label: "Client Moment", className: "smallBottom" },
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
              <span>{moment.label}</span>
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

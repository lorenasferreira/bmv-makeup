import { useTranslation } from "react-i18next";

import styles from "./MeetBruno.module.css";

function MeetBruno() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="about">
      <div className={styles.imageColumn}>
        <div className={styles.imagePlaceholder}>
          <span>Bruno Portrait</span>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("home.artist.eyebrow")}</p>

        <h2 className={styles.title}>
          <span className={styles.titleLine}>
            <span className={styles.titleBase}>{t("home.artist.title")} </span>

            <em className={styles.titleHighlight}>
              {t("home.artist.titleHighlight")}
            </em>
          </span>

          <span className={styles.titleLine}>
            <span className={styles.titleBase}>
              {t("home.artist.titleSecond")}{" "}
            </span>

            <em className={styles.titleHighlightItalic}>
              {t("home.artist.titleSecondHighlight")}
            </em>
          </span>
        </h2>

        <div className={styles.copy}>
          <p>{t("home.artist.paragraph1")}</p>
          <p>{t("home.artist.paragraph2")}</p>
        </div>

        <a href="/about" className={styles.link}>
          {t("home.artist.cta")}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <span className={styles.signature}>BMV</span>
    </section>
  );
}

export default MeetBruno;

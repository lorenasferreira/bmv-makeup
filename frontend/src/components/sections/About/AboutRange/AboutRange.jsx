import { useTranslation } from "react-i18next";

import styles from "./AboutRange.module.css";

const firstRow = ["about.range.items.weddings", "about.range.items.beauty", "about.range.items.social", "about.range.items.campaigns"];

const secondRow = ["about.range.items.photoshoots", "about.range.items.artistic", "about.range.items.audiovisual", "about.range.items.editorial"];

function AboutRange() {
  const { t } = useTranslation();

  return (
    <section className={styles.range}>
      <div className={styles.content}>
        <div className={styles.sectionLabel}>
          <span>04</span>
          <span>{t("about.range.eyebrow")}</span>
        </div>

        <div className={styles.rangeHeader}>
          <h2 className={styles.rangeTitle}>
            {t("about.range.title")}
            <br />
            {t("about.range.titleAccent")}
          </h2>

          <p>
            {t("about.range.description")}
          </p>
        </div>
      </div>

      <div className={styles.marquees}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            {[...firstRow, ...firstRow].map((service, index) => (
              <span key={`${service}-${index}`} aria-hidden={index >= firstRow.length ? true : undefined}>
                {t(service)}
                <i>—</i>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.marquee}>
          <div className={`${styles.track} ${styles.trackReverse}`}>
            {[...secondRow, ...secondRow].map((service, index) => (
              <span key={`${service}-${index}`} aria-hidden={index >= secondRow.length ? true : undefined}>
                {t(service)}
                <i>—</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutRange;

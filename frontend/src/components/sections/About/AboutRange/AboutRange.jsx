import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import styles from "./AboutRange.module.css";

const firstRow = ["about.range.items.weddings", "about.range.items.beauty", "about.range.items.social"];

const secondRow = ["about.range.items.artistic", "about.range.items.editorial", "about.range.items.audiovisual", "about.range.items.campaigns", "about.range.items.photoshoots"];

function AboutRange() {
  const { t } = useTranslation();
  const marquees = useRef(null);

  useLayoutEffect(() => {
    const container = marquees.current;
    const tracks = [...container.children].map(row => row.firstElementChild);
    const groups = tracks.map(track => track.firstElementChild);
    const synchronizeSpeed = () => {
      const baseDuration = parseFloat(getComputedStyle(container).getPropertyValue("--marquee-base-duration"));
      const pixelsPerSecond = groups[0].getBoundingClientRect().width / baseDuration;

      tracks.forEach((track, index) => {
        track.style.setProperty("--marquee-duration", `${groups[index].getBoundingClientRect().width / pixelsPerSecond}s`);
      });
    };
    synchronizeSpeed();
    const observer = new ResizeObserver(synchronizeSpeed);
    observer.observe(container);
    groups.forEach(group => observer.observe(group));
    return () => observer.disconnect();
  }, []);

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

      <div className={styles.marquees} ref={marquees}>
        {[firstRow, secondRow].map((row, rowIndex) => (
          <div className={styles.marquee} key={row[0]}>
            <div className={`${styles.track} ${rowIndex === 1 ? styles.trackReverse : ""}`}>
              {[0, 1].map(copy => (
                <div className={styles.marqueeGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {row.map(service => (
                    <span key={service}>{t(service)}<i>—</i></span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutRange;

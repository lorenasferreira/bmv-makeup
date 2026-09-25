import { useTranslation } from "react-i18next";

import styles from "./AboutStory.module.css";

function AboutStory() {
  const { t } = useTranslation();

  return (
    <>
      <section className={styles.manifesto}>
        <div className={styles.sectionLabel}>
          <span>01</span>
          <span>{t("about.story.manifesto.eyebrow")}</span>
        </div>

        <div className={styles.manifestoContent}>
          <p className={styles.manifestoLead}>
            {t("about.story.manifesto.title")}
            <br />
            {t("about.story.manifesto.titleSecond")}
            <br />
            {t("about.story.manifesto.titleAccent")}
          </p>

          <div className={styles.manifestoCopy}>
            <p>
              {t("about.story.manifesto.paragraph1")}
            </p>

            <p>
              {t("about.story.manifesto.paragraph2")}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyImageWrapper}>
          <img
            src="/assets/images/about/bruno-portrait.jpeg"
            alt={t("about.story.journey.imageAlt")}
            className={styles.storyImage}
          />
        </div>

        <div className={styles.storyContent}>
          <div className={styles.sectionLabel}>
            <span>02</span>
            <span>{t("about.story.journey.eyebrow")}</span>
          </div>

          <h2 className={styles.sectionTitle}>
            {t("about.story.journey.title")}
            <br />
            {t("about.story.journey.titleSecond")}
            <br />
            {t("about.story.journey.titleAccent")}
          </h2>

          <div className={styles.storyCopy}>
            <p>
              {t("about.story.journey.paragraph1")}
            </p>

            <p>
              {t("about.story.journey.paragraph2")}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.approachImageWrapper}>
          <img
            src="/assets/images/about/bruno-client.jpeg"
            alt={t("about.story.approach.imageAlt")}
            className={styles.approachImage}
          />
        </div>

        <div className={styles.approachContent}>
          <div className={styles.sectionLabel}>
            <span>03</span>
            <span>{t("about.story.approach.eyebrow")}</span>
          </div>

          <h2 className={styles.sectionTitle}>
            {t("about.story.approach.title")}
            <br />
            {t("about.story.approach.titleAccent")}
          </h2>

          <p className={styles.approachText}>
            {t("about.story.approach.description")}
          </p>
        </div>
      </section>
    </>
  );
}

export default AboutStory;

import OptimizedImage from "../../../common/OptimizedImage/OptimizedImage";
import { useTranslation } from "react-i18next";

import styles from "./WeddingsIntro.module.css";

function WeddingsIntro() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.label}>
        <span>01</span>
        <span>{t("weddings.intro.eyebrow")}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.statement}>
          <h2>
            {t("weddings.intro.title")}
            {" "}
            {t("weddings.intro.titleSecond")}
            {" "}
            <em>{t("weddings.intro.titleAccent")}</em>
          </h2>
        </div>

        <div className={styles.copy}>
          <div className={styles.imageWrapper}>
            <OptimizedImage sizes="(max-width: 640px) 85vw, 35vw"
              src="/assets/images/weddings/bride-with-white-bouquet-outdoors.webp"
              alt={t("weddings.intro.imageAlt")}
            />
          </div>

          <p>
            {t("weddings.intro.paragraph1")}
          </p>

          <p>
            {t("weddings.intro.paragraph2")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default WeddingsIntro;

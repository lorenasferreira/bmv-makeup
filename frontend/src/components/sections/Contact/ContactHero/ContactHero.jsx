import { useTranslation } from "react-i18next";

import styles from "./ContactHero.module.css";

function ContactHero() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={styles.top}>
        <span className={styles.eyebrow}>{t("contact.hero.eyebrow")}</span>

        <span className={styles.meta}>
          Barcelona
          <br />
          {t("contact.hero.availability")}
        </span>
      </div>

      <div className={styles.heading}>
        <h1>
          {t("contact.hero.title")}
          <span>{t("contact.hero.titleAccent")}</span>
        </h1>
      </div>

      <div className={styles.bottom}>
        <p>
          {t("contact.hero.description")}
        </p>

        <span className={styles.number}>+34 613 09 51 71</span>
      </div>
    </section>
  );
}

export default ContactHero;

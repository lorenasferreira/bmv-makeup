import { useTranslation } from "react-i18next";

import styles from "./WeddingsHero.module.css";

function WeddingsHero() {
  const { t } = useTranslation();

  const message = t("weddings.whatsapp.message");

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.hero}>
      <div className={styles.visual}>
        <img
          src="/assets/images/weddings/weddings-hero.webp"
          alt={t("weddings.hero.imageAlt")}
        />

        <span className={styles.location}>
          {t("weddings.hero.location")}
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.eyebrow}>{t("weddings.hero.eyebrow")}</span>
          <span className={styles.number}>01 / BMV</span>
        </div>

        <div className={styles.heading}>
          <h1>
            {t("weddings.hero.title")}
            <span>{t("weddings.hero.titleAccent")}</span>
          </h1>

          <p>
            {t("weddings.hero.description")}
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.cta}
        >
          {t("weddings.hero.cta")}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

export default WeddingsHero;

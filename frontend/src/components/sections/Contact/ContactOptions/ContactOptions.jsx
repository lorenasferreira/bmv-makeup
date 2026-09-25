import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

import styles from "./ContactOptions.module.css";

function ContactOptions() {
  const { t } = useTranslation();

  const message = t("contact.whatsapp.availability");

  const whatsappUrl = `https://wa.me/34613095171?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>
        <span>01</span>
        <span>{t("contact.options.eyebrow")}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.intro}>
          <h2>
            {t("contact.options.title")}
            <br />
            {t("contact.options.titleSecond")}
            <br />
            <em>{t("contact.options.titleAccent")}</em>
          </h2>

          <p>
            {t("contact.options.description")}
          </p>
        </div>

        <div className={styles.options}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.option}
          >
            <div>
              <span className={styles.optionLabel}>{t("contact.options.primary")}</span>
              <h3>WhatsApp</h3>
            </div>

            <div className={styles.optionBottom}>
              <span>+34 613 09 51 71</span>
              <FiArrowUpRight aria-hidden="true" />
            </div>
          </a>

          <a
            href="https://www.instagram.com/bmvmakeup/"
            target="_blank"
            rel="noreferrer"
            className={styles.option}
          >
            <div>
              <span className={styles.optionLabel}>{t("contact.options.social")}</span>
              <h3>Instagram</h3>
            </div>

            <div className={styles.optionBottom}>
              <span>@bmvmakeup</span>
              <FiArrowUpRight aria-hidden="true" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactOptions;

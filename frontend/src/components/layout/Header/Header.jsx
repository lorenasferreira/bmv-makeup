import { useTranslation } from "react-i18next";

import styles from "./Header.module.css";

function Header() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand} aria-label="BMV Makeup - Home">
        BMV
        <span>Makeup</span>
      </a>

      <nav className={styles.navigation} aria-label="Main navigation">
        <a href="#about">{t("navigation.about")}</a>
        <a href="#services">{t("navigation.services")}</a>
        <a href="#portfolio">{t("navigation.portfolio")}</a>
        <a href="#education">{t("navigation.education")}</a>

        <a href="#contact" className={styles.booking}>
          {t("navigation.book")}
        </a>
      </nav>
    </header>
  );
}

export default Header;

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

function NotFound() {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>{t("home.hero.eyebrow")}</p>
      <h1>404</h1>
      <h2>{t("notFound.title")}</h2>
      <p>{t("notFound.text")}</p>
      <Link to="/" className={styles.link}>
        {t("navigation.home")}
        <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}

export default NotFound;

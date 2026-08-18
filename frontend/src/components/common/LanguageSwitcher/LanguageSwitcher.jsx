import { useTranslation } from "react-i18next";

import styles from "./LanguageSwitcher.module.css";

const languages = [
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "ca", label: "CA" },
];

function LanguageSwitcher({ variant = "default" }) {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("bmv-language", language);
  };

  return (
    <div
      className={`${styles.switcher} ${styles[variant]}`}
      aria-label="Language selector"
    >
      {languages.map((language) => {
        const isActive = i18n.language === language.code;

        return (
          <button
            key={language.code}
            type="button"
            className={isActive ? styles.active : ""}
            aria-pressed={isActive}
            onClick={() => changeLanguage(language.code)}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;

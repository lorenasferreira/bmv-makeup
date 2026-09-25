import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import ca from "./locales/ca.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt },
    ca: { translation: ca },
  },
  lng: localStorage.getItem("bmv-language") || "en",
  supportedLngs: ["pt", "en", "es", "ca"],
  load: "languageOnly",
  fallbackLng: "pt",

  interpolation: {
    escapeValue: false,
  },
});

const updateDocumentLanguage = () => {
  document.documentElement.lang = i18n.resolvedLanguage || "pt";
};

i18n.on("languageChanged", updateDocumentLanguage);
updateDocumentLanguage();

export default i18n;

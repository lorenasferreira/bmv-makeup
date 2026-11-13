import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const pages = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/portfolio": "portfolio",
  "/education": "education",
  "/contact": "contact",
  "/services/weddings": "weddings",
};
const locales = { en: "en_GB", pt: "pt_BR", es: "es_ES", ca: "ca_ES" };

// Social crawlers receive the complete brand metadata from index.html.
// These updates localize the document during SPA navigation; they do not replace that HTML.
function SeoMetadata() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const route = pathname.replace(/\/+$/, "") || "/";
    const page = pages[route];
    const title = page && page !== "home"
      ? `${t(`seo.pages.${page}`)} | ${t("seo.title")}`
      : t("seo.title");
    const description = t("seo.description");
    const url = new URL(page ? route : "/", "https://www.bmvmakeup.com/").href;
    document.title = title;
    document.documentElement.lang = i18n.resolvedLanguage || "en";

    const setMeta = (attribute, name, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.append(element);
      }
      element.setAttribute("content", content);
    };
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:locale", locales[i18n.resolvedLanguage] || "en_GB");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    document.head.querySelector('link[rel="canonical"]').href = url;
  }, [pathname, t, i18n.resolvedLanguage]);

  return null;
}

export default SeoMetadata;

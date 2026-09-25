import { useTranslation } from "react-i18next";
import { useState } from "react";

import styles from "./PortfolioGallery.module.css";

const categories = [
  { id: "all", label: "portfolio.gallery.categories.all" },
  { id: "weddings", label: "portfolio.gallery.categories.weddings" },
  { id: "beauty", label: "portfolio.gallery.categories.beauty" },
  { id: "campaigns", label: "portfolio.gallery.categories.campaigns" },
  { id: "photoshoots", label: "portfolio.gallery.categories.photoshoots" },
  { id: "artistic", label: "portfolio.gallery.categories.artistic" },
  { id: "audiovisual", label: "portfolio.gallery.categories.audiovisual" },
];

const portfolioItems = [
  {
    id: 1,
    image: "/assets/images/portfolio/wedding-01.webp",
    category: "weddings",
    label: "portfolio.gallery.categories.weddings",
    size: "large",
  },
  {
    id: 2,
    image: "/assets/images/portfolio/artistic-01.webp",
    category: "artistic",
    label: "portfolio.gallery.categories.artistic",
    size: "portrait",
  },
  {
    id: 3,
    image: "/assets/images/portfolio/beauty-01.webp",
    category: "beauty",
    label: "portfolio.gallery.categories.beauty",
    size: "small",
  },
  {
    id: 4,
    image: "/assets/images/portfolio/campaign-01.webp",
    category: "campaigns",
    label: "portfolio.gallery.categories.campaigns",
    size: "wide",
  },
  {
    id: 5,
    image: "/assets/images/portfolio/photoshoot-01.webp",
    category: "photoshoots",
    label: "portfolio.gallery.categories.photoshoots",
    size: "portrait",
  },
  {
    id: 6,
    image: "/assets/images/portfolio/audiovisual-01.webp",
    category: "audiovisual",
    label: "portfolio.gallery.categories.audiovisual",
    size: "medium",
  },
  {
    id: 7,
    image: "/assets/images/portfolio/wedding-02.webp",
    category: "weddings",
    label: "portfolio.gallery.categories.weddings",
    size: "small",
  },
  {
    id: 8,
    image: "/assets/images/portfolio/beauty-02.webp",
    category: "beauty",
    label: "portfolio.gallery.categories.beauty",
    size: "large",
  },
  {
    id: 9,
    image: "/assets/images/portfolio/artistic-02.webp",
    category: "artistic",
    label: "portfolio.gallery.categories.artistic",
    size: "wide",
  },
  {
    id: 10,
    image: "/assets/images/portfolio/campaign-02.webp",
    category: "campaigns",
    label: "portfolio.gallery.categories.campaigns",
    size: "portrait",
  },
  {
    id: 11,
    image: "/assets/images/portfolio/wedding-03.webp",
    category: "weddings",
    label: "portfolio.gallery.categories.weddings",
    size: "medium",
  },
  {
    id: 12,
    image: "/assets/images/portfolio/photoshoot-02.webp",
    category: "photoshoots",
    label: "portfolio.gallery.categories.photoshoots",
    size: "small",
  },
  {
    id: 13,
    image: "/assets/images/portfolio/audiovisual-02.webp",
    category: "audiovisual",
    label: "portfolio.gallery.categories.audiovisual",
    size: "large",
  },
  {
    id: 14,
    image: "/assets/images/portfolio/beauty-03.webp",
    category: "beauty",
    label: "portfolio.gallery.categories.beauty",
    size: "portrait",
  },
  {
    id: 15,
    image: "/assets/images/portfolio/artistic-03.webp",
    category: "artistic",
    label: "portfolio.gallery.categories.artistic",
    size: "small",
  },
  {
    id: 16,
    image: "/assets/images/portfolio/wedding-04.webp",
    category: "weddings",
    label: "portfolio.gallery.categories.weddings",
    size: "wide",
  },
  {
    id: 17,
    image: "/assets/images/portfolio/campaign-03.webp",
    category: "campaigns",
    label: "portfolio.gallery.categories.campaigns",
    size: "medium",
  },
  {
    id: 18,
    image: "/assets/images/portfolio/photoshoot-03.webp",
    category: "photoshoots",
    label: "portfolio.gallery.categories.photoshoots",
    size: "large",
  },
  {
    id: 19,
    image: "/assets/images/portfolio/beauty-04.webp",
    category: "beauty",
    label: "portfolio.gallery.categories.beauty",
    size: "small",
  },
  {
    id: 20,
    image: "/assets/images/portfolio/audiovisual-03.webp",
    category: "audiovisual",
    label: "portfolio.gallery.categories.audiovisual",
    size: "portrait",
  },
  {
    id: 21,
    image: "/assets/images/portfolio/artistic-04.webp",
    category: "artistic",
    label: "portfolio.gallery.categories.artistic",
    size: "large",
  },
  {
    id: 22,
    image: "/assets/images/portfolio/campaign-04.webp",
    category: "campaigns",
    label: "portfolio.gallery.categories.campaigns",
    size: "small",
  },
  {
    id: 23,
    image: "/assets/images/portfolio/photoshoot-04.webp",
    category: "photoshoots",
    label: "portfolio.gallery.categories.photoshoots",
    size: "wide",
  },
  {
    id: 24,
    image: "/assets/images/portfolio/audiovisual-04.webp",
    category: "audiovisual",
    label: "portfolio.gallery.categories.audiovisual",
    size: "medium",
  },
];

function PortfolioGallery() {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section className={styles.section}>
      <div className={styles.filtersWrapper}>
        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              className={`${styles.filter} ${
                activeCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {t(category.label)}
            </button>
          ))}
        </div>

        <span className={styles.count}>
          {String(filteredItems.length).padStart(2, "0")}
          {t("portfolio.gallery.count", { count: filteredItems.length })}
        </span>
      </div>

      <div className={styles.gallery}>
        {filteredItems.map((item) => (
          <figure
            key={`${activeCategory}-${item.id}`}
            className={`${styles.item} ${styles[item.size]}`}
          >
            <div className={styles.imageWrapper}>
              <img
                src={item.image}
                alt={t("portfolio.gallery.imageAlt", { category: t(item.label) })}
              />
            </div>

            <figcaption>
              <span>{t(item.label)}</span>
              <span>{String(item.id).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default PortfolioGallery;

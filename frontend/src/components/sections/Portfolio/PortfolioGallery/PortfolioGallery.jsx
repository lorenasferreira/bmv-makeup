import OptimizedImage from "../../../common/OptimizedImage/OptimizedImage";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import styles from "./PortfolioGallery.module.css";

const categories = [
  { id: "all", label: "portfolio.gallery.categories.all" },
  { id: "weddings", label: "portfolio.gallery.categories.weddings" },
  { id: "beauty", label: "portfolio.gallery.categories.beauty" },
  { id: "artistic", label: "portfolio.gallery.categories.artistic" },
];

const portfolioItems = [
  {
    id: 1,
    image: "/assets/images/curated/cas-09.webp",
    category: "weddings",
    label: "portfolio.gallery.categories.weddings",
    size: "large",
  },
  {
    id: 2,
    image: "/assets/images/curated/art-11.webp",
    category: "artistic",
    label: "portfolio.gallery.categories.artistic",
    size: "portrait",
  },
  {
    id: 3,
    image: "/assets/images/curated/soc-09.webp",
    category: "beauty",
    label: "portfolio.gallery.categories.beauty",
    size: "small",
  },
  {
    id: 7,
    image: "/assets/images/curated/cas-12.webp",
    category: "weddings",
    label: "portfolio.gallery.categories.weddings",
    size: "small",
  },
  {
    id: 8,
    image: "/assets/images/curated/lbs-40.webp",
    category: "beauty",
    label: "portfolio.gallery.categories.beauty",
    size: "large",
  },
  {
    id: 9,
    image: "/assets/images/curated/art-09.webp",
    category: "artistic",
    label: "portfolio.gallery.categories.artistic",
    size: "wide",
  },
  {
    id: 11,
    image: "/assets/images/curated/cas-20.webp",
    category: "weddings",
    label: "portfolio.gallery.categories.weddings",
    size: "medium",
  },
  {
    id: 14,
    image: "/assets/images/curated/nov-4bcc06250447fcda.webp",
    category: "beauty",
    label: "portfolio.gallery.categories.beauty",
    size: "portrait",
  },
  {
    id: 15,
    image: "/assets/images/curated/art-05.webp",
    category: "artistic",
    label: "portfolio.gallery.categories.artistic",
    size: "small",
  },
  {
    id: 16,
    image: "/assets/images/curated/cas-06.webp",
    category: "weddings",
    label: "portfolio.gallery.categories.weddings",
    size: "wide",
  },
  {
    id: 19,
    image: "/assets/images/curated/nov-83c3dfb6406f7a3c.webp",
    category: "beauty",
    label: "portfolio.gallery.categories.beauty",
    size: "small",
  },
  {
    id: 21,
    image: "/assets/images/curated/art-07.webp",
    category: "artistic",
    label: "portfolio.gallery.categories.artistic",
    size: "large",
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
              <OptimizedImage sizes="(max-width: 640px) 100vw, 55vw"
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

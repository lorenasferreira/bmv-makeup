import { useState } from "react";

import styles from "./PortfolioGallery.module.css";

const categories = [
  { id: "all", label: "Todos" },
  { id: "weddings", label: "Weddings" },
  { id: "beauty", label: "Beauty" },
  { id: "campaigns", label: "Campaigns" },
  { id: "photoshoots", label: "Photoshoots" },
  { id: "artistic", label: "Artistic" },
  { id: "audiovisual", label: "Audiovisual" },
];

const portfolioItems = [
  {
    id: 1,
    image: "/assets/images/portfolio/wedding-01.webp",
    category: "weddings",
    label: "Weddings",
    size: "large",
  },
  {
    id: 2,
    image: "/assets/images/portfolio/artistic-01.webp",
    category: "artistic",
    label: "Artistic",
    size: "portrait",
  },
  {
    id: 3,
    image: "/assets/images/portfolio/beauty-01.webp",
    category: "beauty",
    label: "Beauty",
    size: "small",
  },
  {
    id: 4,
    image: "/assets/images/portfolio/campaign-01.webp",
    category: "campaigns",
    label: "Campaigns",
    size: "wide",
  },
  {
    id: 5,
    image: "/assets/images/portfolio/photoshoot-01.webp",
    category: "photoshoots",
    label: "Photoshoots",
    size: "portrait",
  },
  {
    id: 6,
    image: "/assets/images/portfolio/audiovisual-01.webp",
    category: "audiovisual",
    label: "Audiovisual",
    size: "medium",
  },
  {
    id: 7,
    image: "/assets/images/portfolio/wedding-02.webp",
    category: "weddings",
    label: "Weddings",
    size: "small",
  },
  {
    id: 8,
    image: "/assets/images/portfolio/beauty-02.webp",
    category: "beauty",
    label: "Beauty",
    size: "large",
  },
  {
    id: 9,
    image: "/assets/images/portfolio/artistic-02.webp",
    category: "artistic",
    label: "Artistic",
    size: "wide",
  },
  {
    id: 10,
    image: "/assets/images/portfolio/campaign-02.webp",
    category: "campaigns",
    label: "Campaigns",
    size: "portrait",
  },
  {
    id: 11,
    image: "/assets/images/portfolio/wedding-03.webp",
    category: "weddings",
    label: "Weddings",
    size: "medium",
  },
  {
    id: 12,
    image: "/assets/images/portfolio/photoshoot-02.webp",
    category: "photoshoots",
    label: "Photoshoots",
    size: "small",
  },
  {
    id: 13,
    image: "/assets/images/portfolio/audiovisual-02.webp",
    category: "audiovisual",
    label: "Audiovisual",
    size: "large",
  },
  {
    id: 14,
    image: "/assets/images/portfolio/beauty-03.webp",
    category: "beauty",
    label: "Beauty",
    size: "portrait",
  },
  {
    id: 15,
    image: "/assets/images/portfolio/artistic-03.webp",
    category: "artistic",
    label: "Artistic",
    size: "small",
  },
  {
    id: 16,
    image: "/assets/images/portfolio/wedding-04.webp",
    category: "weddings",
    label: "Weddings",
    size: "wide",
  },
  {
    id: 17,
    image: "/assets/images/portfolio/campaign-03.webp",
    category: "campaigns",
    label: "Campaigns",
    size: "medium",
  },
  {
    id: 18,
    image: "/assets/images/portfolio/photoshoot-03.webp",
    category: "photoshoots",
    label: "Photoshoots",
    size: "large",
  },
  {
    id: 19,
    image: "/assets/images/portfolio/beauty-04.webp",
    category: "beauty",
    label: "Beauty",
    size: "small",
  },
  {
    id: 20,
    image: "/assets/images/portfolio/audiovisual-03.webp",
    category: "audiovisual",
    label: "Audiovisual",
    size: "portrait",
  },
  {
    id: 21,
    image: "/assets/images/portfolio/artistic-04.webp",
    category: "artistic",
    label: "Artistic",
    size: "large",
  },
  {
    id: 22,
    image: "/assets/images/portfolio/campaign-04.webp",
    category: "campaigns",
    label: "Campaigns",
    size: "small",
  },
  {
    id: 23,
    image: "/assets/images/portfolio/photoshoot-04.webp",
    category: "photoshoots",
    label: "Photoshoots",
    size: "wide",
  },
  {
    id: 24,
    image: "/assets/images/portfolio/audiovisual-04.webp",
    category: "audiovisual",
    label: "Audiovisual",
    size: "medium",
  },
];

function PortfolioGallery() {
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
              className={`${styles.filter} ${
                activeCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <span className={styles.count}>
          {String(filteredItems.length).padStart(2, "0")} trabalhos
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
                alt={`Trabalho de maquiagem — ${item.label}`}
              />
            </div>

            <figcaption>
              <span>{item.label}</span>
              <span>{String(item.id).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default PortfolioGallery;

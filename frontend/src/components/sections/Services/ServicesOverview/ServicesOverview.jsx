import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./ServicesOverview.module.css";

const services = [
  {
    number: "01",
    title: "services.overview.items.weddings.title",
    description: "services.overview.items.weddings.description",
    image: "/assets/images/services/weddings.webp",
    link: "/services/weddings",
    featured: true,
  },
  {
    number: "02",
    title: "services.overview.items.social.title",
    description: "services.overview.items.social.description",
    image: "/assets/images/services/beauty-social.webp",
  },
  {
    number: "03",
    title: "services.overview.items.campaigns.title",
    description: "services.overview.items.campaigns.description",
    image: "/assets/images/services/campaigns.webp",
  },
  {
    number: "04",
    title: "services.overview.items.photoshoots.title",
    description: "services.overview.items.photoshoots.description",
    image: "/assets/images/services/photoshoots.webp",
  },
  {
    number: "05",
    title: "services.overview.items.artistic.title",
    description: "services.overview.items.artistic.description",
    image: "/assets/images/services/artistic.webp",
  },
  {
    number: "06",
    title: "services.overview.items.audiovisual.title",
    description: "services.overview.items.audiovisual.description",
    image: "/assets/images/services/audiovisual.webp",
  },
];

function ServicesOverview() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>
          <span>01</span>
          <span>{t("services.overview.eyebrow")}</span>
        </div>

        <p>
          {t("services.overview.description")}
        </p>
      </div>

      <div className={styles.services}>
        {services.map((service) => {
          const content = (
            <>
              <div className={styles.serviceTop}>
                <span className={styles.number}>{service.number}</span>

                {service.featured && (
                  <span className={styles.featured}>{t("services.overview.featured")}</span>
                )}
              </div>

              <div className={styles.serviceImage}>
                <img src={service.image} alt="" />
              </div>

              <div className={styles.serviceContent}>
                <h2>{t(service.title)}</h2>
                <p>{t(service.description)}</p>

                {service.link && (
                  <span className={styles.explore}>
                    {t("services.overview.weddingsLink")}<span aria-hidden="true">→</span>
                  </span>
                )}
              </div>
            </>
          );

          if (service.link) {
            return (
              <Link
                to={service.link}
                className={`${styles.service} ${
                  service.featured ? styles.featuredService : ""
                }`}
                key={service.number}
              >
                {content}
              </Link>
            );
          }

          return (
            <article className={styles.service} key={service.number}>
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ServicesOverview;

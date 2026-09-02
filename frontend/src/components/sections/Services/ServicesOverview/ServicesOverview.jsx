import { Link } from "react-router-dom";

import styles from "./ServicesOverview.module.css";

const services = [
  {
    number: "01",
    title: "Weddings",
    description:
      "Beleza pensada para acompanhar um dos dias mais importantes da sua história, da preparação ao último detalhe.",
    image: "/assets/images/services/weddings.webp",
    link: "/services/weddings",
    featured: true,
  },
  {
    number: "02",
    title: "Beauty & Social",
    description:
      "Maquiagem para eventos, celebrações e momentos em que você quer se sentir especialmente você.",
    image: "/assets/images/services/beauty-social.webp",
  },
  {
    number: "03",
    title: "Campaigns",
    description:
      "Beleza construída em diálogo com marcas, conceitos, equipes criativas e narrativas visuais.",
    image: "/assets/images/services/campaigns.webp",
  },
  {
    number: "04",
    title: "Photoshoots",
    description:
      "Maquiagem pensada para a câmera, respeitando luz, direção, linguagem e intenção de cada produção.",
    image: "/assets/images/services/photoshoots.webp",
  },
  {
    number: "05",
    title: "Artistic",
    description:
      "Espaço para experimentar cor, textura, forma e possibilidades além da beleza convencional.",
    image: "/assets/images/services/artistic.webp",
  },
  {
    number: "06",
    title: "Audiovisual",
    description:
      "Beleza e caracterização adaptadas às necessidades de produções audiovisuais e diferentes formatos de imagem.",
    image: "/assets/images/services/audiovisual.webp",
  },
];

function ServicesOverview() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>
          <span>01</span>
          <span>O trabalho</span>
        </div>

        <p>
          Diferentes contextos, diferentes linguagens. A técnica se adapta à
          pessoa, ao projeto e ao resultado que queremos construir.
        </p>
      </div>

      <div className={styles.services}>
        {services.map((service) => {
          const content = (
            <>
              <div className={styles.serviceTop}>
                <span className={styles.number}>{service.number}</span>

                {service.featured && (
                  <span className={styles.featured}>Em destaque</span>
                )}
              </div>

              <div className={styles.serviceImage}>
                <img src={service.image} alt="" />
              </div>

              <div className={styles.serviceContent}>
                <h2>{service.title}</h2>
                <p>{service.description}</p>

                {service.link && (
                  <span className={styles.explore}>
                    Explorar Weddings <span aria-hidden="true">→</span>
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

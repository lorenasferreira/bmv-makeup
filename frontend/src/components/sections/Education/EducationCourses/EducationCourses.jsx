import styles from "./EducationCourses.module.css";

const courses = [
  {
    number: "01",
    name: "Módulo VIP",
    title: "Maquiagem Essencial",
    type: "Automaquiagem",
    image: "/assets/images/education/vip.webp",
    description:
      "Uma aula personalizada para construir uma base sólida de automaquiagem e entender quais escolhas funcionam melhor para o seu rosto.",
    topics: [
      "Preparação da pele",
      "Escolha do tom correto de base",
      "Delineado",
      "Blush e contorno",
      "Técnicas de acordo com o formato do rosto",
      "Olho esfumado com duas cores",
    ],
    individualPrice: "€170",
    duoPrice: "€300",
    duration: "Até 4 horas",
  },
  {
    number: "02",
    name: "Módulo Night",
    title: "Maquiagem Radiante",
    type: "Automaquiagem",
    image: "/assets/images/education/night.webp",
    description:
      "Para quem quer construir uma maquiagem de maior impacto e resistência, pensada especialmente para eventos noturnos.",
    topics: [
      "Preparação para longa duração",
      "Pele de alta resistência",
      "Técnica de cut crease",
      "Construção de um look noturno",
      "Reprodução de uma referência escolhida pela aluna",
    ],
    individualPrice: "€170",
    duoPrice: "€300",
    duration: "Até 4 horas",
  },
];

function EducationCourses() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionLabel}>
          <span>02</span>
          <span>Para você</span>
        </div>

        <h2>
          Automaquiagem,
          <br />
          do essencial ao
          <br />
          <em>impacto.</em>
        </h2>
      </div>

      <div className={styles.courses}>
        {courses.map((course) => (
          <article className={styles.course} key={course.number}>
            <div className={styles.courseMeta}>
              <span>{course.number}</span>
              <span>{course.type}</span>
            </div>

            <div className={styles.imageWrapper}>
              <img src={course.image} alt={course.title} />
            </div>

            <div className={styles.courseContent}>
              <div>
                <span className={styles.courseName}>{course.name}</span>

                <h3>{course.title}</h3>

                <p className={styles.description}>{course.description}</p>
              </div>

              <div className={styles.details}>
                <div className={styles.topics}>
                  <span className={styles.detailLabel}>Você vai aprender</span>

                  <ul>
                    {course.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.investment}>
                  <span className={styles.detailLabel}>Investimento</span>

                  <div>
                    <span>Individual</span>
                    <strong>{course.individualPrice}</strong>
                  </div>

                  <div>
                    <span>Dupla</span>
                    <strong>{course.duoPrice}</strong>
                  </div>

                  <div>
                    <span>Duração</span>
                    <strong>{course.duration}</strong>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.note}>
        As aulas incluem uma pausa de 15 minutos para café.
      </p>
    </section>
  );
}

export default EducationCourses;

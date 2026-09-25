import { useTranslation } from "react-i18next";

import styles from "./EducationCourses.module.css";

const courses = [
  {
    number: "01",
    name: "education.courses.items.vip.name",
    title: "education.courses.items.vip.title",
    type: "education.courses.selfMakeup",
    image: "/assets/images/education/vip.webp",
    description: "education.courses.items.vip.description",
    topics: [
      "education.courses.items.vip.topics.skin",
      "education.courses.items.vip.topics.foundation",
      "education.courses.items.vip.topics.eyeliner",
      "education.courses.items.vip.topics.blush",
      "education.courses.items.vip.topics.faceShape",
      "education.courses.items.vip.topics.smokyEye",
    ],
    individualPrice: "€170",
    duoPrice: "€300",
    duration: "education.courses.durationValue",
  },
  {
    number: "02",
    name: "education.courses.items.night.name",
    title: "education.courses.items.night.title",
    type: "education.courses.selfMakeup",
    image: "/assets/images/education/night.webp",
    description: "education.courses.items.night.description",
    topics: [
      "education.courses.items.night.topics.preparation",
      "education.courses.items.night.topics.skin",
      "education.courses.items.night.topics.cutCrease",
      "education.courses.items.night.topics.evening",
      "education.courses.items.night.topics.reference",
    ],
    individualPrice: "€170",
    duoPrice: "€300",
    duration: "education.courses.durationValue",
  },
];

function EducationCourses() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionLabel}>
          <span>02</span>
          <span>{t("education.courses.eyebrow")}</span>
        </div>

        <h2>
          {t("education.courses.title")}
          <br />
          {t("education.courses.titleSecond")}
          <br />
          <em>{t("education.courses.titleAccent")}</em>
        </h2>
      </div>

      <div className={styles.courses}>
        {courses.map((course) => (
          <article className={styles.course} key={course.number}>
            <div className={styles.courseMeta}>
              <span>{course.number}</span>
              <span>{t(course.type)}</span>
            </div>

            <div className={styles.imageWrapper}>
              <img src={course.image} alt={t(course.title)} />
            </div>

            <div className={styles.courseContent}>
              <div>
                <span className={styles.courseName}>{t(course.name)}</span>

                <h3>{t(course.title)}</h3>

                <p className={styles.description}>{t(course.description)}</p>
              </div>

              <div className={styles.details}>
                <div className={styles.topics}>
                  <span className={styles.detailLabel}>{t("education.courses.topicsLabel")}</span>

                  <ul>
                    {course.topics.map((topic) => (
                      <li key={topic}>{t(topic)}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.investment}>
                  <span className={styles.detailLabel}>{t("education.courses.investmentLabel")}</span>

                  <div>
                    <span>{t("education.courses.individualLabel")}</span>
                    <strong>{course.individualPrice}</strong>
                  </div>

                  <div>
                    <span>{t("education.courses.duoLabel")}</span>
                    <strong>{course.duoPrice}</strong>
                  </div>

                  <div>
                    <span>{t("education.courses.durationLabel")}</span>
                    <strong>{t(course.duration)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.note}>
        {t("education.courses.note")}
      </p>
    </section>
  );
}

export default EducationCourses;

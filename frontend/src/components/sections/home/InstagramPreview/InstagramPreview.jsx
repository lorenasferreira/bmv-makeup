import { useTranslation } from "react-i18next";

import instagramPosts from "../../../../data/instagramPosts";

import styles from "./InstagramPreview.module.css";

function InstagramPreview() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>{t("home.instagram.eyebrow")}</p>

          <h2>
            {t("home.instagram.title")}
            <br />
            <em>{t("home.instagram.titleAccent")}</em>
          </h2>
        </div>

        <div className={styles.intro}>
          <span className={styles.handle}>{t("home.instagram.handle")}</span>

          <p>{t("home.instagram.description")}</p>
        </div>
      </header>

      <div className={styles.feed}>
        {instagramPosts.map((post, index) => (
          <a
            key={post.id}
            href={post.permalink}
            className={`${styles.post} ${styles[`post${index + 1}`]}`}
            aria-label={post.caption}
          >
            {post.imageUrl ? (
              <img src={post.imageUrl} alt={post.caption} loading="lazy" />
            ) : (
              <div className={styles.placeholder}>
                <span>{post.placeholder}</span>
              </div>
            )}

            <span className={styles.postIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </a>
        ))}
      </div>

      <footer className={styles.footer}>
        <span>{t("home.instagram.handle")}</span>

        <a href="#" className={styles.link}>
          {t("home.instagram.cta")}
          <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </section>
  );
}

export default InstagramPreview;

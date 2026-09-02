import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./InstagramPreview.module.css";

function InstagramPreview() {
  const { t } = useTranslation();

  const [instagramPosts, setInstagramPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadInstagramPosts() {
      try {
        const response = await fetch("/api/instagram");

        if (!response.ok) {
          throw new Error("Unable to load Instagram posts");
        }

        const data = await response.json();

        setInstagramPosts((data.posts || []).slice(0, 6));
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadInstagramPosts();
  }, []);

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

      {!isLoading && !hasError && instagramPosts.length > 0 && (
        <div className={styles.feed}>
          {instagramPosts.map((post, index) => {
            const imageUrl =
              post.mediaType === "VIDEO" ? post.thumbnailUrl : post.mediaUrl;

            return (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.post} ${styles[`post${index + 1}`]}`}
                aria-label={post.caption || "Instagram post"}
              >
                {imageUrl && (
                  <img src={imageUrl} alt={post.caption || ""} loading="lazy" />
                )}

                <span className={styles.postIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            );
          })}
        </div>
      )}

      <footer className={styles.footer}>
        <span>{t("home.instagram.handle")}</span>

        <a
          href="https://www.instagram.com/bmvmakeup/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {t("home.instagram.cta")}
          <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </section>
  );
}

export default InstagramPreview;

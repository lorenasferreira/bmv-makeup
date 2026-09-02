import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./InstagramPreview.module.css";

function InstagramPreview() {
  const { t } = useTranslation();

  const [instagramPosts, setInstagramPosts] = useState([]);
  const [username, setUsername] = useState("");
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

        setUsername(data.username || "");
        setInstagramPosts((data.posts || []).slice(0, 6));
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadInstagramPosts();
  }, []);

  function formatDate(timestamp) {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(timestamp));
  }

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
          <span className={styles.handle}>@{username || "bmvmakeup"}</span>

          <p>{t("home.instagram.description")}</p>
        </div>
      </header>

      {!isLoading && !hasError && instagramPosts.length > 0 && (
        <div className={styles.feed}>
          {instagramPosts.map((post) => {
            const imageUrl =
              post.mediaType === "VIDEO" ? post.thumbnailUrl : post.mediaUrl;

            return (
              <article key={post.id} className={styles.post}>
                <header className={styles.postHeader}>
                  <div className={styles.avatar}>
                    {(username || "BMV").charAt(0).toUpperCase()}
                  </div>

                  <div className={styles.postMeta}>
                    <strong>@{username || "bmvmakeup"}</strong>
                    <span>{formatDate(post.timestamp)}</span>
                  </div>
                </header>

                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.media}
                  aria-label={post.caption || "Instagram post"}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={post.caption || ""}
                      loading="lazy"
                    />
                  )}
                </a>

                {post.caption && (
                  <div className={styles.caption}>
                    <p>
                      <strong>@{username || "bmvmakeup"}</strong> {post.caption}
                    </p>

                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.postLink}
                    >
                      Ver no Instagram
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      <footer className={styles.footer}>
        <span>@{username || "bmvmakeup"}</span>

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

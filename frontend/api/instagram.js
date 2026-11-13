import { resolveInstagramToken } from "../server/instagram/store.js";
import { metaErrorDetails } from "../server/instagram/errors.js";

export function createInstagramHandler({ env = process.env, fetcher = fetch, tokenProvider = resolveInstagramToken, logger = console } = {}) {
  return async function handler(req, res) {
    let token;
    try {
      token = await tokenProvider({ env });
    } catch {
      return res.status(500).json({ error: "Unable to load Instagram posts" });
    }

    if (!token) {
      return res.status(500).json({
        error: "Instagram access token is not configured",
      });
    }

    try {
      const profileUrl =
        `https://graph.instagram.com/me` +
        `?fields=id,username,profile_picture_url` +
        `&access_token=${encodeURIComponent(token)}`;

      const mediaFields = [
        "id",
        "caption",
        "media_type",
        "media_url",
        "permalink",
        "thumbnail_url",
        "timestamp",
      ].join(",");

      const mediaUrl =
        `https://graph.instagram.com/me/media` +
        `?fields=${mediaFields}` +
        `&access_token=${encodeURIComponent(token)}`;

      const [profileResponse, mediaResponse] = await Promise.all([
        fetcher(profileUrl),
        fetcher(mediaUrl),
      ]);

      const profile = await profileResponse.json();
      const media = await mediaResponse.json();

      if (!profileResponse.ok || !mediaResponse.ok) {
        logger.error("Instagram API error", {
          profileStatus: profileResponse.status,
          mediaStatus: mediaResponse.status,
          profileError: !profileResponse.ok ? metaErrorDetails(profile) : null,
          mediaError: !mediaResponse.ok ? metaErrorDetails(media) : null,
        });

        return res.status(500).json({
          error: "Instagram API request failed",
        });
      }

      const posts = (media.data || []).map((post) => ({
        id: post.id,
        caption: post.caption || "",
        mediaType: post.media_type,
        mediaUrl: post.media_url,
        thumbnailUrl: post.thumbnail_url || null,
        permalink: post.permalink,
        timestamp: post.timestamp,
      }));

      res.setHeader(
        "Cache-Control",
        "s-maxage=3600, stale-while-revalidate=86400",
      );

      return res.status(200).json({
        username: profile.username,
        profilePictureUrl: profile.profile_picture_url || null,
        posts,
      });
    } catch {
      return res.status(500).json({
        error: "Unable to load Instagram posts",
      });
    }
  };
}

export default createInstagramHandler();

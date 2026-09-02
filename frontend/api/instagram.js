export default async function handler(req, res) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "Instagram access token is not configured",
    });
  }

  try {
    const profileUrl =
      `https://graph.instagram.com/me` +
      `?fields=id,username` +
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
      fetch(profileUrl),
      fetch(mediaUrl),
    ]);

    const profile = await profileResponse.json();
    const media = await mediaResponse.json();

    if (!profileResponse.ok || !mediaResponse.ok) {
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
      posts,
    });
  } catch {
    return res.status(500).json({
      error: "Unable to load Instagram posts",
    });
  }
}

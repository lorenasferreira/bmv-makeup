export default async function handler(req, res) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "Instagram access token is not configured",
    });
  }

  try {
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "permalink",
      "thumbnail_url",
      "timestamp",
    ].join(",");

    const url =
      `https://graph.instagram.com/me/media` +
      `?fields=${fields}` +
      `&access_token=${encodeURIComponent(token)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Instagram API request failed",
        details: data,
      });
    }

    const posts = (data.data || []).map((post) => ({
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
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to load Instagram posts",
    });
  }
}

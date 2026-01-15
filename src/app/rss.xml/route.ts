import { getPublishedPosts } from '@/lib/posts';

const siteUrl = 'https://jejuolledev.com';

export function GET() {
  const posts = getPublishedPosts();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>jejuolledev</title>
    <link>${siteUrl}</link>
    <description>제주에서 기록하는 개인 블로그</description>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid>${siteUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}

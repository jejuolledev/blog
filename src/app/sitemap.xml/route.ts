import { getAllTags, getPublishedPosts } from '@/lib/posts';

const siteUrl = 'https://jejuolledev.com';

export function GET() {
  const posts = getPublishedPosts();
  const tags = getAllTags();
  const urls = [
    '',
    '/posts',
    '/tags',
    '/about',
    ...posts.map((post) => `/posts/${post.slug}`),
    ...tags.map(([tag]) => `/tags/${encodeURIComponent(tag)}`)
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (path) => `
  <url>
    <loc>${siteUrl}${path}</loc>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}

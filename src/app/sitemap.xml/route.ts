import { getPublishedProjects, getPublishedDevlogs } from '@/lib/content';

const siteUrl = 'https://jejuolledev.com';

export function GET() {
  const projects = getPublishedProjects();
  const devlogs = getPublishedDevlogs();

  const urls = [
    '',
    '/projects',
    '/devlog',
    '/skills',
    '/about',
    '/contact',
    ...projects.map((p) => `/projects/${p.slug}`),
    ...devlogs.map((d) => `/devlog/${d.slug}`),
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

import { getPublishedProjects, getPublishedDevlogs } from '@/lib/content';

const siteUrl = 'https://jejuolledev.com';

export function GET() {
  const projects = getPublishedProjects();
  const devlogs = getPublishedDevlogs();

  const items = [
    ...projects.map((p) => ({
      title: p.title,
      link: `/projects/${p.slug}`,
      date: p.date,
      description: p.description,
    })),
    ...devlogs.map((d) => ({
      title: d.title,
      link: `/devlog/${d.slug}`,
      date: d.date,
      description: d.description,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>jejuolledev</title>
    <link>${siteUrl}</link>
    <description>프론트엔드 개발자의 포트폴리오와 개발 일지</description>
    ${items
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${siteUrl}${item.link}</link>
      <guid>${siteUrl}${item.link}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description><![CDATA[${item.description}]]></description>
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

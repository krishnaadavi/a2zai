import { fetchAINews } from '@/lib/newsdata';

export const dynamic = 'force-dynamic';

export async function GET() {
  const news = await fetchAINews(20);
  const baseUrl = 'https://a2zai.ai';

  const rssItems = news
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <guid isPermaLink="false">${item.id}</guid>
      <description><![CDATA[${item.description || ''}]]></description>
      <category>${item.category}</category>
      <source url="${baseUrl}">${item.source}</source>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>A2Z AI - AI News</title>
    <link>${baseUrl}</link>
    <description>Your A-to-Z guide to AI. Stay current with the latest AI news, models, and research in 5 minutes a day.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/icon</url>
      <title>A2Z AI</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

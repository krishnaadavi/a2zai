import { fetchAINews } from '@/lib/newsdata';
import type { AINewsItem } from '@/lib/newsdata';

export type FundingHeadline = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
};

const FUNDING_KEYWORDS = [
  'funding',
  'raised',
  'series a',
  'series b',
  'series c',
  'seed round',
  'venture capital',
  'valuation',
  'investor',
];

function isFundingStory(text: string): boolean {
  const haystack = text.toLowerCase();
  return FUNDING_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

export async function fetchLiveFundingHeadlines(limit: number = 8): Promise<FundingHeadline[]> {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (apiKey) {
    try {
      const query = encodeURIComponent('AI startup funding OR AI raises OR Series A OR Series B');
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${query}&language=en&category=business,technology&size=${Math.max(limit * 2, 12)}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (response.ok) {
        const payload = await response.json() as {
          status?: string;
          results?: Array<{
            article_id: string;
            title: string;
            link: string;
            source_name: string;
            pubDate: string;
            description?: string | null;
          }>;
        };
        if (payload.status === 'success' && Array.isArray(payload.results)) {
          return payload.results
            .slice(0, Math.min(Math.max(limit, 1), 20))
            .map((item) => ({
              id: item.article_id,
              title: item.title,
              url: item.link,
              source: item.source_name,
              publishedAt: item.pubDate,
              summary: item.description || '',
            }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch funding-specific headlines:', error);
    }
  }

  const news = await fetchAINews(Math.max(limit * 3, 18));
  const filtered = news
    .filter((item) => isFundingStory(`${item.title} ${item.description}`))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, Math.min(Math.max(limit, 1), 20));

  return filtered.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    source: item.source,
    publishedAt: item.publishedAt,
    summary: item.description,
  }));
}

export function deriveFundingHeadlinesFromNews(news: AINewsItem[], limit: number = 8): FundingHeadline[] {
  const filtered = news
    .filter((item) => isFundingStory(`${item.title} ${item.description || ''}`))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, Math.min(Math.max(limit, 1), 20));

  return filtered.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    source: item.source,
    publishedAt: item.publishedAt,
    summary: item.description,
  }));
}

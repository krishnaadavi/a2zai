import type { AINewsItem } from '@/lib/newsdata';

type TheNewsArticle = {
  uuid: string;
  title: string;
  description?: string | null;
  snippet?: string | null;
  url: string;
  source: string;
  published_at: string;
  language?: string;
};

type TheNewsResponse = {
  data?: TheNewsArticle[];
};

function mapToAINews(items: TheNewsArticle[]): AINewsItem[] {
  return items.map((item) => ({
    id: item.uuid,
    title: item.title,
    url: item.url,
    description: item.description || item.snippet || '',
    source: item.source,
    publishedAt: item.published_at,
    category: 'Business',
    readTime: '3 min',
  }));
}

export async function fetchTheNewsAPIFundingNews(limit: number = 20): Promise<AINewsItem[]> {
  const token = process.env.THE_NEWS_API_TOKEN;
  if (!token) return [];

  const safeLimit = Math.min(Math.max(limit, 1), 50);
  const search = encodeURIComponent('AI startup funding OR AI raises OR Series A OR Series B');

  const urls = [
    `https://api.thenewsapi.com/v1/news/all?api_token=${token}&search=${search}&language=en&limit=${safeLimit}&sort=published_at`,
    `https://api.thenewsapi.com/v1/news/headlines?api_token=${token}&language=en&headlines_per_category=10`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) continue;
      const payload = (await response.json()) as TheNewsResponse;
      if (!payload.data || payload.data.length === 0) continue;
      return mapToAINews(payload.data);
    } catch (error) {
      console.error('TheNewsAPI request failed:', error);
    }
  }

  return [];
}

import { fetchAINews } from '@/lib/newsdata';

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

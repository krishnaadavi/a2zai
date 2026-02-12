import { fetchAINews } from '@/lib/newsdata';
import type { AINewsItem } from '@/lib/newsdata';

export type LiveFundingSignal = {
  id: string;
  company: string;
  amount: string | null;
  round: string | null;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  confidence: number;
};

const ROUND_PATTERN = /\b(pre-seed|seed|series\s+[a-h]|growth|debt|strategic)\b/i;
const AMOUNT_PATTERN = /(\$\s?\d+(?:\.\d+)?\s?(?:billion|million|bn|m|b))/i;
const FUNDING_VERB_PATTERN = /\b(raises|raised|secures|secured|lands|bags|snags)\b/i;
const FUNDING_KEYWORD_PATTERN = /\b(funding|fundraise|valuation|investor|venture capital|backed)\b/i;

function normalizeSpaces(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

function extractCompany(text: string): string | null {
  const patterns = [
    /^([A-Z][A-Za-z0-9&.'-]*(?:\s+[A-Z][A-Za-z0-9&.'-]*){0,4})\s+(?:raises|raised|secures|secured|lands|bags|snags)\b/i,
    /^([A-Z][A-Za-z0-9&.'-]*(?:\s+[A-Z][A-Za-z0-9&.'-]*){0,4})\s+(?:announces|announced)\b/i,
    /\bfor\s+([A-Z][A-Za-z0-9&.'-]*(?:\s+[A-Z][A-Za-z0-9&.'-]*){0,4})\b/,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return normalizeSpaces(match[1]);
  }
  return null;
}

function scoreSignal(text: string, amount: string | null, company: string | null): number {
  let score = 0;
  if (FUNDING_VERB_PATTERN.test(text)) score += 40;
  if (FUNDING_KEYWORD_PATTERN.test(text)) score += 20;
  if (ROUND_PATTERN.test(text)) score += 20;
  if (amount) score += 10;
  if (company) score += 10;
  return Math.min(score, 100);
}

export async function fetchLiveFundingSignals(limit: number = 10): Promise<LiveFundingSignal[]> {
  const news = await fetchAINews(Math.max(limit * 6, 36));
  return deriveFundingSignalsFromNews(news, limit);
}

export function deriveFundingSignalsFromNews(news: AINewsItem[], limit: number = 10): LiveFundingSignal[] {
  const parsed = news
    .map((item) => {
      const text = `${item.title} ${item.description || ''}`;
      const amount = text.match(AMOUNT_PATTERN)?.[1] || null;
      const round = text.match(ROUND_PATTERN)?.[1] || null;
      const company = extractCompany(item.title) || extractCompany(text);
      const confidence = scoreSignal(text, amount, company);

      return {
        id: item.id,
        company: company || 'Unspecified Company',
        amount,
        round,
        title: item.title,
        summary: item.description,
        source: item.source,
        publishedAt: item.publishedAt,
        url: item.url,
        confidence,
      };
    })
    .filter((item) => item.confidence >= 50)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const deduped = parsed.filter((item, index, arr) => {
    const key = `${item.company.toLowerCase()}|${item.amount || ''}`;
    return arr.findIndex((candidate) => `${candidate.company.toLowerCase()}|${candidate.amount || ''}` === key) === index;
  });

  return deduped.slice(0, Math.min(Math.max(limit, 1), 30));
}

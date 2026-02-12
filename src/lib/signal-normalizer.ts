import type { AINewsItem } from '@/lib/newsdata';
import type { TrendingModel } from '@/lib/huggingface';
import type { FundingRound } from '@/lib/funding-data';

export type SignalEventType = 'funding' | 'model_release' | 'news';
export type SignalEntityType = 'company' | 'model' | 'startup' | 'market';

export type SignalEvent = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  eventType: SignalEventType;
  entityType: SignalEntityType;
  entityName: string;
  eventDate: string;
  confidence: number;
  tags: string[];
};

function normalizeNewsSignals(news: AINewsItem[]): SignalEvent[] {
  return news.map((item) => ({
    id: `news-${item.id}`,
    title: item.title,
    summary: item.description || `${item.source} report`,
    url: item.url,
    source: item.source,
    eventType: 'news',
    entityType: 'market',
    entityName: item.category || 'AI',
    eventDate: item.publishedAt,
    confidence: 0.72,
    tags: [item.category, 'news'].filter(Boolean),
  }));
}

function normalizeModelSignals(models: TrendingModel[]): SignalEvent[] {
  const now = new Date().toISOString();
  return models.map((model) => ({
    id: `model-${model.name.toLowerCase().replace(/\s+/g, '-')}`,
    title: `${model.name} momentum ${model.trend}`,
    summary: `${model.provider} model showing momentum in ${model.type}.`,
    url: model.url || '/models',
    source: model.provider,
    eventType: 'model_release',
    entityType: 'model',
    entityName: model.name,
    eventDate: now,
    confidence: 0.65,
    tags: [model.type, 'models'],
  }));
}

function normalizeFundingSignals(rounds: FundingRound[]): SignalEvent[] {
  return rounds.map((round) => ({
    id: `funding-${round.id}`,
    title: `${round.company} raised ${round.amount} (${round.round})`,
    summary: `${round.category} • ${round.headquarters}`,
    url: round.website || '/funding',
    source: 'Funding Radar',
    eventType: 'funding',
    entityType: 'startup',
    entityName: round.company,
    eventDate: round.date,
    confidence: 0.9,
    tags: [round.category, round.round, 'funding'],
  }));
}

export function buildSignalFeed(input: {
  news?: AINewsItem[];
  models?: TrendingModel[];
  funding?: FundingRound[];
  limit?: number;
}): SignalEvent[] {
  const allSignals = [
    ...(input.news ? normalizeNewsSignals(input.news) : []),
    ...(input.models ? normalizeModelSignals(input.models) : []),
    ...(input.funding ? normalizeFundingSignals(input.funding) : []),
  ];

  const sorted = allSignals.sort((a, b) => {
    const dateDiff = new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.confidence - a.confidence;
  });

  return sorted.slice(0, input.limit ?? 12);
}

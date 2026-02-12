import { fetchAINews } from '@/lib/newsdata';
import { fetchTrendingModels } from '@/lib/huggingface';
import { fetchLatestPapers } from '@/lib/arxiv';
import { queryFundingRounds } from '@/lib/funding-service';
import { buildSignalFeed, type SignalEvent } from '@/lib/signal-normalizer';

export type SignalContext = {
  newsCount: number;
  modelCount: number;
  paperCount: number;
  fundingCount: number;
};

export async function buildLiveSignals(limit: number = 20): Promise<{
  signals: SignalEvent[];
  context: SignalContext;
}> {
  const [news, models, papers] = await Promise.all([
    fetchAINews(20),
    fetchTrendingModels(10),
    fetchLatestPapers(8),
  ]);
  const funding = queryFundingRounds({ limit: 15, sortBy: 'date' });

  const signals = buildSignalFeed({
    news,
    models,
    funding,
    limit: Math.min(Math.max(limit, 1), 100),
  });

  return {
    signals,
    context: {
      newsCount: news.length,
      modelCount: models.length,
      paperCount: papers.length,
      fundingCount: funding.length,
    },
  };
}

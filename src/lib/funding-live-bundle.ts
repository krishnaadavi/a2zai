import type { FundingHeadline } from '@/lib/funding-headlines';
import { deriveFundingHeadlinesFromNews, fetchLiveFundingHeadlines } from '@/lib/funding-headlines';
import type { LiveFundingSignal } from '@/lib/funding-live-service';
import { deriveFundingSignalsFromNews, fetchLiveFundingSignals } from '@/lib/funding-live-service';
import { getFundingProviderStatus } from '@/lib/funding-provider';
import { fetchTheNewsAPIFundingNews } from '@/lib/thenewsapi';

export async function buildLiveFundingBundle(): Promise<{
  provider: ReturnType<typeof getFundingProviderStatus>;
  liveHeadlines: FundingHeadline[];
  liveSignals: LiveFundingSignal[];
}> {
  const provider = getFundingProviderStatus();

  let liveHeadlines: FundingHeadline[] = [];
  let liveSignals: LiveFundingSignal[] = [];

  if (provider.enabled && provider.configuredProvider === 'thenewsapi') {
    const providerNews = await fetchTheNewsAPIFundingNews(30);
    if (providerNews.length > 0) {
      liveHeadlines = deriveFundingHeadlinesFromNews(providerNews, 8);
      liveSignals = deriveFundingSignalsFromNews(providerNews, 10);
    }
  }

  if (liveHeadlines.length === 0 && liveSignals.length === 0) {
    [liveHeadlines, liveSignals] = await Promise.all([
      fetchLiveFundingHeadlines(8),
      fetchLiveFundingSignals(10),
    ]);
  }

  return {
    provider,
    liveHeadlines,
    liveSignals,
  };
}

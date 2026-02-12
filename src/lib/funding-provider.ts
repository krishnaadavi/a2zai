export type FundingProviderName = 'none' | 'dealroom' | 'crunchbase' | 'thenewsapi';

export type FundingProviderStatus = {
  configuredProvider: FundingProviderName;
  enabled: boolean;
  reason?: string;
};

function normalizeProvider(raw: string | undefined): FundingProviderName {
  if (!raw) return 'none';
  const value = raw.trim().toLowerCase();
  if (value === 'dealroom') return 'dealroom';
  if (value === 'crunchbase') return 'crunchbase';
  if (value === 'thenewsapi') return 'thenewsapi';
  return 'none';
}

export function getFundingProviderStatus(): FundingProviderStatus {
  const configuredProvider = normalizeProvider(process.env.FUNDING_PROVIDER);

  if (configuredProvider === 'dealroom') {
    if (!process.env.DEALROOM_API_KEY) {
      return {
        configuredProvider,
        enabled: false,
        reason: 'DEALROOM_API_KEY missing',
      };
    }
    return { configuredProvider, enabled: true };
  }

  if (configuredProvider === 'crunchbase') {
    if (!process.env.CRUNCHBASE_API_KEY) {
      return {
        configuredProvider,
        enabled: false,
        reason: 'CRUNCHBASE_API_KEY missing',
      };
    }
    return { configuredProvider, enabled: true };
  }

  if (configuredProvider === 'thenewsapi') {
    if (!process.env.THE_NEWS_API_TOKEN) {
      return {
        configuredProvider,
        enabled: false,
        reason: 'THE_NEWS_API_TOKEN missing',
      };
    }
    return { configuredProvider, enabled: true };
  }

  return {
    configuredProvider: 'none',
    enabled: false,
    reason: 'No live funding provider configured',
  };
}

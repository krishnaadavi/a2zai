export type FundingProviderName = 'none' | 'dealroom' | 'crunchbase' | 'thenewsapi' | 'newsdata';

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
  if (value === 'newsdata') return 'newsdata';
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
    if (!process.env.THE_NEWS_API_TOKEN && !process.env.NEWSDATA_API_KEY) {
      return {
        configuredProvider,
        enabled: false,
        reason: 'THE_NEWS_API_TOKEN missing (and no NEWSDATA_API_KEY fallback)',
      };
    }
    if (!process.env.THE_NEWS_API_TOKEN && process.env.NEWSDATA_API_KEY) {
      return {
        configuredProvider,
        enabled: true,
        reason: 'Using NEWSDATA_API_KEY fallback',
      };
    }
    return { configuredProvider, enabled: true };
  }

  if (configuredProvider === 'newsdata') {
    if (!process.env.NEWSDATA_API_KEY) {
      return {
        configuredProvider,
        enabled: false,
        reason: 'NEWSDATA_API_KEY missing',
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

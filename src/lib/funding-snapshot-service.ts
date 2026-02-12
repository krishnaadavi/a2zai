import { prisma } from '@/lib/prisma';
import { buildLiveFundingBundle } from '@/lib/funding-live-bundle';
import type { FundingHeadline } from '@/lib/funding-headlines';
import type { LiveFundingSignal } from '@/lib/funding-live-service';

type SnapshotItem = {
  provider: string;
  externalId: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: Date;
  company?: string | null;
  amount?: string | null;
  round?: string | null;
  confidence?: number | null;
  raw?: unknown;
};

function uniqueKey(item: { title: string; url: string }): string {
  return `${item.title}::${item.url}`;
}

export async function ingestFundingSnapshots(source: 'admin' | 'cron' | 'api' = 'api') {
  const bundle = await buildLiveFundingBundle();
  const providerName = bundle.provider.configuredProvider;

  const items: SnapshotItem[] = [];
  const seen = new Set<string>();

  for (const item of bundle.liveHeadlines) {
    const key = uniqueKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({
      provider: providerName,
      externalId: item.id,
      title: item.title,
      summary: item.summary || '',
      url: item.url,
      source: item.source,
      publishedAt: new Date(item.publishedAt),
      raw: item,
    });
  }

  for (const item of bundle.liveSignals) {
    const key = uniqueKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({
      provider: providerName,
      externalId: item.id,
      title: item.title,
      summary: item.summary || '',
      url: item.url,
      source: item.source,
      publishedAt: new Date(item.publishedAt),
      company: item.company,
      amount: item.amount,
      round: item.round,
      confidence: item.confidence,
      raw: item,
    });
  }

  let upsertedItems = 0;
  for (const item of items) {
    await prisma.fundingSignalSnapshot.upsert({
      where: {
        provider_externalId: {
          provider: item.provider,
          externalId: item.externalId,
        },
      },
      update: {
        title: item.title,
        summary: item.summary,
        url: item.url,
        source: item.source,
        publishedAt: item.publishedAt,
        capturedAt: new Date(),
        company: item.company,
        amount: item.amount,
        round: item.round,
        confidence: item.confidence,
        raw: item.raw as never,
      },
      create: {
        provider: item.provider,
        externalId: item.externalId,
        title: item.title,
        summary: item.summary,
        url: item.url,
        source: item.source,
        publishedAt: item.publishedAt,
        company: item.company,
        amount: item.amount,
        round: item.round,
        confidence: item.confidence,
        raw: item.raw as never,
      },
    });
    upsertedItems += 1;
  }

  await prisma.fundingSnapshotRun.create({
    data: {
      source,
      success: true,
      provider: providerName,
      fetchedItems: bundle.liveHeadlines.length + bundle.liveSignals.length,
      upsertedItems,
      headlineCount: bundle.liveHeadlines.length,
      signalCount: bundle.liveSignals.length,
    },
  });

  return {
    provider: bundle.provider,
    headlineCount: bundle.liveHeadlines.length,
    signalCount: bundle.liveSignals.length,
    upsertedItems,
  };
}

export async function readFundingSnapshots(hours: number = 72): Promise<{
  liveHeadlines: FundingHeadline[];
  liveSignals: LiveFundingSignal[];
}> {
  const threshold = new Date(Date.now() - Math.max(hours, 1) * 60 * 60 * 1000);
  const rows = await prisma.fundingSignalSnapshot.findMany({
    where: {
      capturedAt: { gte: threshold },
    },
    orderBy: { publishedAt: 'desc' },
    take: 120,
  });

  const liveHeadlines: FundingHeadline[] = rows.slice(0, 8).map((row) => ({
    id: row.externalId,
    title: row.title,
    url: row.url,
    source: row.source,
    publishedAt: row.publishedAt.toISOString(),
    summary: row.summary,
  }));

  const liveSignals: LiveFundingSignal[] = rows
    .filter((row) => row.confidence !== null || row.company !== null || row.amount !== null)
    .slice(0, 10)
    .map((row) => ({
      id: row.externalId,
      company: row.company || 'Unspecified Company',
      amount: row.amount,
      round: row.round,
      title: row.title,
      summary: row.summary,
      source: row.source,
      publishedAt: row.publishedAt.toISOString(),
      url: row.url,
      confidence: row.confidence ?? 50,
    }));

  return { liveHeadlines, liveSignals };
}

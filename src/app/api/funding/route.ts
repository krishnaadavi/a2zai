import { NextResponse } from 'next/server';
import { FUNDING_CATEGORIES, ROUND_TYPES } from '@/lib/funding-data';
import { getFundingProviderStatus } from '@/lib/funding-provider';
import { ingestFundingSnapshots, readFundingSnapshots } from '@/lib/funding-snapshot-service';
import { getFundingStats, queryFundingRounds } from '@/lib/funding-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const category = searchParams.get('category');
    const round = searchParams.get('round');
    const q = searchParams.get('q');
    const sortByParam = searchParams.get('sortBy');
    const sortBy = sortByParam === 'amount' ? 'amount' : 'date';

    const rounds = queryFundingRounds({
      limit,
      category,
      round,
      q,
      sortBy,
    });
    const provider = getFundingProviderStatus();
    let { liveHeadlines, liveSignals } = await readFundingSnapshots(96);
    let usedSnapshots = liveHeadlines.length > 0 || liveSignals.length > 0;

    if (!usedSnapshots) {
      try {
        const ingested = await ingestFundingSnapshots('api');
        const refreshed = await readFundingSnapshots(96);
        liveHeadlines = refreshed.liveHeadlines;
        liveSignals = refreshed.liveSignals;
        usedSnapshots = liveHeadlines.length > 0 || liveSignals.length > 0;
        if (!usedSnapshots) {
          console.warn('Funding ingest completed but no snapshots available', ingested);
        }
      } catch (ingestError) {
        console.error('Funding snapshot ingest failed during request:', ingestError);
      }
    }
    const stats = getFundingStats(rounds);
    const latestCuratedDate = rounds[0]?.date ?? null;
    const staleDays = latestCuratedDate
      ? Math.floor((Date.now() - new Date(latestCuratedDate).getTime()) / (1000 * 60 * 60 * 24))
      : null;

    return NextResponse.json({
      success: true,
      data: rounds,
      count: rounds.length,
      stats,
      categories: FUNDING_CATEGORIES,
      roundTypes: ROUND_TYPES,
      liveHeadlines,
      freshness: {
        latestCuratedDate,
        staleDays,
        hasLiveHeadlines: liveHeadlines.length > 0,
        hasLiveSignals: liveSignals.length > 0,
        usedSnapshots,
      },
      source: 'curated',
      provider,
      liveSignals,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching funding rounds:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch funding rounds' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { FUNDING_CATEGORIES, ROUND_TYPES } from '@/lib/funding-data';
import { fetchLiveFundingHeadlines } from '@/lib/funding-headlines';
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
    const liveHeadlines = await fetchLiveFundingHeadlines(8);
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
      },
      source: 'curated',
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

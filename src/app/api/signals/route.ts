import { NextResponse } from 'next/server';
import { buildLiveSignals } from '@/lib/signals-service';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';
import { annotateSignalsWithWatchlist, filterSignalsByWatchlist } from '@/lib/watchlist-matching';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const watchlistOnly = searchParams.get('watchlistOnly') === 'true';
    const personalized = searchParams.get('personalized') === 'true';

    const { signals, context } = await buildLiveSignals(limit);

    let data = signals;
    let matchedCount = 0;
    let userWatchlistCount = 0;

    if (watchlistOnly || personalized) {
      const authUser = await getAuthUser();
      if (!authUser?.id) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized for personalized signals' },
          { status: 401 }
        );
      }

      const watchlistItems = await prisma.userWatchlist.findMany({
        where: { userId: authUser.id },
        include: { entity: true },
      });
      const entities = watchlistItems.map((item) => item.entity);
      userWatchlistCount = entities.length;

      if (watchlistOnly) {
        data = filterSignalsByWatchlist(signals, entities);
        matchedCount = data.length;
      } else {
        const annotated = annotateSignalsWithWatchlist(signals, entities);
        matchedCount = annotated.filter((signal) => signal.watchlistMatch).length;
        data = annotated;
      }
    }

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
      context,
      personalization: {
        personalized,
        watchlistOnly,
        userWatchlistCount,
        matchedCount,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error building signals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to build signal feed' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { buildLiveSignals } from '@/lib/signals-service';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';
import { rankSignalsForUser } from '@/lib/signal-personalization';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const watchlistOnly = searchParams.get('watchlistOnly') === 'true';
    const personalized = searchParams.get('personalized') === 'true';

    const candidateLimit = personalized || watchlistOnly ? Math.max(limit * 3, 30) : limit;
    const { signals, context } = await buildLiveSignals(candidateLimit);

    let data = signals;
    let matchedCount = 0;
    let userWatchlistCount = 0;
    let scoringVersion: string | null = null;

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
      const [preferences, readHistory] = await Promise.all([
        prisma.userPreferences.findUnique({ where: { userId: authUser.id } }),
        prisma.readHistory.findMany({
          where: { userId: authUser.id },
          orderBy: { readAt: 'desc' },
          take: 250,
          select: {
            articleType: true,
            readAt: true,
          },
        }),
      ]);

      const ranked = rankSignalsForUser({
        signals,
        watchlistEntities: entities,
        preferences,
        readHistory,
        limit,
        watchlistOnly,
      });

      data = ranked.data;
      matchedCount = ranked.matchedCount;
      scoringVersion = ranked.scoringVersion;
    } else {
      data = signals.slice(0, Math.min(Math.max(limit, 1), 100));
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
        scoringVersion,
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

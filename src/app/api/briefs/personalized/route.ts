import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';
import { buildLiveSignals } from '@/lib/signals-service';
import { filterSignalsByWatchlist } from '@/lib/watchlist-matching';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const watchlistItems = await prisma.userWatchlist.findMany({
      where: { userId: authUser.id },
      include: { entity: true },
    });
    const entities = watchlistItems.map((item) => item.entity);

    const { signals, context } = await buildLiveSignals(Math.max(limit, 20));
    const matchedSignals = filterSignalsByWatchlist(signals, entities).slice(0, Math.min(limit, 20));

    const summary = {
      title: 'Your Personalized AI Brief',
      generatedAt: new Date().toISOString(),
      watchlistCount: entities.length,
      matchedSignals: matchedSignals.length,
      lead: matchedSignals[0]?.title || 'No watchlist matches yet. Add entities to get personalized updates.',
    };

    return NextResponse.json({
      success: true,
      data: {
        summary,
        signals: matchedSignals,
        context,
      },
    });
  } catch (error) {
    console.error('Error building personalized brief:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to build personalized brief' },
      { status: 500 }
    );
  }
}

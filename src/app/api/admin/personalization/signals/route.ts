import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildLiveSignals } from '@/lib/signals-service';
import { rankSignalsForUser } from '@/lib/signal-personalization';

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  return Boolean(cronSecret && authHeader === `Bearer ${cronSecret}`);
}

// GET /api/admin/personalization/signals?userId=...&limit=20&watchlistOnly=true
// Temporary debug route for inspecting personalization ranking output.
export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const watchlistOnly = searchParams.get('watchlistOnly') === 'true';

    const user = userIdParam
      ? await prisma.user.findUnique({
          where: { id: userIdParam },
          include: {
            preferences: true,
            watchlistItems: { include: { entity: true } },
          },
        })
      : await prisma.user.findFirst({
          orderBy: { updatedAt: 'desc' },
          include: {
            preferences: true,
            watchlistItems: { include: { entity: true } },
          },
        });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No user found for personalization debug' },
        { status: 404 }
      );
    }

    const readHistory = await prisma.readHistory.findMany({
      where: { userId: user.id },
      orderBy: { readAt: 'desc' },
      take: 250,
      select: {
        articleType: true,
        readAt: true,
      },
    });

    const candidateLimit = Math.max(limit * 3, 30);
    const { signals, context } = await buildLiveSignals(candidateLimit);
    const ranked = rankSignalsForUser({
      signals,
      watchlistEntities: user.watchlistItems.map((item) => item.entity),
      preferences: user.preferences,
      readHistory,
      limit,
      watchlistOnly,
    });

    return NextResponse.json({
      success: true,
      data: ranked.data,
      count: ranked.data.length,
      debug: {
        scoringVersion: ranked.scoringVersion,
        user: {
          id: user.id,
          email: user.email,
          watchlistCount: user.watchlistItems.length,
          hasPreferences: Boolean(user.preferences),
          readHistoryCount: readHistory.length,
        },
        context,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in personalization debug route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to build personalization debug output' },
      { status: 500 }
    );
  }
}

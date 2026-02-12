import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';

type WatchlistEntityType = 'company' | 'model' | 'funding';

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// GET /api/watchlists
export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const items = await prisma.userWatchlist.findMany({
      where: { userId: authUser.id },
      include: { entity: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch watchlist' },
      { status: 500 }
    );
  }
}

// POST /api/watchlists
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const entityType = body.entityType as WatchlistEntityType | undefined;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const slug = typeof body.slug === 'string' && body.slug.trim().length > 0
      ? normalizeSlug(body.slug)
      : normalizeSlug(name);
    const url = typeof body.url === 'string' ? body.url : null;
    const source = typeof body.source === 'string' ? body.source : null;
    const metadata = body.metadata && typeof body.metadata === 'object' ? body.metadata : undefined;

    if (!entityType || !['company', 'model', 'funding'].includes(entityType) || !name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Invalid payload. entityType, name, and slug are required.' },
        { status: 400 }
      );
    }

    const entity = await prisma.trackedEntity.upsert({
      where: { entityType_slug: { entityType, slug } },
      update: {
        name,
        url,
        source,
        metadata,
      },
      create: {
        entityType,
        slug,
        name,
        url,
        source,
        metadata,
      },
    });

    const watchItem = await prisma.userWatchlist.upsert({
      where: {
        userId_entityId: {
          userId: authUser.id,
          entityId: entity.id,
        },
      },
      update: {},
      create: {
        userId: authUser.id,
        entityId: entity.id,
      },
      include: { entity: true },
    });

    return NextResponse.json({
      success: true,
      data: watchItem,
    });
  } catch (error) {
    console.error('Error adding watchlist item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add watchlist item' },
      { status: 500 }
    );
  }
}

// DELETE /api/watchlists?itemId=... OR ?entityId=...
export async function DELETE(request: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');
    const entityId = searchParams.get('entityId');

    if (!itemId && !entityId) {
      return NextResponse.json(
        { success: false, error: 'itemId or entityId is required' },
        { status: 400 }
      );
    }

    if (itemId) {
      await prisma.userWatchlist.deleteMany({
        where: {
          id: itemId,
          userId: authUser.id,
        },
      });
    } else if (entityId) {
      await prisma.userWatchlist.delete({
        where: {
          userId_entityId: {
            userId: authUser.id,
            entityId,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Watchlist item removed',
    });
  } catch (error) {
    console.error('Error removing watchlist item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove watchlist item' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';

// GET /api/user/history - Get user's read history
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
    const type = searchParams.get('type'); // 'news', 'glossary', 'explainer', or null for all
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const where: { userId: string; articleType?: string } = {
      userId: authUser.id,
    };

    if (type) {
      where.articleType = type;
    }

    const history = await prisma.readHistory.findMany({
      where,
      orderBy: { readAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: history,
      count: history.length,
    });
  } catch (error) {
    console.error('Error fetching read history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch read history' },
      { status: 500 }
    );
  }
}

// POST /api/user/history - Track article read
export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser?.id) {
      // Silently return success for non-authenticated users
      // They just won't have tracking
      return NextResponse.json({
        success: true,
        message: 'Not tracking (not authenticated)',
      });
    }

    const { articleId, articleType } = await request.json();

    if (!articleId || !articleType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: articleId, articleType' },
        { status: 400 }
      );
    }

    // Validate articleType
    const validTypes = ['news', 'glossary', 'explainer', 'research', 'model', 'funding'];
    if (!validTypes.includes(articleType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid articleType' },
        { status: 400 }
      );
    }

    // Upsert to update readAt if already exists
    const history = await prisma.readHistory.upsert({
      where: {
        userId_articleId: {
          userId: authUser.id,
          articleId,
        },
      },
      update: {
        readAt: new Date(),
        articleType,
      },
      create: {
        userId: authUser.id,
        articleId,
        articleType,
      },
    });

    return NextResponse.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error('Error tracking read:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track read' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/history - Clear read history
export async function DELETE(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    if (articleId) {
      // Delete specific entry
      await prisma.readHistory.delete({
        where: {
          userId_articleId: {
            userId: authUser.id,
            articleId,
          },
        },
      });
    } else {
      // Clear all history
      await prisma.readHistory.deleteMany({
        where: { userId: authUser.id },
      });
    }

    return NextResponse.json({
      success: true,
      message: articleId ? 'Entry removed' : 'History cleared',
    });
  } catch (error) {
    console.error('Error clearing history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear history' },
      { status: 500 }
    );
  }
}

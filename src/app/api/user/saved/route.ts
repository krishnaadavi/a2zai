import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/user/saved - Get user's saved articles
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'news', 'research', 'model', or null for all

    const where: { userId: string; source?: string } = {
      userId: session.user.id,
    };

    if (type) {
      where.source = type;
    }

    const savedArticles = await prisma.savedArticle.findMany({
      where,
      orderBy: { savedAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: savedArticles,
      count: savedArticles.length,
    });
  } catch (error) {
    console.error('Error fetching saved articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch saved articles' },
      { status: 500 }
    );
  }
}

// POST /api/user/saved - Save an article
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { articleId, title, url, source } = body as {
      articleId: string;
      title: string;
      url: string;
      source: string;
    };

    if (!articleId || !title || !url || !source) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: articleId, title, url, source' },
        { status: 400 }
      );
    }

    // Check if already saved
    const existing = await prisma.savedArticle.findUnique({
      where: {
        userId_articleId: {
          userId: session.user.id,
          articleId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Article already saved',
        data: existing,
      });
    }

    const savedArticle = await prisma.savedArticle.create({
      data: {
        userId: session.user.id,
        articleId,
        title,
        url,
        source,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Article saved successfully',
      data: savedArticle,
    });
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save article' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/saved - Remove a saved article
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    if (!articleId) {
      return NextResponse.json(
        { success: false, error: 'Missing articleId parameter' },
        { status: 400 }
      );
    }

    await prisma.savedArticle.delete({
      where: {
        userId_articleId: {
          userId: session.user.id,
          articleId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Article removed from saved',
    });
  } catch (error) {
    console.error('Error removing saved article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove saved article' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';

// POST /api/user/saved/check - Check if articles are saved
// Takes an array of articleIds and returns which ones are saved
export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser?.id) {
      // Return empty for unauthenticated users
      return NextResponse.json({
        success: true,
        data: {},
      });
    }

    const body = await request.json();
    const { articleIds } = body as { articleIds: string[] };

    if (!articleIds || !Array.isArray(articleIds)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body: expected articleIds array' },
        { status: 400 }
      );
    }

    const savedArticles = await prisma.savedArticle.findMany({
      where: {
        userId: authUser.id,
        articleId: { in: articleIds },
      },
      select: { articleId: true },
    });

    // Convert to a map for easy lookup
    const savedMap: Record<string, boolean> = {};
    savedArticles.forEach((article) => {
      savedMap[article.articleId] = true;
    });

    return NextResponse.json({
      success: true,
      data: savedMap,
    });
  } catch (error) {
    console.error('Error checking saved articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check saved articles' },
      { status: 500 }
    );
  }
}

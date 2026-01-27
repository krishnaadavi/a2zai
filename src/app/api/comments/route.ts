import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';

// GET /api/comments - Get comments for an article
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');
    const articleType = searchParams.get('articleType');

    if (!articleId || !articleType) {
      return NextResponse.json(
        { success: false, error: 'articleId and articleType are required' },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        articleId,
        articleType,
        parentId: null, // Only get top-level comments
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: comments,
      count: comments.length,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST /api/comments - Create a new comment
export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser?.id) {
      return NextResponse.json(
        { success: false, error: 'Please sign in to comment' },
        { status: 401 }
      );
    }

    const { articleId, articleType, content, parentId } = await request.json();

    if (!articleId || !articleType || !content) {
      return NextResponse.json(
        { success: false, error: 'articleId, articleType, and content are required' },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.length < 1 || content.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Comment must be between 1 and 2000 characters' },
        { status: 400 }
      );
    }

    // If parentId is provided, verify it exists
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });
      if (!parentComment) {
        return NextResponse.json(
          { success: false, error: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }

    const comment = await prisma.comment.create({
      data: {
        userId: authUser.id,
        articleId,
        articleType,
        content: content.trim(),
        parentId: parentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

// DELETE /api/comments - Delete a comment
export async function DELETE(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser?.id) {
      return NextResponse.json(
        { success: false, error: 'Please sign in to delete comments' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('id');

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    // Check comment exists and belongs to user
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return NextResponse.json(
        { success: false, error: 'Comment not found' },
        { status: 404 }
      );
    }

    if (comment.userId !== authUser.id) {
      return NextResponse.json(
        { success: false, error: 'You can only delete your own comments' },
        { status: 403 }
      );
    }

    // Delete comment (cascades to replies)
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment deleted',
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

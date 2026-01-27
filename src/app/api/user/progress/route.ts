import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';

interface ProgressItem {
  id: string;
  contentType: string;
  contentId: string;
  status: string;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// GET - Get user's learning progress
export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser();

    if (!authUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('type'); // 'glossary', 'explainer', 'course', or null for all

    const where: { userId: string; contentType?: string } = { userId: authUser.id };
    if (contentType) {
      where.contentType = contentType;
    }

    const progress: ProgressItem[] = await prisma.learningProgress.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    // Calculate stats
    const stats = {
      glossary: {
        completed: progress.filter((p: ProgressItem) => p.contentType === 'glossary' && p.status === 'completed').length,
        started: progress.filter((p: ProgressItem) => p.contentType === 'glossary' && p.status === 'started').length,
      },
      explainer: {
        completed: progress.filter((p: ProgressItem) => p.contentType === 'explainer' && p.status === 'completed').length,
        started: progress.filter((p: ProgressItem) => p.contentType === 'explainer' && p.status === 'started').length,
      },
      course: {
        completed: progress.filter((p: ProgressItem) => p.contentType === 'course' && p.status === 'completed').length,
        started: progress.filter((p: ProgressItem) => p.contentType === 'course' && p.status === 'started').length,
      },
    };

    return NextResponse.json({
      success: true,
      data: progress,
      stats,
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

// POST - Mark content as started or completed
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser();

    if (!authUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { contentType, contentId, status } = await request.json();

    if (!contentType || !contentId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: contentType, contentId, status' },
        { status: 400 }
      );
    }

    if (!['glossary', 'explainer', 'course'].includes(contentType)) {
      return NextResponse.json({ error: 'Invalid contentType' }, { status: 400 });
    }

    if (!['started', 'completed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Upsert the progress record
    const progress: ProgressItem = await prisma.learningProgress.upsert({
      where: {
        userId_contentType_contentId: {
          userId: authUser.id,
          contentType,
          contentId,
        },
      },
      update: {
        status,
        completedAt: status === 'completed' ? new Date() : null,
      },
      create: {
        userId: authUser.id,
        contentType,
        contentId,
        status,
        completedAt: status === 'completed' ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}

// DELETE - Remove progress (reset)
export async function DELETE(request: NextRequest) {
  try {
    const authUser = await getAuthUser();

    if (!authUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { contentType, contentId } = await request.json();

    if (!contentType || !contentId) {
      return NextResponse.json(
        { error: 'Missing required fields: contentType, contentId' },
        { status: 400 }
      );
    }

    await prisma.learningProgress.deleteMany({
      where: {
        userId: authUser.id,
        contentType,
        contentId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting progress:', error);
    return NextResponse.json({ error: 'Failed to delete progress' }, { status: 500 });
  }
}

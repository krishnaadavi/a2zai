import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';

// GET /api/user/alerts
export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '25', 10);
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    const alerts = await prisma.inAppAlert.findMany({
      where: {
        userId: authUser.id,
        ...(unreadOnly ? { isRead: false } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 100),
    });

    return NextResponse.json({
      success: true,
      data: alerts,
      count: alerts.length,
    });
  } catch (error) {
    console.error('Error fetching user alerts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user alerts' },
      { status: 500 }
    );
  }
}

// POST /api/user/alerts
// Mark alerts as read
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const alertId = typeof body.alertId === 'string' ? body.alertId : null;
    const markAllRead = body.markAllRead === true;

    if (!alertId && !markAllRead) {
      return NextResponse.json(
        { success: false, error: 'alertId or markAllRead is required' },
        { status: 400 }
      );
    }

    if (markAllRead) {
      const result = await prisma.inAppAlert.updateMany({
        where: {
          userId: authUser.id,
          isRead: false,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });
      return NextResponse.json({
        success: true,
        updated: result.count,
      });
    }

    const alert = await prisma.inAppAlert.updateMany({
      where: {
        id: alertId!,
        userId: authUser.id,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      updated: alert.count,
    });
  } catch (error) {
    console.error('Error updating user alerts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user alerts' },
      { status: 500 }
    );
  }
}

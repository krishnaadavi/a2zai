import { NextResponse } from 'next/server';
import { runPersonalizedAlertPipeline } from '@/lib/alert-pipeline';
import { prisma } from '@/lib/prisma';

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  return Boolean(cronSecret && authHeader === `Bearer ${cronSecret}`);
}

// POST /api/admin/alerts/run
// Trigger watchlist alert pipeline (protected by CRON_SECRET).
export async function POST(request: Request) {
  const maxUsers = parseInt(new URL(request.url).searchParams.get('maxUsers') || '200', 10);
  const threshold = parseInt(new URL(request.url).searchParams.get('threshold') || '60', 10);

  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await runPersonalizedAlertPipeline({ maxUsers, threshold });

    await prisma.alertPipelineRun.create({
      data: {
        source: 'admin',
        success: true,
        maxUsers,
        threshold,
        consideredUsers: result.consideredUsers,
        processedUsers: result.processedUsers,
        inAppAlertsCreated: result.inAppAlertsCreated,
        emailInstantSent: result.emailInstantSent,
        emailDailySent: result.emailDailySent,
        candidateSignalsEvaluated: result.candidateSignalsEvaluated,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Alert pipeline run completed',
      result,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    await prisma.alertPipelineRun.create({
      data: {
        source: 'admin',
        success: false,
        maxUsers,
        threshold,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    });
    console.error('Error running alert pipeline:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to run alert pipeline' },
      { status: 500 }
    );
  }
}

// GET /api/admin/alerts/run
// Read-only status snapshot for recent alert activity.
export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [inAppCount24h, emailCount24h, latestInApp] = await Promise.all([
      prisma.inAppAlert.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.alertDeliveryLog.count({
        where: {
          channel: { in: ['email_instant', 'email_daily'] },
          deliveredAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.inAppAlert.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          userId: true,
          signalId: true,
          title: true,
          eventType: true,
          createdAt: true,
        },
      }),
    ]);
    const recentRuns = await prisma.alertPipelineRun.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      data: {
        inAppCount24h,
        emailCount24h,
        latestInApp,
        recentRuns,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error reading alert pipeline status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read alert pipeline status' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { runPersonalizedAlertPipeline } from '@/lib/alert-pipeline';
import { prisma } from '@/lib/prisma';

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  return Boolean(cronSecret && authHeader === `Bearer ${cronSecret}`);
}

// GET /api/cron/alerts
// Vercel cron-compatible trigger endpoint (GET only).
export async function GET(request: Request) {
  const maxUsers = 200;
  const threshold = 60;

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
        source: 'cron',
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
      message: 'Cron alert pipeline completed',
      result,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    await prisma.alertPipelineRun.create({
      data: {
        source: 'cron',
        success: false,
        maxUsers,
        threshold,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    });

    console.error('Cron alert pipeline failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to run cron alert pipeline' },
      { status: 500 }
    );
  }
}

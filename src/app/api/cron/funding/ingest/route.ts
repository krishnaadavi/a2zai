import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ingestFundingSnapshots } from '@/lib/funding-snapshot-service';

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  return Boolean(cronSecret && authHeader === `Bearer ${cronSecret}`);
}

// GET /api/cron/funding/ingest
export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const result = await ingestFundingSnapshots('cron');

    return NextResponse.json({
      success: true,
      message: 'Funding cron ingest completed',
      result,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    await prisma.fundingSnapshotRun.create({
      data: {
        source: 'cron',
        success: false,
        provider: process.env.FUNDING_PROVIDER || 'none',
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    });

    console.error('Funding cron ingest failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to run funding cron ingest' },
      { status: 500 }
    );
  }
}

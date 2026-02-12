import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ingestFundingSnapshots } from '@/lib/funding-snapshot-service';

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  return Boolean(cronSecret && authHeader === `Bearer ${cronSecret}`);
}

// POST /api/admin/funding/ingest
export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const result = await ingestFundingSnapshots('admin');

    return NextResponse.json({
      success: true,
      message: 'Funding snapshot ingest completed',
      result,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Funding ingest failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to ingest funding snapshots' },
      { status: 500 }
    );
  }
}

// GET /api/admin/funding/ingest
export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const [recentRuns, snapshotCount, latestSnapshotAt] = await Promise.all([
      prisma.fundingSnapshotRun.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.fundingSignalSnapshot.count(),
      prisma.fundingSignalSnapshot.findFirst({
        orderBy: { capturedAt: 'desc' },
        select: { capturedAt: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        snapshotCount,
        latestSnapshotAt: latestSnapshotAt?.capturedAt ?? null,
        recentRuns,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Funding ingest status read failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read funding ingest status' },
      { status: 500 }
    );
  }
}

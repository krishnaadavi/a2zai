import { NextResponse } from 'next/server';
import { getDigestIssues } from '@/lib/digest-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const issues = await getDigestIssues(Math.min(Math.max(limit, 1), 24));

    return NextResponse.json({
      success: true,
      data: issues,
      count: issues.length,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching digest preview:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch digest preview' },
      { status: 500 }
    );
  }
}

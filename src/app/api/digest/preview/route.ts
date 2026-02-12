import { NextResponse } from 'next/server';
import { getDigestIssues, getPersonalizedDigestPreview } from '@/lib/digest-service';
import { getAuthUser } from '@/lib/auth-session';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const personalized = searchParams.get('personalized') === 'true';

    if (personalized) {
      const authUser = await getAuthUser();
      if (!authUser?.id) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const issue = await getPersonalizedDigestPreview(authUser.id);
      const issues = issue ? [issue] : [];

      return NextResponse.json({
        success: true,
        data: issues,
        count: issues.length,
        personalization: {
          personalized: true,
          hasWatchlistMatches: issues.length > 0,
        },
        updatedAt: new Date().toISOString(),
      });
    }

    const issues = await getDigestIssues(Math.min(Math.max(limit, 1), 24));

    return NextResponse.json({
      success: true,
      data: issues,
      count: issues.length,
      personalization: {
        personalized: false,
      },
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

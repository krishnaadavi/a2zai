import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';

const booleanFields = [
  'emailDailyBrief',
  'emailWeeklyBrief',
  'emailInstantAlerts',
  'inAppAlerts',
  'fundingAlerts',
  'modelReleaseAlerts',
  'companyNewsAlerts',
] as const;

type PreferenceField = (typeof booleanFields)[number];

function getDefaultPreferences() {
  return {
    emailDailyBrief: true,
    emailWeeklyBrief: true,
    emailInstantAlerts: false,
    inAppAlerts: true,
    fundingAlerts: true,
    modelReleaseAlerts: true,
    companyNewsAlerts: true,
  };
}

// GET /api/watchlists/preferences
export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const prefs = await prisma.alertPreference.findUnique({
      where: { userId: authUser.id },
    });

    return NextResponse.json({
      success: true,
      data: prefs || getDefaultPreferences(),
    });
  } catch (error) {
    console.error('Error fetching watchlist preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch watchlist preferences' },
      { status: 500 }
    );
  }
}

// POST /api/watchlists/preferences
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updateData: Partial<Record<PreferenceField, boolean>> = {};

    for (const field of booleanFields) {
      if (field in body && typeof body[field] === 'boolean') {
        updateData[field] = body[field];
      }
    }

    const prefs = await prisma.alertPreference.upsert({
      where: { userId: authUser.id },
      update: updateData,
      create: {
        userId: authUser.id,
        ...getDefaultPreferences(),
        ...updateData,
      },
    });

    return NextResponse.json({
      success: true,
      data: prefs,
    });
  } catch (error) {
    console.error('Error updating watchlist preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update watchlist preferences' },
      { status: 500 }
    );
  }
}

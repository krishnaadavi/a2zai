import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';

const contentBooleanFields = [
  'showNews',
  'showModels',
  'showResearch',
  'showFunding',
  'showTools',
  'showCourses',
  'topicsLLMs',
  'topicsComputerVision',
  'topicsRobotics',
  'topicsAudio',
  'topicsAgents',
  'topicsOpenSource',
  'topicsStartups',
  'topicsPolicy',
  'emailDigestDaily',
  'emailDigestWeekly',
  'emailBreakingNews',
  'compactView',
] as const;

const alertBooleanFields = [
  'emailDailyBrief',
  'emailWeeklyBrief',
  'emailInstantAlerts',
  'inAppAlerts',
  'fundingAlerts',
  'modelReleaseAlerts',
  'companyNewsAlerts',
] as const;

type ContentField = (typeof contentBooleanFields)[number];
type AlertField = (typeof alertBooleanFields)[number];

function getDefaultContentPreferences() {
  return {
    showNews: true,
    showModels: true,
    showResearch: true,
    showFunding: true,
    showTools: true,
    showCourses: true,
    topicsLLMs: true,
    topicsComputerVision: false,
    topicsRobotics: false,
    topicsAudio: false,
    topicsAgents: true,
    topicsOpenSource: false,
    topicsStartups: false,
    topicsPolicy: false,
    emailDigestDaily: false,
    emailDigestWeekly: true,
    emailBreakingNews: false,
    defaultHomePage: 'home',
    compactView: false,
  };
}

function getDefaultAlertPreferences() {
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

// GET /api/user/personalization
export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      include: {
        preferences: true,
        alertPreference: true,
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const content = { ...getDefaultContentPreferences(), ...(user.preferences || {}) };
    const alerts = { ...getDefaultAlertPreferences(), ...(user.alertPreference || {}) };

    return NextResponse.json({
      success: true,
      data: {
        ...content,
        ...alerts,
        contentPreferences: content,
        alertPreferences: alerts,
      },
    });
  } catch (error) {
    console.error('Error fetching personalization settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch personalization settings' },
      { status: 500 }
    );
  }
}

// POST /api/user/personalization
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const contentInput = body.contentPreferences && typeof body.contentPreferences === 'object'
      ? body.contentPreferences
      : body;
    const alertInput = body.alertPreferences && typeof body.alertPreferences === 'object'
      ? body.alertPreferences
      : body;

    const contentUpdateData: Partial<Record<ContentField, boolean>> & {
      defaultHomePage?: 'home' | 'news' | 'learn' | 'intelligence';
    } = {};
    const alertUpdateData: Partial<Record<AlertField, boolean>> = {};

    for (const field of contentBooleanFields) {
      if (field in contentInput && typeof contentInput[field] === 'boolean') {
        contentUpdateData[field] = contentInput[field];
      }
    }

    if (
      'defaultHomePage' in contentInput &&
      typeof contentInput.defaultHomePage === 'string' &&
      ['home', 'news', 'learn', 'intelligence'].includes(contentInput.defaultHomePage)
    ) {
      contentUpdateData.defaultHomePage = contentInput.defaultHomePage as
        | 'home'
        | 'news'
        | 'learn'
        | 'intelligence';
    }

    for (const field of alertBooleanFields) {
      if (field in alertInput && typeof alertInput[field] === 'boolean') {
        alertUpdateData[field] = alertInput[field];
      }
    }

    const [content, alerts] = await Promise.all([
      prisma.userPreferences.upsert({
        where: { userId: authUser.id },
        update: contentUpdateData,
        create: {
          userId: authUser.id,
          ...getDefaultContentPreferences(),
          ...contentUpdateData,
        },
      }),
      prisma.alertPreference.upsert({
        where: { userId: authUser.id },
        update: alertUpdateData,
        create: {
          userId: authUser.id,
          ...getDefaultAlertPreferences(),
          ...alertUpdateData,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        ...content,
        ...alerts,
        contentPreferences: content,
        alertPreferences: alerts,
      },
    });
  } catch (error) {
    console.error('Error updating personalization settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update personalization settings' },
      { status: 500 }
    );
  }
}

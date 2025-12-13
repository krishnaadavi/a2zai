import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Get user's preferences
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { preferences: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return preferences or defaults if none exist
    const preferences = user.preferences || {
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

    return NextResponse.json({
      success: true,
      data: preferences,
    });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
  }
}

// POST/PUT - Update user's preferences
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();

    // Validate and sanitize input
    const validFields = [
      'showNews', 'showModels', 'showResearch', 'showFunding', 'showTools', 'showCourses',
      'topicsLLMs', 'topicsComputerVision', 'topicsRobotics', 'topicsAudio',
      'topicsAgents', 'topicsOpenSource', 'topicsStartups', 'topicsPolicy',
      'emailDigestDaily', 'emailDigestWeekly', 'emailBreakingNews',
      'defaultHomePage', 'compactView',
    ];

    const updateData: Record<string, boolean | string> = {};
    for (const field of validFields) {
      if (field in body) {
        if (field === 'defaultHomePage') {
          if (['home', 'news', 'learn'].includes(body[field])) {
            updateData[field] = body[field];
          }
        } else if (typeof body[field] === 'boolean') {
          updateData[field] = body[field];
        }
      }
    }

    // Upsert preferences
    const preferences = await prisma.userPreferences.upsert({
      where: { userId: user.id },
      update: updateData,
      create: {
        userId: user.id,
        ...updateData,
      },
    });

    return NextResponse.json({
      success: true,
      data: preferences,
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}

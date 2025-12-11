import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Available topics for preferences
export const AVAILABLE_TOPICS = [
  { id: 'llm', label: 'LLMs & Language Models' },
  { id: 'open_source', label: 'Open Source AI' },
  { id: 'research', label: 'Research & Papers' },
  { id: 'policy', label: 'AI Policy & Regulation' },
  { id: 'computer_vision', label: 'Computer Vision' },
  { id: 'robotics', label: 'Robotics & Automation' },
  { id: 'business', label: 'AI Business & Funding' },
  { id: 'hardware', label: 'AI Hardware & Chips' },
];

// GET /api/user/preferences - Get user's topic preferences
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const preferences = await prisma.topicPreference.findMany({
      where: { userId: session.user.id },
      select: { topic: true, enabled: true },
    });

    // Return all topics with their enabled status
    const topicsWithStatus = AVAILABLE_TOPICS.map((topic) => {
      const pref = preferences.find((p) => p.topic === topic.id);
      return {
        ...topic,
        enabled: pref?.enabled ?? true, // Default to enabled if not set
      };
    });

    return NextResponse.json({
      success: true,
      data: topicsWithStatus,
    });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

// PUT /api/user/preferences - Update user's topic preferences
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { topics } = body as { topics: Array<{ id: string; enabled: boolean }> };

    if (!topics || !Array.isArray(topics)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate topics
    const validTopicIds = AVAILABLE_TOPICS.map((t) => t.id);
    const invalidTopics = topics.filter((t) => !validTopicIds.includes(t.id));
    if (invalidTopics.length > 0) {
      return NextResponse.json(
        { success: false, error: `Invalid topics: ${invalidTopics.map((t) => t.id).join(', ')}` },
        { status: 400 }
      );
    }

    // Upsert each preference
    await Promise.all(
      topics.map((topic) =>
        prisma.topicPreference.upsert({
          where: {
            userId_topic: {
              userId: session.user.id,
              topic: topic.id,
            },
          },
          update: { enabled: topic.enabled },
          create: {
            userId: session.user.id,
            topic: topic.id,
            enabled: topic.enabled,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: 'Preferences updated successfully',
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}

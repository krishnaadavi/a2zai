import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.newsletterSubscriber.count();

    return NextResponse.json({
      success: true,
      count,
      // Format for display - show real count once > 100, otherwise show "growing community"
      displayCount: count >= 100
        ? `${Math.floor(count / 100) * 100}+`
        : count >= 10
          ? `${count}`
          : null,
    });
  } catch (error) {
    console.error('Newsletter stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get stats' },
      { status: 500 }
    );
  }
}

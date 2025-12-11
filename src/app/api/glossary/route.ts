import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const where: {
      AND?: Array<{
        OR?: Array<{ term?: { contains: string; mode: 'insensitive' }; shortDef?: { contains: string; mode: 'insensitive' } }>;
        category?: string;
      }>;
    } = {};

    const conditions = [];

    if (search) {
      conditions.push({
        OR: [
          { term: { contains: search, mode: 'insensitive' as const } },
          { shortDef: { contains: search, mode: 'insensitive' as const } },
        ],
      });
    }

    if (category && category !== 'all') {
      conditions.push({ category });
    }

    if (conditions.length > 0) {
      where.AND = conditions;
    }

    const terms = await prisma.glossaryTerm.findMany({
      where: conditions.length > 0 ? { AND: conditions } : undefined,
      orderBy: { term: 'asc' },
      select: {
        slug: true,
        term: true,
        shortDef: true,
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: terms,
      count: terms.length,
    });
  } catch (error) {
    console.error('Error fetching glossary:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch glossary terms' },
      { status: 500 }
    );
  }
}

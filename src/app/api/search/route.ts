import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase().trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], query: '' });
  }

  try {
    // Search glossary terms
    const glossaryTerms = await prisma.glossaryTerm.findMany({
      where: {
        OR: [
          { term: { contains: query, mode: 'insensitive' } },
          { shortDef: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        term: true,
        shortDef: true,
        slug: true,
        category: true,
      },
      take: 10,
    });

    // Search explainers
    const explainers = await prisma.explainer.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { subtitle: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        slug: true,
        category: true,
        difficulty: true,
      },
      take: 10,
    });

    // Format results
    const results = [
      ...glossaryTerms.map((term) => ({
        type: 'glossary' as const,
        id: term.id,
        title: term.term,
        description: term.shortDef,
        url: `/glossary/${term.slug}`,
        category: term.category,
      })),
      ...explainers.map((exp) => ({
        type: 'lesson' as const,
        id: exp.id,
        title: exp.title,
        description: exp.subtitle,
        url: `/learn/101/${exp.slug}`,
        category: exp.category,
        difficulty: exp.difficulty,
      })),
    ];

    // Sort by relevance (exact match first)
    results.sort((a, b) => {
      const aExact = a.title.toLowerCase() === query;
      const bExact = b.title.toLowerCase() === query;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStarts = a.title.toLowerCase().startsWith(query);
      const bStarts = b.title.toLowerCase().startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return 0;
    });

    return NextResponse.json({
      results: results.slice(0, 15),
      query,
      counts: {
        glossary: glossaryTerms.length,
        lessons: explainers.length,
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [], query, error: 'Search failed' }, { status: 500 });
  }
}

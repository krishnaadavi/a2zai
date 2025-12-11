import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { glossaryTerms } from '../../../../../prisma/seeds/glossary';
import { explainers } from '../../../../../prisma/seeds/explainers';

// POST /api/admin/seed - Seed the database
// Protected by CRON_SECRET
export async function POST(request: Request) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const results = {
      glossaryTerms: 0,
      explainers: 0,
    };

    // Seed Glossary Terms
    for (const term of glossaryTerms) {
      await prisma.glossaryTerm.upsert({
        where: { slug: term.slug },
        update: term,
        create: term,
      });
      results.glossaryTerms++;
    }

    // Seed Explainers
    for (const explainer of explainers) {
      await prisma.explainer.upsert({
        where: { slug: explainer.slug },
        update: explainer,
        create: explainer,
      });
      results.explainers++;
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      results,
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database', details: String(error) },
      { status: 500 }
    );
  }
}

// GET /api/admin/seed - Check seed status
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [glossaryCount, explainerCount] = await Promise.all([
      prisma.glossaryTerm.count(),
      prisma.explainer.count(),
    ]);

    return NextResponse.json({
      success: true,
      counts: {
        glossaryTerms: glossaryCount,
        explainers: explainerCount,
      },
      expected: {
        glossaryTerms: glossaryTerms.length,
        explainers: explainers.length,
      },
      needsSeeding: glossaryCount === 0 || explainerCount === 0,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to check status', details: String(error) },
      { status: 500 }
    );
  }
}

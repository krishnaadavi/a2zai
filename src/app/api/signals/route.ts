import { NextResponse } from 'next/server';
import { fetchAINews } from '@/lib/newsdata';
import { fetchTrendingModels } from '@/lib/huggingface';
import { fetchLatestPapers } from '@/lib/arxiv';
import { queryFundingRounds } from '@/lib/funding-service';
import { buildSignalFeed } from '@/lib/signal-normalizer';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const [news, models, papers] = await Promise.all([
      fetchAINews(15),
      fetchTrendingModels(10),
      fetchLatestPapers(6),
    ]);
    const funding = queryFundingRounds({ limit: 12, sortBy: 'date' });

    const signals = buildSignalFeed({
      news,
      models,
      funding,
      limit: Math.min(Math.max(limit, 1), 100),
    });

    return NextResponse.json({
      success: true,
      data: signals,
      count: signals.length,
      context: {
        newsCount: news.length,
        modelCount: models.length,
        paperCount: papers.length,
        fundingCount: funding.length,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error building signals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to build signal feed' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { AI_COMPANIES } from '@/lib/companies';
import { queryFundingRounds } from '@/lib/funding-service';
import { fetchTrendingModels } from '@/lib/huggingface';

type Suggestion = {
  entityType: 'company' | 'model' | 'funding';
  slug: string;
  name: string;
  subtitle: string;
  url?: string;
  source: string;
  metadata?: Record<string, string>;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const companySuggestions: Suggestion[] = AI_COMPANIES.slice(0, 10).map((company) => ({
      entityType: 'company',
      slug: company.id,
      name: company.name,
      subtitle: company.description,
      source: 'company-registry',
      metadata: {
        ticker: company.ticker || '',
      },
    }));

    const fundingSuggestions: Suggestion[] = queryFundingRounds({ limit: 10, sortBy: 'date' }).map((round) => ({
      entityType: 'funding',
      slug: slugify(round.company),
      name: round.company,
      subtitle: `${round.amount} ${round.round}`,
      url: round.website,
      source: 'funding-radar',
      metadata: {
        round: round.round,
        category: round.category,
      },
    }));

    const models = await fetchTrendingModels(10);
    const modelSuggestions: Suggestion[] = models.map((model) => ({
      entityType: 'model',
      slug: slugify(model.name),
      name: model.name,
      subtitle: `${model.provider} • ${model.type}`,
      url: model.url,
      source: 'huggingface',
      metadata: {
        provider: model.provider,
        type: model.type,
      },
    }));

    return NextResponse.json({
      success: true,
      data: {
        companies: companySuggestions,
        funding: fundingSuggestions,
        models: modelSuggestions,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching watchlist suggestions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch watchlist suggestions' },
      { status: 500 }
    );
  }
}

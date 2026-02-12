import { NextResponse } from 'next/server';
import { fetchTrendingModelsDetailed } from '@/lib/huggingface';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');

        const result = await fetchTrendingModelsDetailed(Math.min(limit, 20));

        return NextResponse.json({
            success: true,
            data: result.data,
            count: result.data.length,
            source: result.source,
            updatedAt: result.updatedAt,
        });
    } catch (error) {
        console.error('Error fetching models:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch models' },
            { status: 500 }
        );
    }
}

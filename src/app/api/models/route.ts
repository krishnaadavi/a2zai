import { NextResponse } from 'next/server';
import { fetchTrendingModels } from '@/lib/huggingface';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');

        const models = await fetchTrendingModels(Math.min(limit, 20));

        return NextResponse.json({
            success: true,
            data: models,
            count: models.length,
        });
    } catch (error) {
        console.error('Error fetching models:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch models' },
            { status: 500 }
        );
    }
}

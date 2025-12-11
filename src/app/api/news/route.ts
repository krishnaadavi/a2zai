import { NextResponse } from 'next/server';
import { fetchAINews } from '@/lib/newsdata';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');

        const news = await fetchAINews(Math.min(limit, 50));

        return NextResponse.json({
            success: true,
            data: news,
            count: news.length,
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}

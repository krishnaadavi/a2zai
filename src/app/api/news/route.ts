import { NextResponse } from 'next/server';
import { fetchAINews } from '@/lib/newsdata';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');

        // Debug: Log environment variable status
        const apiKeyStatus = process.env.NEWSDATA_API_KEY
            ? `SET (length: ${process.env.NEWSDATA_API_KEY.length})`
            : 'NOT SET';
        console.log(`[API/news] NEWSDATA_API_KEY: ${apiKeyStatus}`);

        const news = await fetchAINews(Math.min(limit, 20));

        // Debug: Check if mock data was returned
        const isMockData = news.length > 0 && news[0]?.url?.includes('example.com');
        console.log(`[API/news] Returned ${news.length} items, isMock: ${isMockData}`);

        return NextResponse.json({
            success: true,
            data: news,
            count: news.length,
            debug: {
                apiKeyStatus,
                isMockData,
            }
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}

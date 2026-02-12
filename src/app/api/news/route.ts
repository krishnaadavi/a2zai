import { NextResponse } from 'next/server';
import { fetchAINews } from '@/lib/newsdata';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');
        const category = searchParams.get('category');

        const news = await fetchAINews(Math.min(limit, 100));
        const filteredNews = category
            ? news.filter((item) => item.category.toLowerCase() === category.toLowerCase())
            : news;

        return NextResponse.json({
            success: true,
            data: filteredNews,
            count: filteredNews.length,
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}

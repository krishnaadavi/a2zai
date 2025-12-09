import { NextResponse } from 'next/server';
import { fetchLatestPapers } from '@/lib/arxiv';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');

        const papers = await fetchLatestPapers(Math.min(limit, 20));

        return NextResponse.json({
            success: true,
            data: papers,
            count: papers.length,
        });
    } catch (error) {
        console.error('Error fetching papers:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch papers' },
            { status: 500 }
        );
    }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { fetchAINews } from '@/lib/newsdata';
import { fetchTrendingModels } from '@/lib/huggingface';
import { fetchLatestPapers } from '@/lib/arxiv';

// Category mapping from news categories to topic preferences
const categoryToTopicMap: Record<string, string> = {
  'LLMs': 'llm',
  'Open Source': 'open_source',
  'Research': 'research',
  'Policy': 'policy',
  'Vision': 'computer_vision',
  'Robotics': 'robotics',
  'Business': 'business',
  'Hardware': 'hardware',
  'AI News': 'llm', // Default catch-all
};

// GET /api/feed - Get personalized content feed
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);

    // Fetch all content types in parallel
    const [news, models, papers] = await Promise.all([
      fetchAINews(20),
      fetchTrendingModels(10),
      fetchLatestPapers(10),
    ]);

    // If user is not logged in, return unfiltered content
    if (!session?.user?.id) {
      return NextResponse.json({
        success: true,
        data: {
          news: news.slice(0, limit),
          models: models.slice(0, 5),
          papers: papers.slice(0, 5),
        },
        personalized: false,
      });
    }

    // Get user preferences
    const preferences = await prisma.topicPreference.findMany({
      where: { userId: session.user.id },
    });

    // Get user read history to deprioritize already-read content
    const readHistory = await prisma.readHistory.findMany({
      where: { userId: session.user.id },
      select: { articleId: true },
    });
    const readIds = new Set(readHistory.map((r) => r.articleId));

    // Build preference map (default to all enabled if no preferences set)
    const prefMap: Record<string, boolean> = {};
    if (preferences.length > 0) {
      preferences.forEach((p) => {
        prefMap[p.topic] = p.enabled;
      });
    }

    // Score and sort news articles
    const scoredNews = news.map((article) => {
      let score = 0;
      const topicId = categoryToTopicMap[article.category] || 'llm';

      // +10 if matches a preferred topic (or if no preferences set)
      if (preferences.length === 0 || prefMap[topicId] !== false) {
        score += 10;
      }

      // -5 if already read
      if (readIds.has(article.id)) {
        score -= 5;
      }

      // +5 for recency (articles from today)
      const articleDate = new Date(article.publishedAt);
      const today = new Date();
      if (articleDate.toDateString() === today.toDateString()) {
        score += 5;
      }

      return { ...article, score };
    });

    // Sort by score descending, then by date
    scoredNews.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return NextResponse.json({
      success: true,
      data: {
        news: scoredNews.slice(0, limit).map(({ score, ...article }) => article),
        models: models.slice(0, 5),
        papers: papers.slice(0, 5),
      },
      personalized: true,
      preferencesSet: preferences.length > 0,
    });
  } catch (error) {
    console.error('Error fetching personalized feed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feed' },
      { status: 500 }
    );
  }
}

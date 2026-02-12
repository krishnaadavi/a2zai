import { prisma } from '@/lib/prisma';
import { fetchAINews } from '@/lib/newsdata';
import { fetchTrendingModels } from '@/lib/huggingface';
import { fetchLatestPapers } from '@/lib/arxiv';
import { queryFundingRounds } from '@/lib/funding-service';
import { buildSignalFeed } from '@/lib/signal-normalizer';
import { filterSignalsByWatchlist } from '@/lib/watchlist-matching';

export type DigestIssue = {
  id: string;
  weekNumber: number;
  year: number;
  date: string;
  title: string;
  highlights: string[];
  stats: {
    newsItems: number;
    modelsReleased: number;
    fundingRounds: number;
    researchPapers: number;
  };
};

function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function formatDateRange(date: Date): string {
  const endDate = new Date(date);
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - 6);

  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}

export async function buildLatestDigestIssue(): Promise<DigestIssue> {
  const now = new Date();
  const weekNumber = getWeekNumber(now);
  const year = now.getFullYear();

  const [news, models, papers] = await Promise.all([
    fetchAINews(25),
    fetchTrendingModels(10),
    fetchLatestPapers(8),
  ]);
  const funding = queryFundingRounds({ limit: 15, sortBy: 'date' });
  const signals = buildSignalFeed({ news, models, funding, limit: 6 });

  return {
    id: `digest-${year}-w${weekNumber}`,
    weekNumber,
    year,
    date: now.toISOString(),
    title: `AI Intelligence Brief • Week ${weekNumber}`,
    highlights: signals.slice(0, 3).map((s) => s.title),
    stats: {
      newsItems: news.length,
      modelsReleased: models.length,
      fundingRounds: funding.length,
      researchPapers: papers.length,
    },
  };
}

function parseDailyDigestRow(row: {
  id: string;
  date: Date;
  topStories: unknown;
  newsCount: number;
}): DigestIssue {
  const parsedStories = Array.isArray(row.topStories) ? row.topStories : [];
  const highlights = parsedStories
    .map((story) => {
      if (typeof story === 'string') return story;
      if (story && typeof story === 'object' && 'title' in story && typeof story.title === 'string') {
        return story.title;
      }
      return null;
    })
    .filter((story): story is string => Boolean(story))
    .slice(0, 3);

  const weekNumber = getWeekNumber(row.date);
  const year = row.date.getFullYear();

  return {
    id: row.id,
    weekNumber,
    year,
    date: row.date.toISOString(),
    title: `Digest Archive • Week ${weekNumber}`,
    highlights: highlights.length > 0 ? highlights : ['Weekly AI summary archived'],
    stats: {
      newsItems: row.newsCount,
      modelsReleased: 0,
      fundingRounds: 0,
      researchPapers: 0,
    },
  };
}

export async function getDigestIssues(limit: number = 12): Promise<DigestIssue[]> {
  const latestIssue = await buildLatestDigestIssue();
  const archiveRows = await prisma.dailyDigest.findMany({
    orderBy: { date: 'desc' },
    take: Math.max(limit - 1, 0),
  });
  const archive = archiveRows.map(parseDailyDigestRow);

  return [latestIssue, ...archive].slice(0, limit);
}

export async function getPersonalizedDigestPreview(userId: string): Promise<DigestIssue | null> {
  const watchlistItems = await prisma.userWatchlist.findMany({
    where: { userId },
    include: { entity: true },
  });
  const entities = watchlistItems.map((item) => item.entity);

  if (entities.length === 0) {
    return null;
  }

  const now = new Date();
  const weekNumber = getWeekNumber(now);
  const year = now.getFullYear();

  const [news, models, papers] = await Promise.all([
    fetchAINews(20),
    fetchTrendingModels(10),
    fetchLatestPapers(8),
  ]);
  const funding = queryFundingRounds({ limit: 15, sortBy: 'date' });
  const signals = buildSignalFeed({ news, models, funding, limit: 30 });
  const matchedSignals = filterSignalsByWatchlist(signals, entities).slice(0, 6);

  return {
    id: `personalized-digest-${year}-w${weekNumber}`,
    weekNumber,
    year,
    date: now.toISOString(),
    title: `Your Personalized AI Brief • Week ${weekNumber}`,
    highlights: matchedSignals.slice(0, 3).map((signal) => signal.title),
    stats: {
      newsItems: news.length,
      modelsReleased: models.length,
      fundingRounds: funding.length,
      researchPapers: papers.length,
    },
  };
}

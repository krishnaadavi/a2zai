'use client';

import { useState, useEffect, useCallback, useMemo, use } from 'react';
import { Clock, ExternalLink, Loader2, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { NewsGridSkeleton } from '@/components/Skeleton';
import ErrorState from '@/components/ErrorState';

interface AINewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  category: string;
  readTime: string;
  publishedAt?: string;
}

const ITEMS_PER_PAGE = 12;

// Category display names and descriptions
const categoryInfo: Record<string, { name: string; description: string; color: string }> = {
  'AI': {
    name: 'General AI',
    description: 'Broad artificial intelligence news and developments',
    color: 'from-purple-500 to-pink-500',
  },
  'LLM': {
    name: 'Large Language Models',
    description: 'Updates on GPT, Claude, Gemini, and other language models',
    color: 'from-blue-500 to-cyan-500',
  },
  'Research': {
    name: 'AI Research',
    description: 'Latest papers, breakthroughs, and academic developments',
    color: 'from-emerald-500 to-teal-500',
  },
  'Business': {
    name: 'AI Business',
    description: 'Funding, acquisitions, and industry news',
    color: 'from-orange-500 to-amber-500',
  },
  'Policy': {
    name: 'AI Policy & Regulation',
    description: 'Government regulations, ethics, and governance',
    color: 'from-red-500 to-rose-500',
  },
  'Robotics': {
    name: 'Robotics & Automation',
    description: 'Physical AI, robotics, and automation news',
    color: 'from-indigo-500 to-violet-500',
  },
  'Computer Vision': {
    name: 'Computer Vision',
    description: 'Image recognition, video analysis, and visual AI',
    color: 'from-cyan-500 to-blue-500',
  },
  'Open Source': {
    name: 'Open Source AI',
    description: 'Open source models, tools, and community projects',
    color: 'from-green-500 to-emerald-500',
  },
};

export default function CategoryNewsPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const decodedCategory = decodeURIComponent(category);

  const [news, setNews] = useState<AINewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/news?limit=100&category=${encodeURIComponent(decodedCategory)}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success && data.data) {
        setNews(data.data);
      } else {
        setError('Failed to load news');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [decodedCategory]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const displayedNews = useMemo(() => {
    return news.slice(0, displayCount);
  }, [news, displayCount]);

  const hasMore = displayCount < news.length;

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
      setLoadingMore(false);
    }, 300);
  };

  const info = categoryInfo[decodedCategory] || {
    name: decodedCategory,
    description: `News about ${decodedCategory}`,
    color: 'from-purple-500 to-cyan-500',
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className={`bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4 border-b border-gray-800`}>
        <div className="max-w-6xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All News
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 bg-gradient-to-br ${info.color} rounded-lg`}>
              <Tag className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{info.name}</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            {info.description}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <NewsGridSkeleton count={9} />
          ) : error ? (
            <ErrorState
              title="Failed to load news"
              message={error}
              onRetry={fetchNews}
              variant="default"
            />
          ) : news.length === 0 ? (
            <ErrorState
              title={`No ${info.name} news`}
              message="Check back later for updates in this category."
              variant="empty"
              showHomeLink
            />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">
                  {news.length} article{news.length !== 1 ? 's' : ''} in {info.name}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedNews.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-medium">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-3 flex-1">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="truncate max-w-[120px]">{item.source}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <Clock className="h-3 w-3" />
                          {item.readTime}
                        </span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>Load More ({news.length - displayCount} remaining)</>
                    )}
                  </button>
                </div>
              )}

              {!hasMore && news.length > 0 && (
                <div className="text-center mt-10">
                  <p className="text-gray-600 text-sm">
                    You&apos;ve seen all {news.length} articles in {info.name}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

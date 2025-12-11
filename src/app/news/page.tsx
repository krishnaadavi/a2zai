'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Newspaper, Clock, ExternalLink, Loader2 } from 'lucide-react';
import NewsFilters from '@/components/NewsFilters';
import { NewsGridSkeleton } from '@/components/Skeleton';
import ErrorState, { EmptyFilterState } from '@/components/ErrorState';

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

export default function NewsPage() {
  const [allNews, setAllNews] = useState<AINewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/news?limit=50', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success && data.data) {
        setAllNews(data.data);
      } else {
        setError('Failed to load news');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [selectedCategory, selectedSource, selectedDateRange, searchQuery]);

  // Extract unique categories and sources
  const categories = useMemo(() => {
    const cats = new Set(allNews.map((item) => item.category));
    return Array.from(cats).sort();
  }, [allNews]);

  const sources = useMemo(() => {
    const srcs = new Set(allNews.map((item) => item.source));
    return Array.from(srcs).sort();
  }, [allNews]);

  // Filter news based on selections
  const filteredNews = useMemo(() => {
    let result = allNews;

    // Category filter
    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Source filter
    if (selectedSource) {
      result = result.filter((item) => item.source === selectedSource);
    }

    // Date range filter
    if (selectedDateRange && allNews[0]?.publishedAt) {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      result = result.filter((item) => {
        if (!item.publishedAt) return true;
        const pubDate = new Date(item.publishedAt);

        switch (selectedDateRange) {
          case 'today':
            return pubDate >= startOfDay;
          case 'week':
            const weekAgo = new Date(startOfDay);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return pubDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(startOfDay);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return pubDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.source.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [allNews, selectedCategory, selectedSource, selectedDateRange, searchQuery]);

  // Paginated news
  const displayedNews = useMemo(() => {
    return filteredNews.slice(0, displayCount);
  }, [filteredNews, displayCount]);

  const hasMore = displayCount < filteredNews.length;

  const loadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
      setLoadingMore(false);
    }, 300);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSource(null);
    setSelectedDateRange(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory || selectedSource || selectedDateRange || searchQuery;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg">
              <Newspaper className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">AI News</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mb-8">
            Stay current with the latest developments in artificial intelligence, model releases,
            and industry updates.
          </p>

          {/* Filters */}
          {!loading && allNews.length > 0 && (
            <NewsFilters
              categories={categories}
              sources={sources}
              selectedCategory={selectedCategory}
              selectedSource={selectedSource}
              selectedDateRange={selectedDateRange}
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategory}
              onSourceChange={setSelectedSource}
              onDateRangeChange={setSelectedDateRange}
              onSearchChange={setSearchQuery}
            />
          )}
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
          ) : filteredNews.length === 0 ? (
            hasActiveFilters ? (
              <EmptyFilterState onClearFilters={clearFilters} />
            ) : (
              <ErrorState
                title="No news available"
                message="Check back later for the latest AI news."
                variant="empty"
              />
            )
          ) : (
            <>
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">
                  Showing {displayedNews.length} of {filteredNews.length} articles
                  {hasActiveFilters && ' (filtered)'}
                </p>
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedNews.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-medium">
                        {item.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-3 flex-1">
                      {item.title}
                    </h3>

                    {/* Meta */}
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

              {/* Load More */}
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
                      <>Load More ({filteredNews.length - displayCount} remaining)</>
                    )}
                  </button>
                </div>
              )}

              {/* Footer info */}
              {!hasMore && filteredNews.length > 0 && (
                <div className="text-center mt-10">
                  <p className="text-gray-600 text-sm">
                    You&apos;ve seen all {filteredNews.length} articles
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

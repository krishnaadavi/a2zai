'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Rss,
  ExternalLink,
  Clock,
  Settings,
  Loader2,
  Sparkles,
  Brain,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import SaveArticleButton from '@/components/SaveArticleButton';

type NewsItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  source: string;
  publishedAt: string;
  category: string;
  readTime: string;
};

type Model = {
  name: string;
  provider: string;
  trend: string;
  downloads: string;
  type: string;
  url: string;
};

type Paper = {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  publishedAt: string;
  arxivUrl: string;
};

type FeedData = {
  news: NewsItem[];
  models: Model[];
  papers: Paper[];
};

export default function FeedPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status ?? 'loading';
  const [feedData, setFeedData] = useState<FeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [personalized, setPersonalized] = useState(false);
  const [preferencesSet, setPreferencesSet] = useState(false);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch('/api/feed?limit=15');
        const data = await res.json();
        if (data.success) {
          setFeedData(data.data);
          setPersonalized(data.personalized);
          setPreferencesSet(data.preferencesSet);
        }
      } catch (error) {
        console.error('Failed to fetch feed:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your personalized feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl">
                <Rss className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Feed</h1>
                <p className="text-gray-400">
                  {personalized ? (
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      Personalized for you
                    </span>
                  ) : (
                    'Sign in to personalize your feed'
                  )}
                </p>
              </div>
            </div>

            {session && (
              <Link
                href="/profile/preferences"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Preferences</span>
              </Link>
            )}
          </div>

          {/* Preferences Prompt */}
          {session && !preferencesSet && (
            <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <p className="text-purple-200 text-sm">
                <Sparkles className="h-4 w-4 inline mr-2" />
                Set your topic preferences to get a more personalized feed.{' '}
                <Link href="/profile/preferences" className="underline hover:text-white">
                  Set preferences →
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column - News */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Your News
              </h2>

              {feedData?.news && feedData.news.length > 0 ? (
                <div className="space-y-4">
                  {feedData.news.map((item, idx) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-300 font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <span>{item.source}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <SaveArticleButton
                          articleId={item.id}
                          title={item.title}
                          url={item.url}
                          source="news"
                          size="sm"
                        />
                        <ExternalLink className="h-5 w-5 text-gray-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No news available</p>
              )}

              <div className="text-center mt-6">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
                >
                  View all news <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Trending Models */}
              {feedData?.models && feedData.models.length > 0 && (
                <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Trending Models</h3>
                    </div>
                    <Link href="/models" className="text-purple-400 text-sm hover:text-purple-300">
                      View all
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {feedData.models.map((model) => (
                      <a
                        key={model.name}
                        href={model.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 -mx-2 px-2 rounded transition-colors"
                      >
                        <div>
                          <span className="text-white font-medium text-sm">{model.name}</span>
                          <p className="text-gray-500 text-xs">{model.provider}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                            {model.type}
                          </span>
                          <span className="text-green-400 text-sm font-semibold">
                            {model.trend}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Latest Research */}
              {feedData?.papers && feedData.papers.length > 0 && (
                <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Latest Research</h3>
                    </div>
                    <Link href="/research" className="text-purple-400 text-sm hover:text-purple-300">
                      View all
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {feedData.papers.map((paper) => (
                      <a
                        key={paper.id}
                        href={paper.arxivUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 -mx-2 px-2 rounded transition-colors"
                      >
                        <h4 className="text-white text-sm font-medium line-clamp-2 hover:text-emerald-300 transition-colors">
                          {paper.title}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1">
                          {paper.authors.slice(0, 2).join(', ')}
                          {paper.authors.length > 2 ? ' et al.' : ''}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

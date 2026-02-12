'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  ExternalLink,
  Trash2,
  Loader2,
  Newspaper,
  BookOpen,
  Brain,
} from 'lucide-react';

type SavedArticle = {
  id: string;
  articleId: string;
  title: string;
  url: string;
  source: string;
  savedAt: string;
};

const sourceIcons: Record<string, typeof Newspaper> = {
  news: Newspaper,
  research: BookOpen,
  model: Brain,
};

const sourceLabels: Record<string, string> = {
  news: 'News',
  research: 'Research',
  model: 'Model',
};

export default function SavedArticlesPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status ?? 'loading';
  const [articles, setArticles] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/signin');
    }
  }, [status]);

  useEffect(() => {
    async function fetchSaved() {
      try {
        const url = filter ? `/api/user/saved?type=${filter}` : '/api/user/saved';
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch saved articles:', error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchSaved();
    }
  }, [session, filter]);

  const handleDelete = async (articleId: string) => {
    setDeleting(articleId);
    try {
      const res = await fetch(`/api/user/saved?articleId=${encodeURIComponent(articleId)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.articleId !== articleId));
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
    } finally {
      setDeleting(null);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  const filters = [
    { id: null, label: 'All' },
    { id: 'news', label: 'News' },
    { id: 'research', label: 'Research' },
    { id: 'model', label: 'Models' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Profile
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
              <Bookmark className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Saved Articles</h1>
              <p className="text-gray-400">{articles.length} articles saved</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-6">
            {filters.map((f) => (
              <button
                key={f.id ?? 'all'}
                onClick={() => {
                  setFilter(f.id);
                  setLoading(true);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 text-gray-700 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No saved articles</h2>
              <p className="text-gray-400 mb-6">
                Articles you save will appear here for easy access later.
              </p>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
              >
                Browse News
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((article) => {
                const Icon = sourceIcons[article.source] || Newspaper;
                return (
                  <div
                    key={article.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800 group"
                  >
                    <div className="p-2 rounded-lg bg-gray-800">
                      <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium hover:text-purple-300 transition-colors line-clamp-2 flex items-start gap-2"
                      >
                        {article.title}
                        <ExternalLink className="h-4 w-4 flex-shrink-0 mt-0.5 text-gray-600" />
                      </a>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                          {sourceLabels[article.source] || article.source}
                        </span>
                        <span>
                          Saved {new Date(article.savedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(article.articleId)}
                      disabled={deleting === article.articleId}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove from saved"
                    >
                      {deleting === article.articleId ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

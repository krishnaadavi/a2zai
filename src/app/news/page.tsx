'use client';

import { useState, useEffect } from 'react';
import { Newspaper, Clock, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface AINewsItem {
    id: string;
    title: string;
    url: string;
    source: string;
    category: string;
    readTime: string;
}

export default function NewsPage() {
    const [news, setNews] = useState<AINewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const res = await fetch('/api/news?limit=20', { cache: 'no-store' });
                const data = await res.json();
                if (data.success) {
                    setNews(data.data);
                } else {
                    setError('Failed to load news');
                }
            } catch (err) {
                setError('Failed to load news');
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    // Group by category for stats
    const categories = news.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

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
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Stay current with the latest developments in artificial intelligence,
                        model releases, and industry updates.
                    </p>

                    {/* Category Pills */}
                    {!loading && (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {Object.entries(categories).map(([category, count]) => (
                                <span
                                    key={category}
                                    className="px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-300"
                                >
                                    {category} <span className="text-purple-400">({count})</span>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* News Grid */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
                            <span className="ml-3 text-gray-400">Loading latest news...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <p className="text-red-400">{error}</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {news.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all hover:scale-[1.02]"
                                    >
                                        {/* Category */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs">
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
                                                <span>{item.source}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {item.readTime}
                                                </span>
                                            </div>
                                            <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Load More Hint */}
                            <div className="text-center mt-12">
                                <p className="text-gray-500 text-sm">
                                    Showing {news.length} articles • Refreshes on page load
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

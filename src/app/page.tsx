import { Zap, TrendingUp, BookOpen, Brain, Clock, ArrowRight, Sparkles, ExternalLink, GraduationCap, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { fetchAINews } from '@/lib/newsdata';
import { fetchTrendingModels } from '@/lib/huggingface';
import { fetchLatestPapers } from '@/lib/arxiv';
import { fetchAllCompanyNews, MOCK_COMPANY_NEWS } from '@/lib/company-rss';
import { fetchAIStocks, MOCK_STOCK_DATA } from '@/lib/stocks';
import { prisma } from '@/lib/prisma';
import NewsletterSignup from '@/components/NewsletterSignup';
import CompanyTicker from '@/components/CompanyTicker';
import CompanySpotlight from '@/components/CompanySpotlight';
import AIStockPulse from '@/components/AIStockPulse';
import { WebsiteJsonLd, OrganizationJsonLd } from '@/components/JsonLd';

// Force dynamic rendering - always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Fetch all data server-side
  const [news, models, papers, companyNews, stocks, termOfDay, glossaryCount, explainerCount] = await Promise.all([
    fetchAINews(5),
    fetchTrendingModels(5),
    fetchLatestPapers(2),
    fetchAllCompanyNews(3).catch(() => MOCK_COMPANY_NEWS),
    fetchAIStocks().catch(() => MOCK_STOCK_DATA),
    // Get a random glossary term for "Term of the Day"
    prisma.glossaryTerm.findFirst({
      orderBy: { updatedAt: 'desc' },
      skip: Math.floor(Math.random() * 10), // Random from recent 10
    }).catch(() => null),
    prisma.glossaryTerm.count().catch(() => 100),
    prisma.explainer.count().catch(() => 15),
  ]);

  return (
    <div className="min-h-screen">
      <WebsiteJsonLd />
      <OrganizationJsonLd />

      {/* Company Ticker */}
      <CompanyTicker news={companyNews.length > 0 ? companyNews : MOCK_COMPANY_NEWS} />

      {/* Hero Section - Split Layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-10 md:py-16 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-6xl mx-auto relative">
          {/* Main Headline */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">A-to-Z</span> Guide to AI
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              News, research, and learning — everything you need to stay AI-current
            </p>
          </div>

          {/* New to AI? Quick Start Banner */}
          {termOfDay && (
            <div className="mb-8 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-yellow-900/30 via-orange-900/20 to-yellow-900/30 border border-yellow-500/30">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                  </div>
                  <span className="text-yellow-300 font-semibold">New to AI?</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-gray-300">
                    Learn your first AI term: <Link href={`/learn/glossary/${termOfDay.slug}`} className="text-white font-bold hover:text-yellow-300 underline decoration-yellow-500/50 underline-offset-2">{termOfDay.term}</Link> — {termOfDay.shortDef.slice(0, 80)}...
                  </p>
                </div>
                <Link
                  href="/learn/101"
                  className="flex-shrink-0 px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors text-sm"
                >
                  Start Learning →
                </Link>
              </div>
            </div>
          )}

          {/* Split Cards - Two User Journeys */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Stay Current Card */}
            <Link
              href="/news"
              className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-900/40 to-purple-900/20 border border-purple-500/30 hover:border-purple-500/60 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Newspaper className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">Stay Current</h2>
                  <p className="text-purple-300/70 text-sm">For AI professionals</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Daily news, trending models, research papers, and market moves from OpenAI, Google, Meta, NVIDIA & more.
              </p>
              <div className="flex items-center gap-2 text-purple-400 font-medium">
                <Clock className="h-4 w-4" />
                <span>5 min daily digest</span>
                <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Learn AI Card */}
            <Link
              href="/learn"
              className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-emerald-900/20 border border-emerald-500/30 hover:border-emerald-500/60 transition-all hover:scale-[1.02]"
            >
              <div className="absolute -top-2 -right-2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                START HERE
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">Learn AI</h2>
                  <p className="text-emerald-300/70 text-sm">For curious minds</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                AI 101 course, comprehensive glossary, and beginner-friendly explainers. No ML degree required.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <BookOpen className="h-4 w-4" />
                <span>{explainerCount} lessons • {glossaryCount}+ terms</span>
                <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Credibility Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-4 px-6 rounded-xl bg-gray-900/50 border border-gray-800">
            <div className="flex items-center gap-2 text-gray-400">
              <Brain className="h-5 w-5 text-purple-400" />
              <span><strong className="text-white">{glossaryCount}+</strong> AI terms explained</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              <span><strong className="text-white">{explainerCount}</strong> in-depth lessons</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <span><strong className="text-white">60+</strong> AI tools reviewed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Spotlight */}
      <CompanySpotlight
        news={companyNews.length > 0 ? companyNews : MOCK_COMPANY_NEWS}
        stocks={stocks}
      />

      {/* Main Content Grid */}
      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Today's Top 5 - Main Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Today's Top 5</h2>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>~5 min total</span>
                </div>
              </div>

              <div className="space-y-4">
                {news.map((item, idx) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors cursor-pointer"
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
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{item.readTime} read</span>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-600 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-2" />
                  </a>
                ))}
              </div>

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
            <div className="space-y-6">
              {/* Trending Models */}
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
                  {models.slice(0, 5).map((model) => (
                    <a
                      key={model.name}
                      href={model.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 -mx-2 px-2 rounded transition-colors"
                    >
                      <div>
                        <span className="text-white font-medium">{model.name}</span>
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

              {/* Newsletter Sidebar */}
              <NewsletterSignup variant="sidebar" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Research */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Latest Research</h2>
            </div>
            <Link href="/research" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {papers.map((paper) => (
              <a
                key={paper.id}
                href={paper.arxivUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-emerald-500/50 transition-colors group"
              >
                <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">
                  arXiv
                </span>
                <h3 className="text-lg font-semibold text-white mt-3 group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {paper.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {paper.summary}
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                  <span>{paper.authors.slice(0, 2).join(', ')}{paper.authors.length > 2 ? ' et al.' : ''}</span>
                  <span>•</span>
                  <span>{new Date(paper.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* AI Stock Pulse - Moved Lower */}
      <section className="py-8 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <AIStockPulse stocks={stocks} />
        </div>
      </section>

      {/* Build Timestamp */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-600 bg-gray-900/80 px-2 py-1 rounded font-mono">
        v01022026-8.05pmCST
      </div>
    </div>
  );
}

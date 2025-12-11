import { Zap, TrendingUp, BookOpen, Brain, Clock, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { fetchAINews } from '@/lib/newsdata';
import { fetchTrendingModels } from '@/lib/huggingface';
import { fetchLatestPapers } from '@/lib/arxiv';
import { fetchAllCompanyNews, MOCK_COMPANY_NEWS } from '@/lib/company-rss';
import { fetchAIStocks, MOCK_STOCK_DATA } from '@/lib/stocks';
import NewsletterSignup from '@/components/NewsletterSignup';
import CompanyTicker from '@/components/CompanyTicker';
import CompanySpotlight from '@/components/CompanySpotlight';
import AIStockPulse from '@/components/AIStockPulse';

// Force dynamic rendering - always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Fetch all data server-side
  const [news, models, papers, companyNews, stocks] = await Promise.all([
    fetchAINews(5),
    fetchTrendingModels(5),
    fetchLatestPapers(2),
    fetchAllCompanyNews(3).catch(() => MOCK_COMPANY_NEWS),
    fetchAIStocks().catch(() => MOCK_STOCK_DATA),
  ]);

  return (
    <div className="min-h-screen">
      {/* Company Ticker */}
      <CompanyTicker news={companyNews.length > 0 ? companyNews : MOCK_COMPANY_NEWS} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                Your A-to-Z guide to AI
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI-current</span> in 5 minutes
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mb-6">
                Track AI innovation from NVIDIA, Meta, Google, OpenAI & more.
                News, models, research, and market moves — all in one place.
              </p>

              {/* Newsletter Signup */}
              <div id="newsletter">
                <NewsletterSignup variant="hero" />
              </div>
            </div>

            {/* Stock Pulse Widget */}
            <div className="hidden lg:block">
              <AIStockPulse stocks={stocks} />
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
            <div className="space-y-8">
              {/* Mobile Stock Pulse */}
              <div className="lg:hidden">
                <AIStockPulse stocks={stocks} />
              </div>

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
    </div>
  );
}

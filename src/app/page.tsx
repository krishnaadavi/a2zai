import { Zap, TrendingUp, BookOpen, Brain, Clock, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { fetchAINews } from '@/lib/newsdata';
import { fetchTrendingModels } from '@/lib/huggingface';
import { fetchLatestPapers } from '@/lib/arxiv';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch data server-side
  const [news, models, papers] = await Promise.all([
    fetchAINews(5),
    fetchTrendingModels(3),
    fetchLatestPapers(2),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-16 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              Updated every hour
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI-current</span> in 5 minutes
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Byte-sized AI news, model updates, and learning resources. Everything you need to know, nothing you don't.
            </p>
          </div>

          {/* Newsletter Signup */}
          <NewsletterSignup variant="hero" />
        </div>
      </section>

      {/* Today's Top 5 */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Today's Top 5</h2>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="h-4 w-4" />
              <span>~5 min total read</span>
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
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 font-bold">
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
      </section>

      {/* Trending Models */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Trending Models</h2>
            </div>
            <Link href="/models" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((model) => (
              <a
                key={model.name}
                href={model.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">
                    {model.type}
                  </span>
                  <span className="text-green-400 text-sm font-semibold">
                    {model.trend}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{model.name}</h3>
                <p className="text-gray-500 text-sm">{model.provider}</p>
              </a>
            ))}
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

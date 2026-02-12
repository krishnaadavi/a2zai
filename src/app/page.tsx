import { BellRing, ArrowRight, Sparkles, Building2, Brain, BookOpen, Rocket, Newspaper, Clock } from 'lucide-react';
import Link from 'next/link';
import { fetchAINews } from '@/lib/newsdata';
import { fetchTrendingModels } from '@/lib/huggingface';
import { fetchLatestPapers } from '@/lib/arxiv';
import { fetchAllCompanyNews, MOCK_COMPANY_NEWS } from '@/lib/company-rss';
import { fetchAIStocks, MOCK_STOCK_DATA } from '@/lib/stocks';
import { FUNDING_ROUNDS } from '@/lib/funding-data';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import NewsletterSignup from '@/components/NewsletterSignup';
import CompanyTicker from '@/components/CompanyTicker';
import CompanySpotlight from '@/components/CompanySpotlight';
import AIStockPulse from '@/components/AIStockPulse';
import { WebsiteJsonLd, OrganizationJsonLd } from '@/components/JsonLd';
import TrackedLink from '@/components/TrackedLink';
import TrackedExternalLink from '@/components/TrackedExternalLink';
import { buildSignalFeed } from '@/lib/signal-normalizer';

// Force dynamic rendering - always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [news, models, papers, companyNews, stocks, termOfDay, glossaryCount, explainerCount, session] = await Promise.all([
    fetchAINews(5),
    fetchTrendingModels(5),
    fetchLatestPapers(2),
    fetchAllCompanyNews(3).catch(() => MOCK_COMPANY_NEWS),
    fetchAIStocks().catch(() => MOCK_STOCK_DATA),
    prisma.glossaryTerm.findFirst({
      orderBy: { updatedAt: 'desc' },
    }).catch(() => null),
    prisma.glossaryTerm.count().catch(() => 100),
    prisma.explainer.count().catch(() => 15),
    getServerSession(authOptions),
  ]);

  const latestFunding = [...FUNDING_ROUNDS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
  const signals = buildSignalFeed({
    news,
    models: models.slice(0, 4),
    funding: latestFunding,
    limit: 8,
  });

  return (
    <div className="min-h-screen">
      <WebsiteJsonLd />
      <OrganizationJsonLd />

      <CompanyTicker news={companyNews.length > 0 ? companyNews : MOCK_COMPANY_NEWS} />

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 md:py-16 px-4 border-b border-gray-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Intelligence</span> for Builders and Investors
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Track AI companies, startups, funding, and model releases in one place. Stay ahead with signal-first updates and personalized watchlists.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <TrackedLink
                href="/watchlists"
                eventName="hero_watchlist_cta_clicked"
                eventParams={{ location: 'home_hero' }}
                className="px-5 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all"
              >
                Build your watchlist
              </TrackedLink>
              <TrackedLink
                href="/intelligence"
                eventName="intelligence_item_opened"
                eventParams={{ location: 'home_hero' }}
                className="px-5 py-3 rounded-lg font-semibold border border-gray-700 text-gray-200 hover:border-purple-400 hover:text-white transition-colors"
              >
                View intelligence feed
              </TrackedLink>
              <TrackedLink
                href="/briefs"
                eventName="brief_subscribe_clicked"
                eventParams={{ location: 'home_hero' }}
                className="px-5 py-3 rounded-lg font-semibold border border-cyan-700/50 text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                Get daily brief
              </TrackedLink>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Signals today</p>
              <p className="text-2xl font-bold text-white">{news.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Funding tracked</p>
              <p className="text-2xl font-bold text-white">{FUNDING_ROUNDS.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Models watched</p>
              <p className="text-2xl font-bold text-white">{models.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">AI terms</p>
              <p className="text-2xl font-bold text-white">{glossaryCount}+</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TrackedLink
              href="/intelligence"
              eventName="intelligence_item_opened"
              eventParams={{ location: 'home_modules' }}
              className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <Newspaper className="h-5 w-5 text-purple-300" />
                <h2 className="font-semibold text-white">Signal Feed</h2>
              </div>
              <p className="text-sm text-gray-400">High-impact funding, model launches, and company moves.</p>
            </TrackedLink>
            <TrackedLink
              href="/watchlists"
              eventName="hero_watchlist_cta_clicked"
              eventParams={{ location: 'home_modules' }}
              className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <BellRing className="h-5 w-5 text-cyan-300" />
                <h2 className="font-semibold text-white">Watchlists</h2>
              </div>
              <p className="text-sm text-gray-400">Follow companies, startups, and models you care about.</p>
            </TrackedLink>
            <Link
              href="/funding"
              className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-pink-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="h-5 w-5 text-pink-300" />
                <h2 className="font-semibold text-white">Funding Radar</h2>
              </div>
              <p className="text-sm text-gray-400">Curated rounds and investor movement across AI startups.</p>
            </Link>
            <Link
              href="/models"
              className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-emerald-300" />
                <h2 className="font-semibold text-white">Model Releases</h2>
              </div>
              <p className="text-sm text-gray-400">Track capability shifts in top model ecosystems.</p>
            </Link>
          </div>
        </div>
      </section>

      <CompanySpotlight
        news={companyNews.length > 0 ? companyNews : MOCK_COMPANY_NEWS}
        stocks={stocks}
      />

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-white">Latest Signals</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Fast scan</span>
                </div>
              </div>
              <div className="space-y-4">
                {signals.map((signal, idx) => (
                  <TrackedExternalLink
                    key={signal.id}
                    href={signal.url}
                    eventName="intelligence_item_opened"
                    eventParams={{ source: signal.source, rank: idx + 1, type: signal.eventType }}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-300 font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase">
                        {signal.eventType.replace('_', ' ')}
                      </span>
                      <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors line-clamp-2 mt-2">
                        {signal.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-1">
                        {signal.source} • {signal.entityName}
                      </p>
                    </div>
                  </TrackedExternalLink>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <BellRing className="h-4 w-4 text-cyan-300" />
                  <h3 className="text-lg font-semibold text-white">Your Watchlist</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  {session
                    ? 'Watchlist management is ready next. Start by setting your core companies and model bets.'
                    : 'Sign in to build your personalized watchlist and get entity-level alerts.'}
                </p>
                <TrackedLink
                  href={session ? '/watchlists' : '/signin'}
                  eventName="hero_watchlist_cta_clicked"
                  eventParams={{ location: 'home_sidebar' }}
                  className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-medium"
                >
                  {session ? 'Open watchlists' : 'Sign in to start'}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>

              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-purple-300" />
                  <h3 className="text-lg font-semibold text-white">Daily Intelligence Brief</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">Get the top AI market and product signals in one concise brief.</p>
                <NewsletterSignup variant="sidebar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl bg-gray-900 border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-pink-300" />
                  Funding Radar
                </h2>
                <Link href="/funding" className="text-purple-400 text-sm hover:text-purple-300">View all</Link>
              </div>
              <div className="space-y-3">
                {latestFunding.map((round) => (
                  <div key={round.id} className="p-3 rounded-lg bg-gray-950 border border-gray-800">
                    <div className="flex items-center justify-between">
                      <p className="text-white font-semibold">{round.company}</p>
                      <span className="text-pink-300 font-semibold">{round.amount}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{round.round} • {round.category}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-gray-900 border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-cyan-300" />
                  Model Momentum
                </h2>
                <Link href="/models" className="text-purple-400 text-sm hover:text-purple-300">View all</Link>
              </div>
              <div className="space-y-3">
                {models.slice(0, 4).map((model) => (
                  <a
                    key={model.name}
                    href={model.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-950 border border-gray-800 hover:border-cyan-500/40 transition-colors"
                  >
                    <div>
                      <p className="text-white font-medium">{model.name}</p>
                      <p className="text-xs text-gray-500">{model.provider}</p>
                    </div>
                    <span className="text-green-400 text-sm font-semibold">{model.trend}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-emerald-300" />
                  AI Education
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                  Keep sharpening fundamentals with {explainerCount} lessons and {glossaryCount}+ terms.
                </p>
                {termOfDay && (
                  <p className="text-sm text-gray-400 mt-2">
                    Term of the day: <Link href={`/learn/glossary/${termOfDay.slug}`} className="text-emerald-300 hover:text-emerald-200">{termOfDay.term}</Link>
                  </p>
                )}
              </div>
              <TrackedLink
                href="/learn"
                eventName="learn_section_opened_from_home"
                eventParams={{ location: 'home_education_strip' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
              >
                Explore Learn
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <AIStockPulse stocks={stocks} />
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-cyan-300" />
              Latest Research
            </h2>
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
                <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">arXiv</span>
                <h3 className="text-lg font-semibold text-white mt-3 group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {paper.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{paper.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

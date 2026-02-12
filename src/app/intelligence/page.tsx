import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Newspaper, Brain, Rocket, Building2 } from 'lucide-react';
import { fetchAINews } from '@/lib/newsdata';
import { fetchTrendingModels } from '@/lib/huggingface';
import { FUNDING_ROUNDS } from '@/lib/funding-data';
import TrackedExternalLink from '@/components/TrackedExternalLink';
import { buildSignalFeed } from '@/lib/signal-normalizer';

export const metadata: Metadata = {
  title: 'Intelligence | A2Z AI',
  description: 'Signal-first AI intelligence feed for builders and investors.',
  alternates: {
    canonical: 'https://a2zai.ai/intelligence',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IntelligencePage() {
  const [news, models] = await Promise.all([
    fetchAINews(8),
    fetchTrendingModels(6),
  ]);

  const recentFunding = [...FUNDING_ROUNDS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);
  const signals = buildSignalFeed({
    news,
    models,
    funding: recentFunding,
    limit: 14,
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-10 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Intelligence Feed</h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            High-signal updates across AI companies, funding, model releases, and ecosystem momentum.
          </p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-purple-300" />
              Latest Signals
            </h2>
            {signals.map((item, idx) => (
              <TrackedExternalLink
                key={item.id}
                href={item.url}
                eventName="intelligence_item_opened"
                eventParams={{ location: 'intelligence_feed', rank: idx + 1 }}
                className="block p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors"
              >
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase">
                  {item.eventType.replace('_', ' ')}
                </span>
                <h3 className="text-white font-semibold mt-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-1">{item.source} • {item.entityName}</p>
              </TrackedExternalLink>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <Brain className="h-4 w-4 text-cyan-300" />
                Model Momentum
              </h3>
              <div className="space-y-2">
                {models.slice(0, 5).map((model) => (
                  <a
                    key={model.name}
                    href={model.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/60"
                  >
                    <span className="text-sm text-white">{model.name}</span>
                    <span className="text-xs text-green-400">{model.trend}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <Rocket className="h-4 w-4 text-pink-300" />
                Funding Radar
              </h3>
              <div className="space-y-2">
                {recentFunding.slice(0, 4).map((round) => (
                  <div key={round.id} className="p-2 rounded-lg bg-gray-950 border border-gray-800">
                    <p className="text-sm text-white">{round.company}</p>
                    <p className="text-xs text-gray-500">{round.amount} • {round.round}</p>
                  </div>
                ))}
              </div>
              <Link href="/funding" className="inline-flex mt-3 text-sm text-purple-400 hover:text-purple-300 items-center gap-1">
                Explore funding <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-emerald-300" />
                Next Step
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Build your watchlist to receive personalized intelligence summaries.
              </p>
              <Link href="/watchlists" className="text-sm text-cyan-300 hover:text-cyan-200">
                Open watchlists →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { BellRing, ArrowRight, Building2, Brain, Rocket } from 'lucide-react';
import { authOptions } from '@/lib/auth';
import TrackedLink from '@/components/TrackedLink';

export const metadata: Metadata = {
  title: 'Watchlists | A2Z AI',
  description: 'Track AI companies, funding, and model releases in personalized watchlists.',
  alternates: {
    canonical: 'https://a2zai.ai/watchlists',
  },
};

export const dynamic = 'force-dynamic';

export default async function WatchlistsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="bg-gradient-to-br from-gray-900 via-cyan-900/20 to-gray-900 py-12 px-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <BellRing className="h-8 w-8 text-cyan-300" />
            Watchlists
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Follow the AI entities that matter to you and receive high-signal updates.
          </p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
            {session ? (
              <>
                <h2 className="text-xl font-semibold text-white">Watchlist setup is the next milestone</h2>
                <p className="text-gray-400 mt-2">
                  Backend entity-follow logic is coming in Phase 2. Start by setting preference inputs so we can seed your initial view.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/companies" className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700">
                    Browse companies
                  </Link>
                  <Link href="/models" className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700">
                    Browse models
                  </Link>
                  <Link href="/funding" className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700">
                    Browse funding
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white">Sign in to create your watchlist</h2>
                <p className="text-gray-400 mt-2">
                  Save companies, startups, and model ecosystems you want to monitor.
                </p>
                <TrackedLink
                  href="/api/auth/signin"
                  eventName="hero_watchlist_cta_clicked"
                  eventParams={{ location: 'watchlists_page' }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold"
                >
                  Sign in to start
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
              <Building2 className="h-5 w-5 text-purple-300 mb-2" />
              <h3 className="font-semibold text-white">Companies</h3>
              <p className="text-sm text-gray-500 mt-1">Track launches, partnerships, and market movement.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
              <Rocket className="h-5 w-5 text-pink-300 mb-2" />
              <h3 className="font-semibold text-white">Funding</h3>
              <p className="text-sm text-gray-500 mt-1">Monitor rounds by stage, category, and investor activity.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
              <Brain className="h-5 w-5 text-cyan-300 mb-2" />
              <h3 className="font-semibold text-white">Models</h3>
              <p className="text-sm text-gray-500 mt-1">Watch capability jumps and release cadence by provider.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

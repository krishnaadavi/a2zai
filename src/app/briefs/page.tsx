import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Clock, ArrowRight } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';
import BriefsPreviewPanel from '@/components/BriefsPreviewPanel';

export const metadata: Metadata = {
  title: 'Briefs | A2Z AI',
  description: 'Daily and weekly AI intelligence briefs for builders and investors.',
  alternates: {
    canonical: 'https://a2zai.ai/briefs',
  },
};

export default function BriefsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <Mail className="h-8 w-8 text-purple-300" />
            Intelligence Briefs
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Get concise, high-signal updates on AI companies, funding, and model releases.
          </p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-3">Subscribe to Briefs</h2>
            <p className="text-sm text-gray-400 mb-5">
              Daily brief for fast updates, weekly brief for strategy-level recap.
            </p>
            <NewsletterSignup variant="inline" />
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-cyan-300" />
                <h3 className="font-semibold text-white">Daily Brief</h3>
              </div>
              <p className="text-sm text-gray-500">Top signals and why they matter in under 5 minutes.</p>
            </div>
            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-purple-300" />
                <h3 className="font-semibold text-white">Weekly Brief</h3>
              </div>
              <p className="text-sm text-gray-500">Deeper market perspective across funding, models, and company momentum.</p>
            </div>
            <Link href="/digest" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm">
              Browse digest archive <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <BriefsPreviewPanel />
        </div>
      </section>
    </div>
  );
}

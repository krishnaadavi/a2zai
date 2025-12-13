import { Metadata } from 'next';
import { Calendar, Mail, Clock, ArrowRight, Sparkles, TrendingUp, Brain, FileText } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Weekly AI Digest | A2Z AI',
  description: 'Archive of weekly AI news digests. Catch up on AI developments, model releases, funding rounds, and industry trends.',
};

export const dynamic = 'force-dynamic';

// Helper to generate digest summaries (in production, these would come from the database)
function generateMockDigests() {
  const digests = [];
  const now = new Date();

  // Generate last 12 weeks of digests
  for (let i = 0; i < 12; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (i * 7));

    // Skip future dates
    if (date > now) continue;

    const weekNumber = getWeekNumber(date);
    const year = date.getFullYear();

    digests.push({
      id: `digest-${year}-w${weekNumber}`,
      weekNumber,
      year,
      date: date.toISOString(),
      title: `AI Weekly Digest #${52 - i}`,
      highlights: getHighlightsForWeek(i),
      stats: {
        newsItems: Math.floor(Math.random() * 20) + 30,
        modelsReleased: Math.floor(Math.random() * 5) + 2,
        fundingRounds: Math.floor(Math.random() * 8) + 3,
        researchPapers: Math.floor(Math.random() * 10) + 5,
      },
    });
  }

  return digests;
}

function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getHighlightsForWeek(weeksAgo: number): string[] {
  const allHighlights = [
    ['OpenAI releases GPT-4o mini', 'Anthropic expands Claude 3.5 Sonnet', 'Google announces Gemini 2.0'],
    ['Meta open-sources Llama 3.2', 'Microsoft Copilot gets major update', 'NVIDIA unveils new AI chips'],
    ['xAI raises $6B at $50B valuation', 'Perplexity valued at $9B', 'Runway launches Gen-3 Alpha'],
    ['DeepMind publishes AlphaFold 3', 'Mistral releases new model', 'Cohere raises $500M Series D'],
    ['Apple Intelligence launches', 'Amazon Bedrock adds new models', 'Salesforce Einstein GPT update'],
    ['Stability AI releases SD3.5', 'Hugging Face hits 1M models', 'Together AI raises $106M'],
    ['OpenAI DevDay announcements', 'Claude 3 Opus released', 'Databricks valued at $62B'],
    ['GPT Store launches', 'Gemini Pro available', 'Inflection pivots to enterprise'],
    ['Sora preview released', 'Figure raises $675M', 'Cursor gains momentum'],
    ['World Labs founded', 'Safe Superintelligence raises $1B', 'Physical Intelligence launches'],
    ['Claude Code released', 'Windsurf IDE debuts', 'AI agents go mainstream'],
    ['2024 AI recap', 'Model performance benchmarks', 'AI regulation updates'],
  ];

  return allHighlights[weeksAgo % allHighlights.length] || allHighlights[0];
}

function formatDateRange(date: Date): string {
  const endDate = new Date(date);
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - 6);

  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}

export default async function DigestPage() {
  // In production, fetch from database
  const digests = generateMockDigests();
  const latestDigest = digests[0];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-orange-900/20 to-gray-900 py-8 md:py-12 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
              <Mail className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">Weekly AI Digest</h1>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-8">
            Your weekly roundup of the most important AI news, model releases, funding rounds,
            and research breakthroughs. Never miss what matters.
          </p>

          {/* Subscribe CTA */}
          <div className="max-w-xl">
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      </section>

      {/* Latest Digest Highlight */}
      {latestDigest && (
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/20">
              <div className="flex items-center gap-2 text-orange-400 text-sm mb-3">
                <Sparkles className="h-4 w-4" />
                Latest Issue
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{latestDigest.title}</h2>
              <p className="text-gray-400 mb-4">
                <Calendar className="h-4 w-4 inline mr-1" />
                {formatDateRange(new Date(latestDigest.date))}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-2">This Week&apos;s Highlights</h3>
                <ul className="space-y-1">
                  {latestDigest.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-orange-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{latestDigest.stats.newsItems}</div>
                  <div className="text-xs text-gray-500">News Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{latestDigest.stats.modelsReleased}</div>
                  <div className="text-xs text-gray-500">Models Released</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{latestDigest.stats.fundingRounds}</div>
                  <div className="text-xs text-gray-500">Funding Rounds</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{latestDigest.stats.researchPapers}</div>
                  <div className="text-xs text-gray-500">Research Papers</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Archive */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Digest Archive</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {digests.map((digest) => (
              <div
                key={digest.id}
                className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-orange-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-300">
                    Week {digest.weekNumber}
                  </span>
                  <span className="text-xs text-gray-500">{digest.year}</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{digest.title}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {formatDateRange(new Date(digest.date))}
                </p>

                {/* Mini highlights */}
                <ul className="space-y-1 mb-4">
                  {digest.highlights.slice(0, 2).map((h, idx) => (
                    <li key={idx} className="text-xs text-gray-400 truncate">
                      • {h}
                    </li>
                  ))}
                </ul>

                {/* Mini stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-800">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-purple-400" />
                    {digest.stats.newsItems} news
                  </span>
                  <span className="flex items-center gap-1">
                    <Brain className="h-3 w-3 text-cyan-400" />
                    {digest.stats.modelsReleased} models
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-12 px-4 bg-gray-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Never Miss an Issue</h2>
          <p className="text-gray-400 mb-6">
            Join thousands of AI professionals getting their weekly AI briefing.
            Free, no spam, unsubscribe anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#newsletter"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-500 hover:to-red-500 transition-all font-semibold"
            >
              <Mail className="h-5 w-5" />
              Subscribe Free
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Browse Latest News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

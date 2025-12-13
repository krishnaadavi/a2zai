import { BookOpen, GraduationCap, Search, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import LearningDashboard from '@/components/LearningDashboard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Learn AI | A2Z AI',
  description: 'Your learning hub for understanding AI. Explore our glossary and AI 101 course.',
};

export default async function LearnPage() {
  // Fetch counts for display
  const [glossaryCount, explainerCount] = await Promise.all([
    prisma.glossaryTerm.count(),
    prisma.explainer.count({ where: { published: true } }),
  ]);

  // Fetch a few featured glossary terms
  const featuredTerms = await prisma.glossaryTerm.findMany({
    take: 6,
    orderBy: { term: 'asc' },
    select: { slug: true, term: true, shortDef: true, category: true },
  });

  // Fetch explainers for the course
  const explainers = await prisma.explainer.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    select: { slug: true, title: true, subtitle: true, difficulty: true, readTime: true },
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 py-16 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            Learning Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Understand AI,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              No PhD Required
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Whether you're new to AI or looking to fill gaps in your knowledge,
            we've got you covered with plain-English explanations.
          </p>
        </div>
      </section>

      {/* Progress Dashboard */}
      <section className="py-8 px-4 bg-gray-950 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <LearningDashboard totalGlossary={glossaryCount} totalExplainers={explainerCount} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI 101 Course Card */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-gray-900 rounded-2xl border border-emerald-500/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI 101</h2>
                  <p className="text-emerald-300 text-sm">{explainerCount} lessons • ~30 min total</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                A structured course covering the fundamentals of AI. Start from scratch
                and build a solid foundation.
              </p>

              {/* Course Preview */}
              <div className="space-y-3 mb-6">
                {explainers.slice(0, 3).map((explainer, idx) => (
                  <Link
                    key={explainer.slug}
                    href={`/learn/101/${explainer.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium group-hover:text-emerald-300 transition-colors truncate">
                        {explainer.title}
                      </h3>
                      <p className="text-gray-500 text-xs">{explainer.readTime} min read</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      explainer.difficulty === 'beginner'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {explainer.difficulty}
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/learn/101"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-colors"
              >
                Start Learning <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Glossary Card */}
            <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl border border-purple-500/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Glossary</h2>
                  <p className="text-purple-300 text-sm">{glossaryCount} terms defined</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Quick reference for AI terminology. From "algorithm" to "zero-shot learning",
                we explain it all in plain English.
              </p>

              {/* Featured Terms Preview */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredTerms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/learn/glossary/${term.slug}`}
                    className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm hover:bg-purple-500/20 transition-colors"
                  >
                    {term.term}
                  </Link>
                ))}
              </div>

              <Link
                href="/learn/glossary"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <Search className="h-4 w-4" /> Browse Glossary
              </Link>
            </div>
          </div>

          {/* Why Learn Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-8">Why Understanding AI Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-white font-semibold mb-2">Make Better Decisions</h3>
                <p className="text-gray-400 text-sm">
                  Understand AI capabilities and limitations to evaluate tools and strategies.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="text-white font-semibold mb-2">Speak the Language</h3>
                <p className="text-gray-400 text-sm">
                  Communicate effectively with technical teams and vendors.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-white font-semibold mb-2">Stay Competitive</h3>
                <p className="text-gray-400 text-sm">
                  AI literacy is becoming essential across every industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

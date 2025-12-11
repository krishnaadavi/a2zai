import { GraduationCap, ArrowLeft, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'AI 101 Course | A2Z AI',
  description: 'Learn the fundamentals of AI in plain English. A structured course for beginners.',
};

export default async function AI101Page() {
  const explainers = await prisma.explainer.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  const totalReadTime = explainers.reduce((sum, e) => sum + e.readTime, 0);

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-500/20 text-green-300',
    intermediate: 'bg-yellow-500/20 text-yellow-300',
    advanced: 'bg-red-500/20 text-red-300',
  };

  const categoryColors: Record<string, string> = {
    fundamentals: 'border-blue-500/30',
    models: 'border-purple-500/30',
    applications: 'border-cyan-500/30',
    ethics: 'border-orange-500/30',
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Learn
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">AI 101</h1>
              <p className="text-emerald-300">Your foundation in artificial intelligence</p>
            </div>
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mt-4">
            A structured course that takes you from "what is AI?" to understanding
            how modern AI systems work. No technical background required.
          </p>

          <div className="flex items-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{totalReadTime} min total</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>{explainers.length} lessons</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator could go here in future */}

          <div className="space-y-4">
            {explainers.map((explainer, idx) => (
              <Link
                key={explainer.slug}
                href={`/learn/101/${explainer.slug}`}
                className={`block p-6 rounded-xl bg-gray-900 border-l-4 ${
                  categoryColors[explainer.category] || 'border-gray-500/30'
                } border border-gray-800 hover:border-emerald-500/50 transition-all group`}
              >
                <div className="flex items-start gap-4">
                  {/* Lesson Number */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-300 font-bold text-xl flex-shrink-0">
                    {idx + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          difficultyColors[explainer.difficulty] || 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {explainer.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{explainer.category}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {explainer.title}
                    </h2>
                    {explainer.subtitle && (
                      <p className="text-gray-400 mt-1">{explainer.subtitle}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {explainer.readTime} min read
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-2" />
                </div>
              </Link>
            ))}
          </div>

          {/* Start CTA */}
          {explainers.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                href={`/learn/101/${explainers[0].slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-colors text-lg"
              >
                Start Course <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}

          {/* What You'll Learn */}
          <div className="mt-16 p-8 rounded-2xl bg-gray-900 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">What AI really is (and isn't)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">How machine learning works</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">The technology behind ChatGPT</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">What model parameters mean</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">How to get better AI results</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Important ethical considerations</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

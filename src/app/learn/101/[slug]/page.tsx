import { ArrowLeft, ArrowRight, Clock, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CommentSection from '@/components/CommentSection';
import { ShareButtons } from '@/components/ShareButton';
import ReadTracker from '@/components/ReadTracker';
import ProgressButton from '@/components/ProgressButton';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import NewsletterSignup from '@/components/NewsletterSignup';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const explainer = await prisma.explainer.findUnique({
    where: { slug },
    select: { title: true, subtitle: true },
  });

  if (!explainer) {
    return { title: 'Lesson Not Found | A2Z AI' };
  }

  return {
    title: `${explainer.title} | AI 101 | A2Z AI`,
    description: explainer.subtitle || `Learn about ${explainer.title} in our AI 101 course.`,
  };
}

export default async function ExplainerPage({ params }: Props) {
  const { slug } = await params;

  const explainer = await prisma.explainer.findUnique({
    where: { slug },
  });

  if (!explainer || !explainer.published) {
    notFound();
  }

  // Get all explainers for navigation
  const allExplainers = await prisma.explainer.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    select: { slug: true, title: true, order: true },
  });

  const currentIndex = allExplainers.findIndex((e) => e.slug === slug);
  const prevExplainer = currentIndex > 0 ? allExplainers[currentIndex - 1] : null;
  const nextExplainer = currentIndex < allExplainers.length - 1 ? allExplainers[currentIndex + 1] : null;

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    advanced: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const pageUrl = `https://a2zai.ai/learn/101/${explainer.slug}`;

  return (
    <div className="min-h-screen bg-gray-950">
      <ArticleJsonLd
        title={explainer.title}
        description={explainer.subtitle || `Learn about ${explainer.title} in our AI 101 course.`}
        url={pageUrl}
        datePublished={explainer.createdAt?.toISOString()}
        dateModified={explainer.updatedAt?.toISOString()}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://a2zai.ai' },
          { name: 'Learn', url: 'https://a2zai.ai/learn' },
          { name: 'AI 101', url: 'https://a2zai.ai/learn/101' },
          { name: explainer.title, url: pageUrl },
        ]}
      />
      <ReadTracker articleId={explainer.slug} articleType="explainer" />
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/learn/101"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to AI 101
          </Link>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-gray-500 text-sm">
              Lesson {currentIndex + 1} of {allExplainers.length}
            </span>
            <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / allExplainers.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex-shrink-0">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs px-2 py-1 rounded border ${
                    difficultyColors[explainer.difficulty] || 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {explainer.difficulty}
                </span>
                <span className="text-xs text-gray-500">{explainer.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{explainer.title}</h1>
              {explainer.subtitle && (
                <p className="text-gray-300 text-lg mt-2">{explainer.subtitle}</p>
              )}
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{explainer.readTime} min read</span>
                </div>
                <ProgressButton contentType="explainer" contentId={explainer.slug} />
                <ShareButtons
                  url={`https://a2zai.ai/learn/101/${explainer.slug}`}
                  title={`${explainer.title} | AI 101 | A2Z AI`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <article className="bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8">
            <MarkdownRenderer content={explainer.content} />
          </article>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mt-8">
            {prevExplainer ? (
              <Link
                href={`/learn/101/${prevExplainer.slug}`}
                className="flex-1 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-emerald-500/50 transition-colors group"
              >
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <ArrowLeft className="h-4 w-4" /> Previous
                </div>
                <span className="text-white font-medium group-hover:text-emerald-300 transition-colors">
                  {prevExplainer.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextExplainer ? (
              <Link
                href={`/learn/101/${nextExplainer.slug}`}
                className="flex-1 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 hover:border-emerald-500/50 transition-colors group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-emerald-400 text-sm mb-1">
                  Next <ArrowRight className="h-4 w-4" />
                </div>
                <span className="text-white font-medium group-hover:text-emerald-300 transition-colors">
                  {nextExplainer.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/learn"
                className="flex-1 p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-center text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-colors"
              >
                Course Complete! Back to Learn Hub
              </Link>
            )}
          </div>

          {/* Newsletter CTA */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 rounded-xl border border-emerald-500/20 p-6 mt-8 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Enjoying the course?</h3>
            <p className="text-gray-400 text-sm mb-4">Get notified when we add new lessons and AI updates.</p>
            <NewsletterSignup variant="inline" />
          </div>

          {/* Comments */}
          <CommentSection articleId={explainer.slug} articleType="explainer" />

          {/* Course outline */}
          <div className="mt-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Course Outline</h3>
            <div className="space-y-2">
              {allExplainers.map((exp, idx) => (
                <Link
                  key={exp.slug}
                  href={`/learn/101/${exp.slug}`}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    exp.slug === slug
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'hover:bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded text-xs font-medium ${
                      exp.slug === slug
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-sm">{exp.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

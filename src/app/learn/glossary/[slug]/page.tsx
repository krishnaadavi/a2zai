import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CommentSection from '@/components/CommentSection';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const term = await prisma.glossaryTerm.findUnique({
    where: { slug },
    select: { term: true, shortDef: true },
  });

  if (!term) {
    return { title: 'Term Not Found | A2Z AI' };
  }

  return {
    title: `${term.term} | AI Glossary | A2Z AI`,
    description: term.shortDef,
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;

  const term = await prisma.glossaryTerm.findUnique({
    where: { slug },
  });

  if (!term) {
    notFound();
  }

  // Fetch related terms
  const relatedTerms = term.relatedTerms.length > 0
    ? await prisma.glossaryTerm.findMany({
        where: { slug: { in: term.relatedTerms } },
        select: { slug: true, term: true, shortDef: true },
      })
    : [];

  const categoryColors: Record<string, string> = {
    concepts: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    techniques: 'bg-green-500/20 text-green-300 border-green-500/30',
    models: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    companies: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/learn/glossary"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Glossary
          </Link>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex-shrink-0">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <span
                className={`inline-block text-xs px-2 py-1 rounded border mb-2 ${
                  categoryColors[term.category] || 'bg-gray-700 text-gray-300 border-gray-600'
                }`}
              >
                {term.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{term.term}</h1>
              <p className="text-gray-300 text-lg mt-2">{term.shortDef}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Full Definition */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Definition</h2>
            <div className="prose prose-invert prose-gray max-w-none">
              {term.fullDef.split('\n\n').map((paragraph, idx) => {
                // Handle bullet lists
                if (paragraph.includes('- **')) {
                  const items = paragraph.split('\n').filter(Boolean);
                  return (
                    <ul key={idx} className="space-y-2 text-gray-300">
                      {items.map((item, i) => {
                        const match = item.match(/- \*\*(.+?)\*\*:?\s*(.+)?/);
                        if (match) {
                          return (
                            <li key={i}>
                              <strong className="text-white">{match[1]}</strong>
                              {match[2] && `: ${match[2]}`}
                            </li>
                          );
                        }
                        return <li key={i}>{item.replace(/^- /, '')}</li>;
                      })}
                    </ul>
                  );
                }
                // Handle headings
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={idx} className="text-lg font-semibold text-white mt-6 mb-2">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                // Regular paragraph with bold text handling
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={idx} className="text-gray-300 mb-4">
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={i} className="text-white">
                            {part.replace(/\*\*/g, '')}
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Examples */}
          {term.examples && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Examples</h2>
              <p className="text-gray-300">{term.examples}</p>
            </div>
          )}

          {/* Related Terms */}
          {relatedTerms.length > 0 && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Related Terms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {relatedTerms.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/learn/glossary/${related.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                  >
                    <div>
                      <span className="text-white font-medium group-hover:text-purple-300 transition-colors">
                        {related.term}
                      </span>
                      <p className="text-gray-500 text-xs line-clamp-1">{related.shortDef}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-purple-400 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <CommentSection articleId={term.slug} articleType="glossary" />

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-800">
            <Link
              href="/learn/glossary"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Browse all terms
            </Link>
            <Link
              href="/learn/101"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
            >
              Take AI 101 Course <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

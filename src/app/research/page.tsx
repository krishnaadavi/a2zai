import { Metadata } from 'next';
import { BookOpen, FileText, Users, Calendar, ExternalLink } from 'lucide-react';
import { fetchLatestPapers } from '@/lib/arxiv';

export const metadata: Metadata = {
    title: 'AI Research | A2Z AI',
    description: 'Latest AI and machine learning research papers from arXiv. Stay up to date with cutting-edge research.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function ResearchPage() {
    const papers = await fetchLatestPapers(15);

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 py-12 px-4 border-b border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">AI Research</h1>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Latest research papers from arXiv covering machine learning,
                        computer vision, natural language processing, and more.
                    </p>
                </div>
            </section>

            {/* Papers List */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {papers.map((paper) => (
                            <article
                                key={paper.id}
                                className="group p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-emerald-500/50 transition-all"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <span className="flex-shrink-0 px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs">
                                        arXiv
                                    </span>
                                    <a
                                        href={paper.arxivUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-emerald-400 text-sm hover:underline"
                                    >
                                        <FileText className="h-4 w-4" />
                                        PDF
                                    </a>
                                </div>

                                {/* Title */}
                                <a
                                    href={paper.arxivUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <h2 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors mb-3">
                                        {paper.title}
                                    </h2>
                                </a>

                                {/* Summary */}
                                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                    {paper.summary}
                                </p>

                                {/* Meta */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>
                                            {paper.authors.slice(0, 3).join(', ')}
                                            {paper.authors.length > 3 && ` +${paper.authors.length - 3} more`}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {new Date(paper.publishedAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Source Attribution */}
                    <div className="text-center mt-12">
                        <p className="text-gray-500 text-sm">
                            Data from <a href="https://arxiv.org" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">arXiv.org</a> • Updated hourly
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

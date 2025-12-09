import { Metadata } from 'next';
import { Brain, TrendingUp, Download, ExternalLink, Search } from 'lucide-react';
import { fetchTrendingModels } from '@/lib/huggingface';

export const metadata: Metadata = {
    title: 'AI Models | A2Z AI',
    description: 'Discover trending AI models from HuggingFace. Browse LLMs, image models, and more.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function ModelsPage() {
    const models = await fetchTrendingModels(20);

    // Group by type for stats
    const types = models.reduce((acc, model) => {
        acc[model.type] = (acc[model.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 via-cyan-900/20 to-gray-900 py-12 px-4 border-b border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">AI Models</h1>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Discover trending AI models from HuggingFace Hub. Find the latest in LLMs,
                        image generation, and multimodal AI.
                    </p>

                    {/* Type Pills */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {Object.entries(types).map(([type, count]) => (
                            <span
                                key={type}
                                className="px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-300"
                            >
                                {type} <span className="text-cyan-400">({count})</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Models Grid */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {models.map((model) => (
                            <a
                                key={model.name}
                                href={model.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/50 transition-all hover:scale-[1.02]"
                            >
                                {/* Type & Trend */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs">
                                        {model.type}
                                    </span>
                                    <span className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                                        <TrendingUp className="h-3 w-3" />
                                        {model.trend}
                                    </span>
                                </div>

                                {/* Name */}
                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                                    {model.name}
                                </h3>

                                {/* Provider */}
                                <p className="text-gray-500 text-sm mt-1">
                                    by {model.provider}
                                </p>

                                {/* Downloads */}
                                <div className="flex items-center gap-2 mt-auto pt-4 text-gray-500 text-sm">
                                    <Download className="h-4 w-4" />
                                    <span>{model.downloads} downloads</span>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Source Attribution */}
                    <div className="text-center mt-12">
                        <p className="text-gray-500 text-sm">
                            Data from <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">HuggingFace Hub</a> • Updated hourly
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

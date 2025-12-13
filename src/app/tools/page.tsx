'use client';

import { useState, useMemo } from 'react';
import {
  Wrench,
  ExternalLink,
  Search,
  Star,
  TrendingUp,
  MessageSquare,
  PenTool,
  Image,
  Video,
  Music,
  Code,
  Zap,
  Palette,
  Briefcase,
  BarChart,
  Terminal,
  Filter,
  X,
} from 'lucide-react';
import Link from 'next/link';
import {
  AI_TOOLS,
  TOOL_CATEGORIES,
  getPopularTools,
  getTrendingTools,
  type AITool,
} from '@/lib/tools-data';

const ICON_MAP: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare className="h-5 w-5" />,
  PenTool: <PenTool className="h-5 w-5" />,
  Image: <Image className="h-5 w-5" />,
  Video: <Video className="h-5 w-5" />,
  Music: <Music className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Search: <Search className="h-5 w-5" />,
  Palette: <Palette className="h-5 w-5" />,
  Briefcase: <Briefcase className="h-5 w-5" />,
  BarChart: <BarChart className="h-5 w-5" />,
  Terminal: <Terminal className="h-5 w-5" />,
};

function PricingBadge({ pricing }: { pricing: AITool['pricing'] }) {
  const colors = {
    Free: 'bg-green-500/20 text-green-300',
    'Open Source': 'bg-blue-500/20 text-blue-300',
    Freemium: 'bg-yellow-500/20 text-yellow-300',
    Paid: 'bg-gray-700 text-gray-300',
    Enterprise: 'bg-purple-500/20 text-purple-300',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded ${colors[pricing]}`}>
      {pricing}
    </span>
  );
}

function ToolCard({ tool }: { tool: AITool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {tool.name}
            </h3>
            {tool.trending && (
              <span title="Trending">
                <TrendingUp className="h-4 w-4 text-orange-400" />
              </span>
            )}
            {tool.popular && !tool.trending && (
              <span title="Popular">
                <Star className="h-4 w-4 text-yellow-400" />
              </span>
            )}
          </div>
          <p className="text-sm text-cyan-400">{tool.tagline}</p>
        </div>
        <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{tool.description}</p>

      {/* Features */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.features.slice(0, 3).map((feature) => (
          <span
            key={feature}
            className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400"
          >
            {feature}
          </span>
        ))}
        {tool.features.length > 3 && (
          <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-500">
            +{tool.features.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <PricingBadge pricing={tool.pricing} />
        {tool.pricingDetail && (
          <span className="text-xs text-gray-500">{tool.pricingDetail}</span>
        )}
      </div>
    </a>
  );
}

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredTools = useMemo(() => {
    let tools = [...AI_TOOLS];

    if (selectedCategory) {
      tools = tools.filter((t) => t.category === selectedCategory);
    }

    if (selectedPricing) {
      tools = tools.filter((t) => t.pricing === selectedPricing);
    }

    if (showFreeOnly) {
      tools = tools.filter((t) => t.pricing === 'Free' || t.pricing === 'Open Source');
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    return tools;
  }, [selectedCategory, selectedPricing, searchQuery, showFreeOnly]);

  const popularTools = getPopularTools();
  const trendingTools = getTrendingTools();

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedPricing(null);
    setShowFreeOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory || selectedPricing || showFreeOnly || searchQuery;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-cyan-900/20 to-gray-900 py-8 md:py-12 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
              <Wrench className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">AI Tools Directory</h1>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-6">
            Discover the best AI tools for every use case. From chatbots to code assistants,
            image generators to productivity apps.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
              <Wrench className="h-4 w-4 text-cyan-400" />
              <span className="text-gray-300">{AI_TOOLS.length} tools</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
              <span className="text-gray-300">{TOOL_CATEGORIES.length} categories</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              <span className="text-gray-300">{trendingTools.length} trending</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-6 px-4 border-b border-gray-800 overflow-x-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-white'
              }`}
            >
              All Tools
            </button>
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                {ICON_MAP[cat.icon]}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Row */}
      <section className="py-4 px-4 border-b border-gray-800 sticky top-16 bg-gray-950/95 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search tools, features, use cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 text-sm"
              />
            </div>

            {/* Pricing Filter */}
            <select
              value={selectedPricing || ''}
              onChange={(e) => setSelectedPricing(e.target.value || null)}
              className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50"
            >
              <option value="">All Pricing</option>
              <option value="Free">Free</option>
              <option value="Open Source">Open Source</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            {/* Free Only Toggle */}
            <button
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showFreeOnly
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-white'
              }`}
            >
              Free Only
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      {!hasActiveFilters && (
        <section className="py-8 px-4 border-b border-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-400" />
              Trending Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingTools.slice(0, 4).map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Tools Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {hasActiveFilters
                ? `${filteredTools.length} Results`
                : selectedCategory
                ? TOOL_CATEGORIES.find((c) => c.id === selectedCategory)?.name
                : 'All Tools'}
            </h2>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No tools match your filters.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
      {!hasActiveFilters && (
        <section className="py-8 px-4 bg-gray-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {TOOL_CATEGORIES.map((cat) => {
                const count = AI_TOOLS.filter((t) => t.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/30 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                        {ICON_MAP[cat.icon]}
                      </div>
                      <span className="text-white font-medium">{cat.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                    <p className="text-xs text-cyan-400 mt-2">{count} tools</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated on AI Tools</h2>
          <p className="text-gray-400 mb-6">
            Get weekly updates on the latest AI tools, features, and trends delivered to your inbox.
          </p>
          <Link
            href="/#newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all font-semibold"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  );
}

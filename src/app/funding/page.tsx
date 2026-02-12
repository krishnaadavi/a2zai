'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Building2,
  MapPin,
  ExternalLink,
  Filter,
  Search,
  Rocket,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import {
  type FundingRound,
} from '@/lib/funding-data';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function formatAmount(amountNum: number): string {
  if (amountNum >= 1000) {
    return `$${(amountNum / 1000).toFixed(1)}B`;
  }
  return `$${amountNum}M`;
}

export default function FundingPage() {
  const [rounds, setRounds] = useState<FundingRound[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [roundTypes, setRoundTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRoundType, setSelectedRoundType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  useEffect(() => {
    const loadFunding = async () => {
      try {
        const res = await fetch('/api/funding?limit=500', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          setRounds(data.data || []);
          setCategories(data.categories || []);
          setRoundTypes(data.roundTypes || []);
        }
      } catch (error) {
        console.error('Failed to load funding data:', error);
      } finally {
        setLoading(false);
      }
    };
    void loadFunding();
  }, []);

  // Filter and sort rounds
  const filteredRounds = useMemo(() => {
    let filtered = [...rounds];

    if (selectedCategory) {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    if (selectedRoundType) {
      filtered = filtered.filter((r) => r.round === selectedRoundType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.company.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.investors.some((i) => i.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      filtered.sort((a, b) => b.amountNum - a.amountNum);
    }

    return filtered;
  }, [rounds, selectedCategory, selectedRoundType, searchQuery, sortBy]);

  // Stats
  const totalFunding = useMemo(
    () => rounds.reduce((sum, r) => sum + r.amountNum, 0),
    [rounds]
  );
  const totalDeals = rounds.length;
  const avgDealSize = totalDeals > 0 ? totalFunding / totalDeals : 0;
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    rounds.forEach((round) => {
      totals[round.category] = (totals[round.category] || 0) + round.amountNum;
    });
    return totals;
  }, [rounds]);
  const topRounds = useMemo(
    () => [...rounds].sort((a, b) => b.amountNum - a.amountNum).slice(0, 5),
    [rounds]
  );

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedRoundType(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory || selectedRoundType || searchQuery;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 py-8 md:py-12 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg">
              <Rocket className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">AI Startup Funding</h1>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-8">
            Track the latest funding rounds, valuations, and investors in the AI industry.
            From seed to IPO, stay informed on where the money flows.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <DollarSign className="h-4 w-4" />
                Total Raised
              </div>
              <div className="text-2xl font-bold text-white">{formatAmount(totalFunding)}</div>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Building2 className="h-4 w-4" />
                Deals Tracked
              </div>
              <div className="text-2xl font-bold text-white">{totalDeals}</div>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <TrendingUp className="h-4 w-4" />
                Avg Deal Size
              </div>
              <div className="text-2xl font-bold text-white">{formatAmount(Math.round(avgDealSize))}</div>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Calendar className="h-4 w-4" />
                Latest Round
              </div>
              <div className="text-2xl font-bold text-white">
                {filteredRounds[0] ? formatDate(filteredRounds[0].date) : '-'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search companies, investors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 text-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Round Type Filter */}
            <select
              value={selectedRoundType || ''}
              onChange={(e) => setSelectedRoundType(e.target.value || null)}
              className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
            >
              <option value="">All Rounds</option>
              {roundTypes.map((round) => (
                <option key={round} value={round}>
                  {round}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
              className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
            >
              <option value="date">Latest First</option>
              <option value="amount">Largest First</option>
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Funding Rounds List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {loading
                    ? 'Loading funding rounds...'
                    : hasActiveFilters
                    ? `${filteredRounds.length} Results`
                    : 'Recent Funding Rounds'}
                </h2>
              </div>

              <div className="space-y-4">
                {filteredRounds.map((round) => (
                  <div
                    key={round.id}
                    className="p-5 bg-gray-900 rounded-xl border border-gray-800 hover:border-emerald-500/30 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-white">{round.company}</h3>
                          {round.website && (
                            <a
                              href={round.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-emerald-400 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{round.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-emerald-400">{round.amount}</div>
                        <div className="text-xs text-gray-500">{round.round}</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded">
                        {round.category}
                      </span>
                      {round.valuation && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                          {round.valuation} valuation
                        </span>
                      )}
                      <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {round.headquarters}
                      </span>
                    </div>

                    {/* Investors */}
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-500">Investors:</span>
                      <span className="text-gray-300">{round.investors.slice(0, 4).join(', ')}</span>
                      {round.investors.length > 4 && (
                        <span className="text-gray-500">+{round.investors.length - 4} more</span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-800">
                      <Calendar className="h-3 w-3" />
                      {formatDate(round.date)}
                    </div>
                  </div>
                ))}
              </div>

              {filteredRounds.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No funding rounds match your filters.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Rounds */}
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  Largest Rounds
                </h3>
                <div className="space-y-3">
                  {topRounds.map((round, idx) => (
                    <div
                      key={round.id}
                      className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm w-4">{idx + 1}</span>
                        <div>
                          <span className="text-white font-medium text-sm">{round.company}</span>
                          <span className="text-gray-500 text-xs block">{round.round}</span>
                        </div>
                      </div>
                      <span className="text-emerald-400 font-bold">{round.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-400" />
                  By Category
                </h3>
                <div className="space-y-2">
                  {Object.entries(categoryTotals)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, total]) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'hover:bg-gray-800 text-gray-300'
                        }`}
                      >
                        <span>{category}</span>
                        <span className="text-gray-500">{formatAmount(total)}</span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 rounded-xl border border-emerald-500/20 p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Get the latest AI funding news delivered to your inbox.
                </p>
                <Link
                  href="/#newsletter"
                  className="block w-full text-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type GlossaryTerm = {
  slug: string;
  term: string;
  shortDef: string;
  category: string;
};

const CATEGORIES = [
  { id: 'all', label: 'All Terms' },
  { id: 'concepts', label: 'Concepts' },
  { id: 'techniques', label: 'Techniques' },
  { id: 'models', label: 'Models' },
  { id: 'companies', label: 'Companies' },
];

export default function GlossaryPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTerms() {
      try {
        const res = await fetch('/api/glossary');
        const data = await res.json();
        if (data.success) {
          setTerms(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch glossary:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTerms();
  }, []);

  // Filter terms based on search, category, and letter
  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesSearch =
        searchQuery === '' ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.shortDef.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || term.category === selectedCategory;

      const matchesLetter =
        !selectedLetter ||
        term.term.charAt(0).toUpperCase() === selectedLetter;

      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [terms, searchQuery, selectedCategory, selectedLetter]);

  // Get available letters from terms
  const availableLetters = useMemo(() => {
    const letters = new Set(terms.map((t) => t.term.charAt(0).toUpperCase()));
    return Array.from(letters).sort();
  }, [terms]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const categoryColors: Record<string, string> = {
    concepts: 'bg-blue-500/20 text-blue-300',
    techniques: 'bg-green-500/20 text-green-300',
    models: 'bg-purple-500/20 text-purple-300',
    companies: 'bg-orange-500/20 text-orange-300',
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Learn
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Glossary</h1>
              <p className="text-purple-300 text-sm">{terms.length} terms defined</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Alphabet Navigation */}
          <div className="flex flex-wrap gap-1 mt-4">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                !selectedLetter
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                disabled={!availableLetters.includes(letter)}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  selectedLetter === letter
                    ? 'bg-purple-500 text-white'
                    : availableLetters.includes(letter)
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    : 'bg-gray-900 text-gray-700 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Terms List */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse p-4 rounded-xl bg-gray-900">
                  <div className="h-5 w-48 bg-gray-800 rounded mb-2" />
                  <div className="h-4 w-full bg-gray-800 rounded" />
                </div>
              ))}
            </div>
          ) : filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No terms found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLetter(null);
                }}
                className="mt-4 text-purple-400 hover:text-purple-300"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedTerms)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([letter, letterTerms]) => (
                  <div key={letter}>
                    <h2 className="text-2xl font-bold text-purple-400 mb-4 sticky top-0 bg-gray-950 py-2">
                      {letter}
                    </h2>
                    <div className="space-y-3">
                      {letterTerms.map((term) => (
                        <Link
                          key={term.slug}
                          href={`/learn/glossary/${term.slug}`}
                          className="block p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                                {term.term}
                              </h3>
                              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                {term.shortDef}
                              </p>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                                categoryColors[term.category] || 'bg-gray-700 text-gray-300'
                              }`}
                            >
                              {term.category}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronDown, Calendar, Filter } from 'lucide-react';

interface NewsFiltersProps {
  categories: string[];
  sources: string[];
  selectedCategory: string | null;
  selectedSource: string | null;
  selectedDateRange: string | null;
  searchQuery: string;
  onCategoryChange: (category: string | null) => void;
  onSourceChange: (source: string | null) => void;
  onDateRangeChange: (range: string | null) => void;
  onSearchChange: (query: string) => void;
}

const DATE_RANGES = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
];

export default function NewsFilters({
  categories,
  sources,
  selectedCategory,
  selectedSource,
  selectedDateRange,
  searchQuery,
  onCategoryChange,
  onSourceChange,
  onDateRangeChange,
  onSearchChange,
}: NewsFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const sourceRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sourceRef.current && !sourceRef.current.contains(event.target as Node)) {
        setShowSourceDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters = selectedCategory || selectedSource || selectedDateRange || searchQuery;

  const clearAllFilters = () => {
    onCategoryChange(null);
    onSourceChange(null);
    onDateRangeChange(null);
    onSearchChange('');
    setLocalSearch('');
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search news..."
          className="w-full pl-12 pr-10 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {localSearch && (
          <button
            onClick={() => {
              setLocalSearch('');
              onSearchChange('');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !selectedCategory
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category === selectedCategory ? null : category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-gray-800" />

        {/* Source Dropdown */}
        <div className="relative" ref={sourceRef}>
          <button
            onClick={() => {
              setShowSourceDropdown(!showSourceDropdown);
              setShowDateDropdown(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedSource
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Filter className="h-4 w-4" />
            {selectedSource || 'Source'}
            <ChevronDown className={`h-4 w-4 transition-transform ${showSourceDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showSourceDropdown && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
              <button
                onClick={() => {
                  onSourceChange(null);
                  setShowSourceDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                  !selectedSource ? 'text-purple-400' : 'text-gray-300'
                }`}
              >
                All Sources
              </button>
              {sources.map((source) => (
                <button
                  key={source}
                  onClick={() => {
                    onSourceChange(source);
                    setShowSourceDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                    selectedSource === source ? 'text-purple-400' : 'text-gray-300'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Dropdown */}
        <div className="relative" ref={dateRef}>
          <button
            onClick={() => {
              setShowDateDropdown(!showDateDropdown);
              setShowSourceDropdown(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedDateRange
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Calendar className="h-4 w-4" />
            {DATE_RANGES.find((r) => r.id === selectedDateRange)?.label || 'Date'}
            <ChevronDown className={`h-4 w-4 transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDateDropdown && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 z-50">
              <button
                onClick={() => {
                  onDateRangeChange(null);
                  setShowDateDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                  !selectedDateRange ? 'text-purple-400' : 'text-gray-300'
                }`}
              >
                All Time
              </button>
              {DATE_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => {
                    onDateRangeChange(range.id);
                    setShowDateDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                    selectedDateRange === range.id ? 'text-purple-400' : 'text-gray-300'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

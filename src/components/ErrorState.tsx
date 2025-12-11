'use client';

import { AlertTriangle, RefreshCw, Home, WifiOff } from 'lucide-react';
import Link from 'next/link';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeLink?: boolean;
  variant?: 'default' | 'network' | 'notFound' | 'empty';
}

export default function ErrorState({
  title,
  message,
  onRetry,
  showHomeLink = false,
  variant = 'default',
}: ErrorStateProps) {
  const variants = {
    default: {
      icon: AlertTriangle,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      defaultTitle: 'Something went wrong',
      defaultMessage: 'We encountered an error while loading this content.',
    },
    network: {
      icon: WifiOff,
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      defaultTitle: 'Connection error',
      defaultMessage: 'Please check your internet connection and try again.',
    },
    notFound: {
      icon: AlertTriangle,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      defaultTitle: 'Not found',
      defaultMessage: "The content you're looking for doesn't exist or has been moved.",
    },
    empty: {
      icon: AlertTriangle,
      iconColor: 'text-gray-400',
      bgColor: 'bg-gray-500/10',
      defaultTitle: 'No results',
      defaultMessage: 'No content matches your current filters.',
    },
  };

  const { icon: Icon, iconColor, bgColor, defaultTitle, defaultMessage } = variants[variant];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className={`p-4 rounded-full ${bgColor} mb-6`}>
        <Icon className={`h-12 w-12 ${iconColor}`} />
      </div>

      <h2 className="text-xl font-semibold text-white mb-2">{title || defaultTitle}</h2>

      <p className="text-gray-400 max-w-md mb-8">{message || defaultMessage}</p>

      <div className="flex flex-wrap gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}

        {showHomeLink && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        )}
      </div>
    </div>
  );
}

// Empty state specifically for filtered results
export function EmptyFilterState({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 rounded-full bg-gray-800 mb-6">
        <AlertTriangle className="h-12 w-12 text-gray-500" />
      </div>

      <h2 className="text-xl font-semibold text-white mb-2">No matching results</h2>

      <p className="text-gray-400 max-w-md mb-8">
        Try adjusting your filters or search terms to find what you&apos;re looking for.
      </p>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

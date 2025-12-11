'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bookmark, Loader2 } from 'lucide-react';

type Props = {
  articleId: string;
  title: string;
  url: string;
  source: string; // 'news', 'research', 'model'
  initialSaved?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

export default function SaveArticleButton({
  articleId,
  title,
  url,
  source,
  initialSaved = false,
  size = 'md',
  className = '',
}: Props) {
  const sessionData = useSession();
  const session = sessionData?.data;
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      // Could show a sign-in modal here
      return;
    }

    setIsLoading(true);

    try {
      if (isSaved) {
        // Remove from saved
        const res = await fetch(`/api/user/saved?articleId=${encodeURIComponent(articleId)}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setIsSaved(false);
        }
      } else {
        // Add to saved
        const res = await fetch('/api/user/saved', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ articleId, title, url, source }),
        });
        if (res.ok) {
          setIsSaved(true);
        }
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const buttonClasses = size === 'sm' ? 'p-1.5' : 'p-2';

  // Don't render for non-authenticated users (or render disabled)
  if (!session) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`${buttonClasses} rounded-lg transition-colors ${
        isSaved
          ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
          : 'bg-gray-800/50 text-gray-500 hover:bg-gray-800 hover:text-gray-300'
      } ${className}`}
      title={isSaved ? 'Remove from saved' : 'Save article'}
      aria-label={isSaved ? 'Remove from saved' : 'Save article'}
    >
      {isLoading ? (
        <Loader2 className={`${sizeClasses} animate-spin`} />
      ) : (
        <Bookmark className={`${sizeClasses} ${isSaved ? 'fill-current' : ''}`} />
      )}
    </button>
  );
}

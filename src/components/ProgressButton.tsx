'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Check, Circle, Loader2, BookOpen } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

type ContentType = 'glossary' | 'explainer' | 'course';

interface ProgressButtonProps {
  contentType: ContentType;
  contentId: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function ProgressButton({
  contentType,
  contentId,
  size = 'md',
  showLabel = true,
}: ProgressButtonProps) {
  const { data: session } = useSession();
  const { isCompleted, isStarted, markProgress } = useProgress();
  const [loading, setLoading] = useState(false);

  if (!session?.user) {
    return null;
  }

  const completed = isCompleted(contentId, contentType);
  const started = isStarted(contentId, contentType);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (completed) {
        // Already completed - could reset, but for now do nothing
        return;
      }
      await markProgress(contentId, contentType, 'completed');
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  if (completed) {
    return (
      <div
        className={`inline-flex items-center ${sizeClasses[size]} bg-green-500/20 text-green-400 rounded-lg font-medium`}
      >
        <Check className={iconSizes[size]} />
        {showLabel && <span>Completed</span>}
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center ${sizeClasses[size]} bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg font-medium transition-colors disabled:opacity-50`}
    >
      {loading ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : started ? (
        <Circle className={iconSizes[size]} />
      ) : (
        <BookOpen className={iconSizes[size]} />
      )}
      {showLabel && <span>{started ? 'Mark Complete' : 'Mark as Read'}</span>}
    </button>
  );
}

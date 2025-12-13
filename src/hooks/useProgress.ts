'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

type ContentType = 'glossary' | 'explainer' | 'course';
type Status = 'started' | 'completed';

interface ProgressItem {
  id: string;
  contentType: ContentType;
  contentId: string;
  status: Status;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProgressStats {
  glossary: { completed: number; started: number };
  explainer: { completed: number; started: number };
  course: { completed: number; started: number };
}

export function useProgress(contentType?: ContentType) {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!session?.user) {
      setProgress([]);
      setStats(null);
      setLoading(false);
      return;
    }

    try {
      const url = contentType
        ? `/api/user/progress?type=${contentType}`
        : '/api/user/progress';
      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setProgress(data.data);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    } finally {
      setLoading(false);
    }
  }, [session?.user, contentType]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markProgress = useCallback(
    async (contentId: string, type: ContentType, status: Status) => {
      if (!session?.user) return false;

      try {
        const res = await fetch('/api/user/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentType: type, contentId, status }),
        });

        const data = await res.json();

        if (data.success) {
          // Optimistically update local state
          setProgress((prev) => {
            const existing = prev.find(
              (p) => p.contentType === type && p.contentId === contentId
            );
            if (existing) {
              return prev.map((p) =>
                p.contentType === type && p.contentId === contentId
                  ? { ...p, status, completedAt: status === 'completed' ? new Date().toISOString() : null }
                  : p
              );
            }
            return [...prev, data.data];
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error('Failed to update progress:', error);
        return false;
      }
    },
    [session?.user]
  );

  const getProgress = useCallback(
    (contentId: string, type: ContentType): Status | null => {
      const item = progress.find(
        (p) => p.contentType === type && p.contentId === contentId
      );
      return item?.status || null;
    },
    [progress]
  );

  const isCompleted = useCallback(
    (contentId: string, type: ContentType): boolean => {
      return getProgress(contentId, type) === 'completed';
    },
    [getProgress]
  );

  const isStarted = useCallback(
    (contentId: string, type: ContentType): boolean => {
      const status = getProgress(contentId, type);
      return status === 'started' || status === 'completed';
    },
    [getProgress]
  );

  return {
    progress,
    stats,
    loading,
    markProgress,
    getProgress,
    isCompleted,
    isStarted,
    refetch: fetchProgress,
  };
}

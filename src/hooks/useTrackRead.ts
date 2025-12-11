'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

type ArticleType = 'news' | 'glossary' | 'explainer' | 'research' | 'model';

export function useTrackRead(articleId: string, articleType: ArticleType) {
  const { status } = useSession();
  const tracked = useRef(false);

  useEffect(() => {
    // Only track if authenticated and not already tracked this session
    if (status !== 'authenticated' || tracked.current) return;

    // Mark as tracked to prevent duplicate calls
    tracked.current = true;

    // Track the read after a short delay (ensures user actually viewed the page)
    const timer = setTimeout(() => {
      fetch('/api/user/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, articleType }),
      }).catch((err) => {
        console.error('Failed to track read:', err);
      });
    }, 2000); // 2 second delay to ensure actual engagement

    return () => clearTimeout(timer);
  }, [articleId, articleType, status]);
}

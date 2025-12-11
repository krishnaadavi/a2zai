'use client';

import { useTrackRead } from '@/hooks/useTrackRead';

type ArticleType = 'news' | 'glossary' | 'explainer' | 'research' | 'model';

interface ReadTrackerProps {
  articleId: string;
  articleType: ArticleType;
}

export default function ReadTracker({ articleId, articleType }: ReadTrackerProps) {
  useTrackRead(articleId, articleType);
  return null; // This component doesn't render anything
}

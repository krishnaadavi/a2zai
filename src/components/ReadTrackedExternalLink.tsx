'use client';

import { trackEvent } from '@/lib/track-event';

type ArticleType = 'news' | 'glossary' | 'explainer' | 'research' | 'model' | 'funding';

type ReadTrackedExternalLinkProps = {
  href: string;
  articleId: string;
  articleType: ArticleType;
  className?: string;
  children: React.ReactNode;
  eventName?: string;
  eventParams?: Record<string, string | number>;
};

function trackRead(articleId: string, articleType: ArticleType) {
  const payload = JSON.stringify({ articleId, articleType });

  // Use sendBeacon when possible for better delivery on navigation.
  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon('/api/user/history', blob);
    return;
  }

  fetch('/api/user/history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

export default function ReadTrackedExternalLink({
  href,
  articleId,
  articleType,
  className,
  children,
  eventName,
  eventParams,
}: ReadTrackedExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        trackRead(articleId, articleType);
        if (eventName) {
          trackEvent(eventName, eventParams);
        }
      }}
    >
      {children}
    </a>
  );
}

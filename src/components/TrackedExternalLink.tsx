'use client';

import { trackEvent } from '@/lib/track-event';

type TrackedExternalLinkProps = {
  href: string;
  eventName: string;
  eventParams?: Record<string, string | number>;
  className?: string;
  children: React.ReactNode;
};

export default function TrackedExternalLink({
  href,
  eventName,
  eventParams,
  className,
  children,
}: TrackedExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </a>
  );
}

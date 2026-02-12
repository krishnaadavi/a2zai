'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/track-event';

type TrackedLinkProps = {
  href: string;
  eventName: string;
  eventParams?: Record<string, string | number>;
  className?: string;
  children: React.ReactNode;
};

export default function TrackedLink({
  href,
  eventName,
  eventParams,
  className,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </Link>
  );
}

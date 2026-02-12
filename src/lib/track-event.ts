'use client';

export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  const gtagFn = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtagFn === 'function') {
    gtagFn('event', eventName, params || {});
  }
}

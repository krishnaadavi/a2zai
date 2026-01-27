import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Lightweight analytics module — swap backend to Firebase/Amplitude later
// For now, logs events and batches them for future transmission

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  timestamp: number;
}

let eventQueue: AnalyticsEvent[] = [];
let sessionId: string = '';
let isInitialized = false;

// Initialize analytics with session
export function initAnalytics(): void {
  if (isInitialized) return;
  sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  isInitialized = true;

  // Track app open
  trackEvent('app_open', {
    platform: Platform.OS,
    version: Constants.expoConfig?.version || '1.0.0',
  });
}

// Track a generic event
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>
): void {
  const event: AnalyticsEvent = {
    name,
    properties: {
      ...properties,
      sessionId,
      platform: Platform.OS,
    },
    timestamp: Date.now(),
  };

  eventQueue.push(event);

  // Log in development
  if (__DEV__) {
    console.log(`[Analytics] ${name}`, properties || '');
  }

  // Flush when queue gets large
  if (eventQueue.length >= 20) {
    flushEvents();
  }
}

// Track screen views
export function trackScreen(screenName: string): void {
  trackEvent('screen_view', { screen: screenName });
}

// Track quiz events
export function trackQuizStart(): void {
  trackEvent('quiz_start');
}

export function trackQuizComplete(score: number, total: number): void {
  trackEvent('quiz_complete', {
    score,
    total,
    percentage: Math.round((score / total) * 100),
  });
}

// Track learning events
export function trackTermLearned(term: string): void {
  trackEvent('term_learned', { term });
}

export function trackFlashcardFlip(term: string): void {
  trackEvent('flashcard_flip', { term });
}

// Track engagement
export function trackNewsRead(articleId: string, source: string): void {
  trackEvent('news_read', { articleId, source });
}

export function trackToolExplored(category: string): void {
  trackEvent('tool_explored', { category });
}

export function trackStreakUpdate(streakDays: number): void {
  trackEvent('streak_update', { days: streakDays });
}

// Flush events to backend (placeholder — wire to real analytics later)
async function flushEvents(): Promise<void> {
  if (eventQueue.length === 0) return;

  const events = [...eventQueue];
  eventQueue = [];

  // TODO: Send to analytics backend
  // await fetch('https://a2zai.ai/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ events }),
  // });

  if (__DEV__) {
    console.log(`[Analytics] Flushed ${events.length} events`);
  }
}

// Flush on app background/close
export function flushOnExit(): void {
  flushEvents();
}

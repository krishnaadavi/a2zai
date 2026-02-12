import type { SignalEvent } from '@/lib/signal-normalizer';
import { annotateSignalsWithWatchlist, type PersonalizedSignal } from '@/lib/watchlist-matching';

type WatchlistEntity = {
  entityType: string;
  slug: string;
  name: string;
};

type UserPreferences = {
  topicsLLMs: boolean;
  topicsComputerVision: boolean;
  topicsRobotics: boolean;
  topicsAudio: boolean;
  topicsAgents: boolean;
  topicsOpenSource: boolean;
  topicsStartups: boolean;
  topicsPolicy: boolean;
};

type ReadHistoryEntry = {
  articleType: string;
  readAt: Date;
};

export type PersonalizedRankedSignal = PersonalizedSignal & {
  personalizationScore: {
    total: number;
    breakdown: {
      base: number;
      watchlist: number;
      topicAffinity: number;
      readHistory: number;
      freshness: number;
    };
    reasons: string[];
  };
};

const DEFAULT_PREFS: UserPreferences = {
  topicsLLMs: true,
  topicsComputerVision: false,
  topicsRobotics: false,
  topicsAudio: false,
  topicsAgents: true,
  topicsOpenSource: false,
  topicsStartups: false,
  topicsPolicy: false,
};

function scoreTopicAffinity(signal: SignalEvent, prefs: UserPreferences): { score: number; reasons: string[] } {
  const tags = [signal.entityName, signal.title, ...signal.tags].join(' ').toLowerCase();
  let score = 0;
  const reasons: string[] = [];

  const checks: Array<{ enabled: boolean; keywords: string[]; points: number; label: string }> = [
    { enabled: prefs.topicsLLMs, keywords: ['llm', 'language model', 'gpt', 'gemini', 'claude'], points: 6, label: 'LLMs' },
    { enabled: prefs.topicsAgents, keywords: ['agent', 'workflow', 'autonomous'], points: 4, label: 'agents' },
    { enabled: prefs.topicsComputerVision, keywords: ['vision', 'image', 'video', 'multimodal'], points: 4, label: 'computer vision' },
    { enabled: prefs.topicsRobotics, keywords: ['robot', 'robotics'], points: 4, label: 'robotics' },
    { enabled: prefs.topicsAudio, keywords: ['audio', 'speech', 'voice'], points: 4, label: 'audio' },
    { enabled: prefs.topicsOpenSource, keywords: ['open source', 'oss'], points: 3, label: 'open source' },
    { enabled: prefs.topicsStartups, keywords: ['startup', 'seed', 'series a', 'series b'], points: 5, label: 'startups' },
    { enabled: prefs.topicsPolicy, keywords: ['policy', 'regulation', 'compliance'], points: 3, label: 'policy' },
  ];

  for (const check of checks) {
    if (!check.enabled) continue;
    if (check.keywords.some((keyword) => tags.includes(keyword))) {
      score += check.points;
      reasons.push(`Matches ${check.label} preference`);
    }
  }

  return { score: Math.min(score, 18), reasons };
}

function scoreReadHistory(signal: SignalEvent, history: ReadHistoryEntry[]): { score: number; reasons: string[] } {
  if (history.length === 0) return { score: 0, reasons: [] };

  const targetType =
    signal.eventType === 'model_release' ? 'model' :
    signal.eventType === 'news' ? 'news' :
    'funding';

  const now = Date.now();
  const recent = history.filter((entry) => now - new Date(entry.readAt).getTime() <= 1000 * 60 * 60 * 24 * 21);
  const typeHits = recent.filter((entry) => entry.articleType === targetType).length;
  const recencyScore = Math.min(typeHits * 2, 8);

  if (recencyScore === 0) {
    return { score: 0, reasons: [] };
  }

  return {
    score: recencyScore,
    reasons: [`Aligned with your recent ${targetType} reading behavior`],
  };
}

function scoreFreshness(signal: SignalEvent): number {
  const ageHours = (Date.now() - new Date(signal.eventDate).getTime()) / (1000 * 60 * 60);
  if (ageHours <= 6) return 8;
  if (ageHours <= 24) return 5;
  if (ageHours <= 72) return 2;
  return 0;
}

export function rankSignalsForUser(input: {
  signals: SignalEvent[];
  watchlistEntities: WatchlistEntity[];
  preferences?: Partial<UserPreferences> | null;
  readHistory?: ReadHistoryEntry[];
  limit: number;
  watchlistOnly?: boolean;
}): {
  data: PersonalizedRankedSignal[];
  matchedCount: number;
  scoringVersion: string;
} {
  const prefs: UserPreferences = { ...DEFAULT_PREFS, ...(input.preferences || {}) };
  const history = input.readHistory || [];

  const annotated = annotateSignalsWithWatchlist(input.signals, input.watchlistEntities);
  const scored: PersonalizedRankedSignal[] = annotated.map((signal) => {
    const base = Math.round(signal.confidence * 20);
    const watchlist = signal.watchlistMatch ? 30 : 0;
    const topic = scoreTopicAffinity(signal, prefs);
    const behavior = scoreReadHistory(signal, history);
    const freshness = scoreFreshness(signal);
    const total = base + watchlist + topic.score + behavior.score + freshness;

    const reasons = [
      ...(signal.watchlistMatch ? ['Matches your watchlist'] : []),
      ...topic.reasons,
      ...behavior.reasons,
    ];

    return {
      ...signal,
      personalizationScore: {
        total,
        breakdown: {
          base,
          watchlist,
          topicAffinity: topic.score,
          readHistory: behavior.score,
          freshness,
        },
        reasons,
      },
    };
  });

  const filtered = input.watchlistOnly ? scored.filter((signal) => signal.watchlistMatch) : scored;
  const sorted = filtered.sort((a, b) => {
    const scoreDiff = b.personalizationScore.total - a.personalizationScore.total;
    if (scoreDiff !== 0) return scoreDiff;
    return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
  });

  return {
    data: sorted.slice(0, Math.min(Math.max(input.limit, 1), 100)),
    matchedCount: sorted.filter((signal) => signal.watchlistMatch).length,
    scoringVersion: 'v1',
  };
}

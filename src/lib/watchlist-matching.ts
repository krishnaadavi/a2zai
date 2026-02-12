import type { SignalEvent } from '@/lib/signal-normalizer';

type WatchlistEntity = {
  entityType: string;
  slug: string;
  name: string;
};

export type PersonalizedSignal = SignalEvent & {
  watchlistMatch: boolean;
  matchedEntity?: {
    entityType: string;
    slug: string;
    name: string;
  };
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function signalCandidateSlugs(signal: SignalEvent): Set<string> {
  const candidates = new Set<string>();
  candidates.add(slugify(signal.entityName));
  candidates.add(slugify(signal.source));

  if (signal.title.includes(' raised ')) {
    const companyName = signal.title.split(' raised ')[0];
    if (companyName) candidates.add(slugify(companyName));
  }

  signal.tags.forEach((tag) => candidates.add(slugify(tag)));
  return candidates;
}

function isTypeCompatible(watchType: string, signal: SignalEvent): boolean {
  if (watchType === 'model') return signal.eventType === 'model_release';
  if (watchType === 'funding') return signal.eventType === 'funding';
  if (watchType === 'company') return ['news', 'funding'].includes(signal.eventType);
  return true;
}

export function annotateSignalsWithWatchlist(
  signals: SignalEvent[],
  entities: WatchlistEntity[]
): PersonalizedSignal[] {
  return signals.map((signal) => {
    const candidates = signalCandidateSlugs(signal);
    const match = entities.find(
      (entity) => isTypeCompatible(entity.entityType, signal) && candidates.has(entity.slug)
    );

    if (!match) {
      return { ...signal, watchlistMatch: false };
    }

    return {
      ...signal,
      watchlistMatch: true,
      matchedEntity: {
        entityType: match.entityType,
        slug: match.slug,
        name: match.name,
      },
    };
  });
}

export function filterSignalsByWatchlist(
  signals: SignalEvent[],
  entities: WatchlistEntity[]
): PersonalizedSignal[] {
  return annotateSignalsWithWatchlist(signals, entities).filter((signal) => signal.watchlistMatch);
}

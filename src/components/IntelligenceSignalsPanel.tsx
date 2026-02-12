'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader2, Newspaper, Sparkles } from 'lucide-react';
import TrackedExternalLink from '@/components/TrackedExternalLink';

type SignalItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  eventType: string;
  entityName: string;
  watchlistMatch?: boolean;
  personalizationScore?: {
    total: number;
    reasons: string[];
  };
};

type SignalsResponse = {
  success: boolean;
  data: SignalItem[];
};

export default function IntelligenceSignalsPanel() {
  const [latest, setLatest] = useState<SignalItem[]>([]);
  const [recommended, setRecommended] = useState<SignalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [view, setView] = useState<'recommended' | 'latest'>('recommended');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const [latestRes, recommendedRes] = await Promise.all([
          fetch('/api/signals?limit=14', { cache: 'no-store' }),
          fetch('/api/signals?personalized=true&limit=14', { cache: 'no-store' }),
        ]);

        if (latestRes.ok) {
          const latestData = (await latestRes.json()) as SignalsResponse;
          setLatest(latestData.data || []);
        }

        if (recommendedRes.ok) {
          const recData = (await recommendedRes.json()) as SignalsResponse;
          setRecommended(recData.data || []);
          setSignedIn(true);
        } else if (recommendedRes.status === 401) {
          setSignedIn(false);
          setRecommended([]);
          setView('latest');
        } else {
          setSignedIn(null);
          setRecommended([]);
          setView('latest');
        }
      } catch {
        setSignedIn(null);
        setRecommended([]);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const activeSignals = useMemo(() => {
    if (view === 'recommended' && recommended.length > 0) return recommended;
    return latest;
  }, [view, recommended, latest]);

  if (loading) {
    return (
      <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-2 text-gray-300">
        <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
        Loading intelligence feed...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          {view === 'recommended' ? (
            <Sparkles className="h-5 w-5 text-cyan-300" />
          ) : (
            <Newspaper className="h-5 w-5 text-purple-300" />
          )}
          {view === 'recommended' ? 'Recommended Signals' : 'Latest Signals'}
        </h2>
        <div className="inline-flex p-1 rounded-lg bg-gray-900 border border-gray-800">
          <button
            onClick={() => setView('recommended')}
            disabled={!signedIn}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              view === 'recommended'
                ? 'bg-cyan-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Recommended
          </button>
          <button
            onClick={() => setView('latest')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              view === 'latest'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Latest
          </button>
        </div>
      </div>

      {signedIn === false && (
        <p className="text-xs text-gray-500">
          Sign in to unlock recommended ranking and “why this signal” personalization explanations.
        </p>
      )}

      {activeSignals.map((item, idx) => {
        const reasons = item.personalizationScore?.reasons?.slice(0, 2) || [];
        const showReasons = view === 'recommended' && reasons.length > 0;

        return (
          <TrackedExternalLink
            key={item.id}
            href={item.url}
            eventName="intelligence_item_opened"
            eventParams={{ location: 'intelligence_feed', rank: idx + 1, view }}
            className="block p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors"
          >
            <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase">
              {item.eventType.replace('_', ' ')}
            </span>
            <h3 className="text-white font-semibold mt-2">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-1">
              {item.source} • {item.entityName}
            </p>

            {showReasons && (
              <div className="mt-3 flex flex-wrap gap-2">
                {reasons.map((reason) => (
                  <span
                    key={`${item.id}-${reason}`}
                    className="text-[11px] px-2 py-1 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/25"
                  >
                    Why: {reason}
                  </span>
                ))}
              </div>
            )}
          </TrackedExternalLink>
        );
      })}
    </div>
  );
}

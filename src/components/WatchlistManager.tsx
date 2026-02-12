'use client';

import { useEffect, useMemo, useState } from 'react';
import { BellRing, Loader2, Plus, Trash2 } from 'lucide-react';

type Suggestion = {
  entityType: 'company' | 'model' | 'funding';
  slug: string;
  name: string;
  subtitle: string;
  url?: string;
  source: string;
  metadata?: Record<string, string>;
};

type WatchlistItem = {
  id: string;
  entityId: string;
  createdAt: string;
  entity: {
    id: string;
    entityType: string;
    slug: string;
    name: string;
    url?: string | null;
  };
};

type AlertPreferences = {
  emailDailyBrief: boolean;
  emailWeeklyBrief: boolean;
  emailInstantAlerts: boolean;
  inAppAlerts: boolean;
  fundingAlerts: boolean;
  modelReleaseAlerts: boolean;
  companyNewsAlerts: boolean;
};

const defaultPrefs: AlertPreferences = {
  emailDailyBrief: true,
  emailWeeklyBrief: true,
  emailInstantAlerts: false,
  inAppAlerts: true,
  fundingAlerts: true,
  modelReleaseAlerts: true,
  companyNewsAlerts: true,
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export default function WatchlistManager() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [suggestions, setSuggestions] = useState<{
    companies: Suggestion[];
    funding: Suggestion[];
    models: Suggestion[];
  }>({
    companies: [],
    funding: [],
    models: [],
  });
  const [prefs, setPrefs] = useState<AlertPreferences>(defaultPrefs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingPref, setSavingPref] = useState<string | null>(null);
  const [addingSlug, setAddingSlug] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const followedKeys = useMemo(
    () => new Set(watchlist.map((item) => `${item.entity.entityType}:${item.entity.slug}`)),
    [watchlist]
  );

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [watchlistRes, suggestionsRes, prefsRes] = await Promise.all([
          fetchJson<{ success: boolean; data: WatchlistItem[] }>('/api/watchlists'),
          fetchJson<{ success: boolean; data: { companies: Suggestion[]; funding: Suggestion[]; models: Suggestion[] } }>(
            '/api/watchlists/suggestions'
          ),
          fetchJson<{ success: boolean; data: AlertPreferences }>('/api/watchlists/preferences'),
        ]);

        setWatchlist(watchlistRes.data || []);
        setSuggestions(suggestionsRes.data || { companies: [], funding: [], models: [] });
        setPrefs({ ...defaultPrefs, ...(prefsRes.data || {}) });
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Failed to load watchlists';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const addToWatchlist = async (entity: Suggestion) => {
    try {
      setAddingSlug(`${entity.entityType}:${entity.slug}`);
      const res = await fetch('/api/watchlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType: entity.entityType,
          slug: entity.slug,
          name: entity.name,
          url: entity.url,
          source: entity.source,
          metadata: entity.metadata,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to add watchlist item');
      }
      setWatchlist((prev) => {
        if (prev.some((item) => item.id === data.data.id)) return prev;
        return [data.data, ...prev];
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to add item';
      setError(message);
    } finally {
      setAddingSlug(null);
    }
  };

  const removeFromWatchlist = async (item: WatchlistItem) => {
    try {
      setRemovingItemId(item.id);
      const res = await fetch(`/api/watchlists?itemId=${encodeURIComponent(item.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to remove watchlist item');
      }
      setWatchlist((prev) => prev.filter((watch) => watch.id !== item.id));
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to remove item';
      setError(message);
    } finally {
      setRemovingItemId(null);
    }
  };

  const updatePreference = async (field: keyof AlertPreferences, value: boolean) => {
    try {
      setSavingPref(field);
      setPrefs((prev) => ({ ...prev, [field]: value }));
      const res = await fetch('/api/watchlists/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update preference');
      }
      setPrefs((prev) => ({ ...prev, ...data.data }));
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to update preference';
      setError(message);
    } finally {
      setSavingPref(null);
    }
  };

  const sections: Array<{ title: string; items: Suggestion[] }> = [
    { title: 'Companies', items: suggestions.companies },
    { title: 'Funding', items: suggestions.funding },
    { title: 'Models', items: suggestions.models },
  ];

  if (loading) {
    return (
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-3 text-gray-300">
        <Loader2 className="h-5 w-5 animate-spin text-cyan-300" />
        Loading your watchlists...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/30 text-red-300 text-sm">{error}</div>
      )}

      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-3">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-400">No entities followed yet. Add entities from suggestions below.</p>
        ) : (
          <div className="space-y-2">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-950 border border-gray-800"
              >
                <div>
                  <p className="text-white font-medium">{item.entity.name}</p>
                  <p className="text-xs text-gray-500 uppercase">{item.entity.entityType}</p>
                </div>
                <button
                  onClick={() => removeFromWatchlist(item)}
                  disabled={removingItemId === item.id}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 text-sm disabled:opacity-60"
                >
                  {removingItemId === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BellRing className="h-5 w-5 text-cyan-300" />
          Alert Preferences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(
            [
              ['emailDailyBrief', 'Email daily brief'],
              ['emailWeeklyBrief', 'Email weekly brief'],
              ['emailInstantAlerts', 'Email instant alerts'],
              ['inAppAlerts', 'In-app alerts'],
              ['fundingAlerts', 'Funding alerts'],
              ['modelReleaseAlerts', 'Model release alerts'],
              ['companyNewsAlerts', 'Company news alerts'],
            ] as Array<[keyof AlertPreferences, string]>
          ).map(([field, label]) => (
            <label key={field} className="flex items-center justify-between p-3 rounded-lg bg-gray-950 border border-gray-800">
              <span className="text-sm text-gray-300">{label}</span>
              <input
                type="checkbox"
                checked={prefs[field]}
                disabled={savingPref === field}
                onChange={(e) => updatePreference(field, e.target.checked)}
                className="rounded text-cyan-500 focus:ring-cyan-500 bg-gray-800 border-gray-700"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Add from Suggestions</h2>
        <div className="space-y-5">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.items.slice(0, 6).map((item) => {
                  const key = `${item.entityType}:${item.slug}`;
                  const followed = followedKeys.has(key);
                  const busy = addingSlug === key;

                  return (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-950 border border-gray-800">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                      </div>
                      <button
                        onClick={() => addToWatchlist(item)}
                        disabled={followed || busy}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-cyan-600 text-white hover:bg-cyan-500 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                        {followed ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

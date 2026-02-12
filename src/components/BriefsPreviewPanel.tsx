'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import type { SignalEvent } from '@/lib/signal-normalizer';

type PersonalizedBriefResponse = {
  success: boolean;
  data: {
    summary: {
      title: string;
      generatedAt: string;
      watchlistCount: number;
      matchedSignals: number;
      lead: string;
    };
    signals: SignalEvent[];
  };
};

type DigestIssue = {
  id: string;
  title: string;
  highlights: string[];
};

type DigestPreviewResponse = {
  success: boolean;
  data: DigestIssue[];
};

type PanelState =
  | { mode: 'loading' }
  | { mode: 'personalized'; summary: PersonalizedBriefResponse['data']['summary']; signals: SignalEvent[] }
  | { mode: 'generic'; issues: DigestIssue[] };

export default function BriefsPreviewPanel() {
  const [state, setState] = useState<PanelState>({ mode: 'loading' });

  useEffect(() => {
    const load = async () => {
      try {
        const personalizedRes = await fetch('/api/briefs/personalized?limit=6', { cache: 'no-store' });

        if (personalizedRes.ok) {
          const personalizedData = (await personalizedRes.json()) as PersonalizedBriefResponse;
          const signals = personalizedData?.data?.signals || [];

          if (personalizedData.success && signals.length > 0) {
            setState({
              mode: 'personalized',
              summary: personalizedData.data.summary,
              signals: signals.slice(0, 4),
            });
            return;
          }
        }

        const digestRes = await fetch('/api/digest/preview?limit=4', { cache: 'no-store' });
        if (!digestRes.ok) {
          throw new Error(`Digest preview request failed: ${digestRes.status}`);
        }
        const digestData = (await digestRes.json()) as DigestPreviewResponse;
        setState({ mode: 'generic', issues: (digestData.data || []).slice(0, 4) });
      } catch {
        setState({ mode: 'generic', issues: [] });
      }
    };

    void load();
  }, []);

  if (state.mode === 'loading') {
    return (
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-2 text-gray-300">
        <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
        Loading brief preview...
      </div>
    );
  }

  if (state.mode === 'personalized') {
    return (
      <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-cyan-900/20 border border-purple-500/20">
        <div className="flex items-center gap-2 text-purple-300 text-sm mb-2">
          <Sparkles className="h-4 w-4" />
          Personalized from your watchlist
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{state.summary.title}</h3>
        <p className="text-sm text-gray-400 mb-4">{state.summary.lead}</p>
        <ul className="space-y-2">
          {state.signals.map((signal) => (
            <li key={signal.id} className="text-sm text-gray-300 flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-cyan-300 mt-0.5 flex-shrink-0" />
              {signal.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-3">Latest Digest Preview</h3>
      {state.issues.length === 0 ? (
        <p className="text-sm text-gray-400">No digest issues available right now. Please check back soon.</p>
      ) : (
        <ul className="space-y-3">
          {state.issues.map((issue) => (
            <li key={issue.id} className="text-sm text-gray-300">
              <p className="font-medium text-white">{issue.title}</p>
              <p className="text-gray-500">{issue.highlights[0] || 'Weekly AI summary archived'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

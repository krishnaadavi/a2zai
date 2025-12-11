'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Settings,
  MessageSquare,
  Github,
  BookOpen,
  Scale,
  Eye,
  Bot,
  TrendingUp,
  Cpu,
  Check,
  Loader2,
} from 'lucide-react';

type Topic = {
  id: string;
  label: string;
  enabled: boolean;
};

const topicIcons: Record<string, typeof MessageSquare> = {
  llm: MessageSquare,
  open_source: Github,
  research: BookOpen,
  policy: Scale,
  computer_vision: Eye,
  robotics: Bot,
  business: TrendingUp,
  hardware: Cpu,
};

export default function PreferencesPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status ?? 'loading';
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/api/auth/signin');
    }
  }, [status]);

  useEffect(() => {
    async function fetchPreferences() {
      try {
        const res = await fetch('/api/user/preferences');
        const data = await res.json();
        if (data.success) {
          setTopics(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch preferences:', error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchPreferences();
    }
  }, [session]);

  const handleToggle = (topicId: string) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === topicId ? { ...t, enabled: !t.enabled } : t))
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topics: topics.map((t) => ({ id: t.id, enabled: t.enabled })),
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSelectAll = () => {
    setTopics((prev) => prev.map((t) => ({ ...t, enabled: true })));
    setSaved(false);
  };

  const handleDeselectAll = () => {
    setTopics((prev) => prev.map((t) => ({ ...t, enabled: false })));
    setSaved(false);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Profile
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Topic Preferences</h1>
              <p className="text-gray-400">Choose which topics appear in your personalized feed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Quick Actions */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Select All
            </button>
            <button
              onClick={handleDeselectAll}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Deselect All
            </button>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {topics.map((topic) => {
              const Icon = topicIcons[topic.id] || MessageSquare;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleToggle(topic.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    topic.enabled
                      ? 'bg-purple-500/10 border-purple-500/50 text-white'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      topic.enabled ? 'bg-purple-500/20' : 'bg-gray-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="flex-1 text-left font-medium">{topic.label}</span>
                  {topic.enabled && (
                    <Check className="h-5 w-5 text-purple-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  Save Preferences
                </>
              )}
            </button>
            {saved && (
              <span className="text-emerald-400 text-sm flex items-center gap-1">
                <Check className="h-4 w-4" /> Saved!
              </span>
            )}
          </div>

          {/* Info */}
          <p className="mt-8 text-gray-500 text-sm">
            Your preferences affect the content shown in your personalized feed.
            Disabled topics will appear less frequently but won't be completely hidden.
          </p>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Settings,
  Newspaper,
  Brain,
  FlaskConical,
  DollarSign,
  Wrench,
  GraduationCap,
  MessageSquare,
  Eye,
  Bot,
  Volume2,
  Cpu,
  Github,
  Rocket,
  Scale,
  Mail,
  Bell,
  Layout,
  Check,
  Loader2,
} from 'lucide-react';

interface Preferences {
  showNews: boolean;
  showModels: boolean;
  showResearch: boolean;
  showFunding: boolean;
  showTools: boolean;
  showCourses: boolean;
  topicsLLMs: boolean;
  topicsComputerVision: boolean;
  topicsRobotics: boolean;
  topicsAudio: boolean;
  topicsAgents: boolean;
  topicsOpenSource: boolean;
  topicsStartups: boolean;
  topicsPolicy: boolean;
  emailDigestDaily: boolean;
  emailDigestWeekly: boolean;
  emailBreakingNews: boolean;
  emailDailyBrief: boolean;
  emailWeeklyBrief: boolean;
  emailInstantAlerts: boolean;
  inAppAlerts: boolean;
  fundingAlerts: boolean;
  modelReleaseAlerts: boolean;
  companyNewsAlerts: boolean;
  defaultHomePage: string;
  compactView: boolean;
}

const defaultPreferences: Preferences = {
  showNews: true,
  showModels: true,
  showResearch: true,
  showFunding: true,
  showTools: true,
  showCourses: true,
  topicsLLMs: true,
  topicsComputerVision: false,
  topicsRobotics: false,
  topicsAudio: false,
  topicsAgents: true,
  topicsOpenSource: false,
  topicsStartups: false,
  topicsPolicy: false,
  emailDigestDaily: false,
  emailDigestWeekly: true,
  emailBreakingNews: false,
  emailDailyBrief: true,
  emailWeeklyBrief: true,
  emailInstantAlerts: false,
  inAppAlerts: true,
  fundingAlerts: true,
  modelReleaseAlerts: true,
  companyNewsAlerts: true,
  defaultHomePage: 'home',
  compactView: false,
};

const contentCategories = [
  { key: 'showNews', label: 'News', icon: Newspaper, description: 'Latest AI news and updates' },
  { key: 'showModels', label: 'Models', icon: Brain, description: 'Trending AI models from HuggingFace' },
  { key: 'showResearch', label: 'Research', icon: FlaskConical, description: 'Academic papers from arXiv' },
  { key: 'showFunding', label: 'Funding', icon: DollarSign, description: 'Startup funding rounds' },
  { key: 'showTools', label: 'Tools', icon: Wrench, description: 'AI tools and applications' },
  { key: 'showCourses', label: 'Courses', icon: GraduationCap, description: 'Learning resources' },
];

const topics = [
  { key: 'topicsLLMs', label: 'LLMs & Language', icon: MessageSquare, description: 'ChatGPT, Claude, Gemini' },
  { key: 'topicsAgents', label: 'AI Agents', icon: Bot, description: 'Autonomous AI systems' },
  { key: 'topicsComputerVision', label: 'Computer Vision', icon: Eye, description: 'Image & video AI' },
  { key: 'topicsAudio', label: 'Audio & Speech', icon: Volume2, description: 'Voice AI, music generation' },
  { key: 'topicsRobotics', label: 'Robotics', icon: Cpu, description: 'Physical AI systems' },
  { key: 'topicsOpenSource', label: 'Open Source', icon: Github, description: 'OSS models & tools' },
  { key: 'topicsStartups', label: 'Startups', icon: Rocket, description: 'AI company news' },
  { key: 'topicsPolicy', label: 'AI Policy', icon: Scale, description: 'Regulation & ethics' },
];

const emailOptions = [
  { key: 'emailDigestDaily', label: 'Daily Digest', description: 'Top stories every weekday morning' },
  { key: 'emailDigestWeekly', label: 'Weekly Recap', description: 'Comprehensive weekly summary' },
  { key: 'emailBreakingNews', label: 'Breaking News', description: 'Major announcements only' },
];

const alertOptions = [
  { key: 'emailDailyBrief', label: 'Email Daily Brief', description: 'Receive your personalized daily intelligence brief' },
  { key: 'emailWeeklyBrief', label: 'Email Weekly Brief', description: 'Weekly summary of watchlist and market changes' },
  { key: 'emailInstantAlerts', label: 'Email Instant Alerts', description: 'Immediate alerts for high-priority watchlist signals' },
  { key: 'inAppAlerts', label: 'In-App Alerts', description: 'Show watchlist alerts inside the product' },
  { key: 'fundingAlerts', label: 'Funding Alerts', description: 'Notify on funding rounds relevant to your watchlist' },
  { key: 'modelReleaseAlerts', label: 'Model Release Alerts', description: 'Notify when followed model providers launch updates' },
  { key: 'companyNewsAlerts', label: 'Company News Alerts', description: 'Notify on major company news from followed entities' },
];

export default function PreferencesPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status ?? 'loading';
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/signin');
    }
  }, [status]);

  useEffect(() => {
    async function fetchPreferences() {
      try {
        const res = await fetch('/api/user/personalization');
        const data = await res.json();
        if (data.success && data.data) {
          setPreferences({ ...defaultPreferences, ...data.data });
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

  const handleToggle = (key: keyof Preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/user/personalization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
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
        <div className="max-w-3xl mx-auto">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Profile
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Preferences</h1>
              <p className="text-gray-400">Customize your A2Z AI experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Content Categories */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layout className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Content Categories</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4">Choose which sections appear on your homepage</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {contentCategories.map(({ key, label, icon: Icon, description }) => (
                <button
                  key={key}
                  onClick={() => handleToggle(key as keyof Preferences)}
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${
                    preferences[key as keyof Preferences]
                      ? 'bg-purple-500/10 border-purple-500/50'
                      : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      preferences[key as keyof Preferences] ? 'bg-purple-500/20' : 'bg-gray-800'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${preferences[key as keyof Preferences] ? 'text-purple-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${preferences[key as keyof Preferences] ? 'text-white' : 'text-gray-400'}`}>
                        {label}
                      </span>
                      {preferences[key as keyof Preferences] && <Check className="h-4 w-4 text-purple-400" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Topics of Interest */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-emerald-400" />
              <h2 className="text-lg font-semibold text-white">Topics of Interest</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4">Select topics you want to see more of</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.map(({ key, label, icon: Icon, description }) => (
                <button
                  key={key}
                  onClick={() => handleToggle(key as keyof Preferences)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    preferences[key as keyof Preferences]
                      ? 'bg-emerald-500/10 border-emerald-500/50'
                      : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      preferences[key as keyof Preferences] ? 'bg-emerald-500/20' : 'bg-gray-800'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${preferences[key as keyof Preferences] ? 'text-emerald-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className={`font-medium ${preferences[key as keyof Preferences] ? 'text-white' : 'text-gray-400'}`}>
                      {label}
                    </span>
                    <p className="text-xs text-gray-500">{description}</p>
                  </div>
                  {preferences[key as keyof Preferences] && <Check className="h-5 w-5 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Email Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">Email Notifications</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4">Choose how often you want to hear from us</p>
            <div className="space-y-3">
              {emailOptions.map(({ key, label, description }) => (
                <button
                  key={key}
                  onClick={() => handleToggle(key as keyof Preferences)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    preferences[key as keyof Preferences]
                      ? 'bg-cyan-500/10 border-cyan-500/50'
                      : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bell className={`h-5 w-5 ${preferences[key as keyof Preferences] ? 'text-cyan-400' : 'text-gray-500'}`} />
                    <div className="text-left">
                      <span className={`font-medium ${preferences[key as keyof Preferences] ? 'text-white' : 'text-gray-400'}`}>
                        {label}
                      </span>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-7 rounded-full transition-colors relative ${
                      preferences[key as keyof Preferences] ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                        preferences[key as keyof Preferences] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Display Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layout className="h-5 w-5 text-orange-400" />
              <h2 className="text-lg font-semibold text-white">Display</h2>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => handleToggle('compactView')}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  preferences.compactView
                    ? 'bg-orange-500/10 border-orange-500/50'
                    : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="text-left">
                  <span className={`font-medium ${preferences.compactView ? 'text-white' : 'text-gray-400'}`}>
                    Compact View
                  </span>
                  <p className="text-xs text-gray-500">Show more content with less spacing</p>
                </div>
                <div
                  className={`w-12 h-7 rounded-full transition-colors relative ${
                    preferences.compactView ? 'bg-orange-500' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                      preferences.compactView ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Watchlist & Signal Alerts */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-fuchsia-400" />
              <h2 className="text-lg font-semibold text-white">Watchlist & Signal Alerts</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4">Fine-tune which personalized alerts you receive</p>
            <div className="space-y-3">
              {alertOptions.map(({ key, label, description }) => (
                <button
                  key={key}
                  onClick={() => handleToggle(key as keyof Preferences)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    preferences[key as keyof Preferences]
                      ? 'bg-fuchsia-500/10 border-fuchsia-500/50'
                      : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bell className={`h-5 w-5 ${preferences[key as keyof Preferences] ? 'text-fuchsia-400' : 'text-gray-500'}`} />
                    <div className="text-left">
                      <span className={`font-medium ${preferences[key as keyof Preferences] ? 'text-white' : 'text-gray-400'}`}>
                        {label}
                      </span>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-7 rounded-full transition-colors relative ${
                      preferences[key as keyof Preferences] ? 'bg-fuchsia-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                        preferences[key as keyof Preferences] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
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
                <Check className="h-4 w-4" /> Preferences saved!
              </span>
            )}
          </div>

          {/* Info */}
          <p className="text-gray-500 text-sm">
            Your preferences personalize your A2Z AI experience. Content will be tailored based on your selections.
          </p>
        </div>
      </section>
    </div>
  );
}

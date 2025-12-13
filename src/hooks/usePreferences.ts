'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface UserPreferences {
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
  defaultHomePage: string;
  compactView: boolean;
}

export const defaultPreferences: UserPreferences = {
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
  defaultHomePage: 'home',
  compactView: false,
};

export function usePreferences() {
  const { data: session, status } = useSession();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPreferences() {
      if (status === 'loading') return;

      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/user/preferences');
        const data = await res.json();

        if (data.success && data.data) {
          setPreferences({ ...defaultPreferences, ...data.data });
        }
      } catch (err) {
        console.error('Failed to fetch preferences:', err);
        setError('Failed to load preferences');
      } finally {
        setLoading(false);
      }
    }

    fetchPreferences();
  }, [session, status]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!session) return false;

    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    try {
      const res = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPreferences),
      });

      return res.ok;
    } catch (err) {
      console.error('Failed to update preferences:', err);
      // Revert on error
      setPreferences(preferences);
      return false;
    }
  };

  return {
    preferences,
    loading,
    error,
    isAuthenticated: !!session,
    updatePreferences,
  };
}

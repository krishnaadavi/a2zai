'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bell, CheckCheck, ExternalLink, Loader2 } from 'lucide-react';

type InAppAlert = {
  id: string;
  signalId: string;
  title: string;
  message: string;
  url?: string | null;
  eventType: string;
  isRead: boolean;
  createdAt: string;
};

export default function ProfileAlertsPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status ?? 'loading';

  const [alerts, setAlerts] = useState<InAppAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyAlertId, setBusyAlertId] = useState<string | null>(null);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/api/auth/signin');
    }
  }, [status]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/user/alerts?limit=50', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          setAlerts(data.data || []);
        }
      } catch (error) {
        console.error('Failed to load alerts', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      void load();
    }
  }, [session]);

  const unreadCount = useMemo(() => alerts.filter((alert) => !alert.isRead).length, [alerts]);

  const markOneRead = async (alert: InAppAlert) => {
    if (alert.isRead) return;
    setBusyAlertId(alert.id);
    try {
      const res = await fetch('/api/user/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId: alert.id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAlerts((prev) =>
          prev.map((item) =>
            item.id === alert.id
              ? { ...item, isRead: true }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Failed to mark alert read', error);
    } finally {
      setBusyAlertId(null);
    }
  };

  const markAllRead = async () => {
    if (unreadCount === 0) return;
    setMarkingAll(true);
    try {
      const res = await fetch('/api/user/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllRead: true }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })));
      }
    } catch (error) {
      console.error('Failed to mark all alerts read', error);
    } finally {
      setMarkingAll(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="bg-gradient-to-br from-gray-900 via-cyan-900/20 to-gray-900 py-12 px-4 border-b border-gray-800">
        <div className="max-w-3xl mx-auto">
          <Link href="/profile" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Bell className="h-6 w-6 text-cyan-300" />
                Alerts
              </h1>
              <p className="text-gray-400 mt-1">{unreadCount} unread alerts</p>
            </div>
            <button
              onClick={markAllRead}
              disabled={markingAll || unreadCount === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {markingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />}
              Mark all read
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {alerts.length === 0 ? (
            <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 text-gray-400">
              No alerts yet. Follow companies, models, or funding entities in watchlists to receive personalized alerts.
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    alert.isRead ? 'bg-gray-900 border-gray-800' : 'bg-cyan-900/10 border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-white font-medium">{alert.title}</p>
                      <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(alert.createdAt).toLocaleString()} • {alert.eventType.replace('_', ' ')}
                      </p>
                    </div>
                    {!alert.isRead && (
                      <button
                        onClick={() => markOneRead(alert)}
                        disabled={busyAlertId === alert.id}
                        className="text-xs px-3 py-1.5 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 disabled:opacity-60"
                      >
                        {busyAlertId === alert.id ? 'Saving...' : 'Mark read'}
                      </button>
                    )}
                  </div>
                  {alert.url && (
                    <a
                      href={alert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 mt-3"
                    >
                      Open source
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

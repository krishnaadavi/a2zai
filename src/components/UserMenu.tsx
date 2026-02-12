'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, Settings, Bookmark, Rss, LogOut, LogIn, ChevronDown, Bell } from 'lucide-react';

export default function UserMenu() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status ?? 'loading';
  const [isOpen, setIsOpen] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const loadUnread = async () => {
      if (!session) return;
      try {
        const res = await fetch('/api/user/alerts?unreadOnly=true&limit=100', { cache: 'no-store' });
        const data = await res.json();
        if (res.ok && data.success) {
          setUnreadAlerts(data.count || 0);
        }
      } catch {
        // noop
      }
    };
    void loadUnread();
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse" />
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn('google')}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || 'User'}
            className="w-8 h-8 rounded-full border-2 border-gray-700"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        )}
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-xl py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-800">
            <p className="text-sm font-medium text-white truncate">
              {session.user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/feed"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <Rss className="h-4 w-4" />
              My Feed
            </Link>
            <Link
              href="/profile/saved"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <Bookmark className="h-4 w-4" />
              Saved Articles
            </Link>
            <Link
              href="/profile/preferences"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <Settings className="h-4 w-4" />
              Preferences
            </Link>
            <Link
              href="/profile/alerts"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <span className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                Alerts
              </span>
              {unreadAlerts > 0 && (
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  {unreadAlerts}
                </span>
              )}
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-800 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors w-full"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap,
  Brain,
  BookOpen,
  Building2,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  BookMarked,
  TrendingUp,
  FileText,
  Wrench,
  Rocket,
  Mail,
  Lightbulb,
  GitCompare,
  Search,
  MessageSquare,
  BellRing,
  Radar,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import UserMenu from './UserMenu';
import Logo from './Logo';
import SearchModal, { useSearchModal } from './SearchModal';

type DropdownItem = {
  href: string;
  label: string;
  description: string;
  icon: typeof Zap;
};

type NavItem = {
  href?: string;
  label: string;
  icon: typeof Zap;
  dropdown?: DropdownItem[];
};

export default function AppHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchModal = useSearchModal();

  const trackEvent = (eventName: string, params?: Record<string, string>) => {
    if (typeof window === 'undefined') return;
    const gtagFn = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtagFn === 'function') {
      gtagFn('event', eventName, params || {});
    }
  };

  // Intelligence-first navigation structure
  const navItems: NavItem[] = [
    { href: '/intelligence', label: 'Intelligence', icon: Radar },
    { href: '/companies', label: 'Companies', icon: Building2 },
    { href: '/funding', label: 'Funding', icon: Rocket },
    { href: '/models', label: 'Models', icon: Brain },
    { href: '/watchlists', label: 'Watchlists', icon: BellRing },
    { href: '/briefs', label: 'Briefs', icon: Mail },
    {
      label: 'Build',
      icon: TrendingUp,
      dropdown: [
        { href: '/news', label: 'News Stream', description: 'Latest AI headlines and sources', icon: FileText },
        { href: '/research', label: 'Research', description: 'Academic papers and breakthroughs', icon: BookOpen },
        { href: '/tools', label: 'AI Tools', description: 'Directory of 60+ tools', icon: Wrench },
        { href: '/compare', label: 'Compare Models', description: 'GPT-4 vs Claude vs Gemini', icon: GitCompare },
        { href: '/prompts', label: 'Prompt Library', description: 'Ready-to-use prompts', icon: MessageSquare },
        { href: '/use-cases', label: 'Use Cases', description: 'Practical AI applications', icon: Lightbulb },
      ],
    },
    {
      label: 'Learn',
      icon: GraduationCap,
      dropdown: [
        { href: '/learn', label: 'Learning Hub', description: 'Start your AI journey', icon: BookOpen },
        { href: '/learn/101', label: 'AI 101', description: '15-lesson curriculum', icon: GraduationCap },
        { href: '/learn/glossary', label: 'Glossary', description: '130+ AI terms', icon: BookMarked },
        { href: '/courses', label: 'Courses', description: 'Learn AI/ML online', icon: Zap },
      ],
    },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    });
    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => pathname === href;
  const isDropdownActive = (items: DropdownItem[]) => items.some((item) => pathname === item.href);

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-90 transition">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => {
              if (item.dropdown) {
                const isOpen = activeDropdown === item.label;
                const hasActiveChild = isDropdownActive(item.dropdown);

                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        hasActiveChild
                          ? 'text-purple-300 bg-purple-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 z-50">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.href}
                            href={dropItem.href}
                            onClick={() => setActiveDropdown(null)}
                            className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-800/50 transition-colors ${
                              isActive(dropItem.href) ? 'bg-purple-500/10' : ''
                            }`}
                          >
                            <dropItem.icon
                              className={`h-5 w-5 mt-0.5 ${
                                isActive(dropItem.href) ? 'text-purple-400' : 'text-gray-500'
                              }`}
                            />
                            <div>
                              <span
                                className={`block font-medium ${
                                  isActive(dropItem.href) ? 'text-purple-300' : 'text-white'
                                }`}
                              >
                                {dropItem.label}
                              </span>
                              <span className="text-xs text-gray-500">{dropItem.description}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => {
                    if (item.href === '/watchlists') {
                      trackEvent('hero_watchlist_cta_clicked', { location: 'header_nav' });
                    }
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href!)
                      ? 'text-purple-300 bg-purple-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Search, Subscribe & User Menu */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={searchModal.open}
              className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors text-sm"
            >
              <Search className="h-4 w-4" />
              <span className="text-gray-500">Search...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-700 text-gray-400 rounded">
                ⌘K
              </kbd>
            </button>
            <Link
              href="/briefs"
              onClick={() => trackEvent('brief_subscribe_clicked', { location: 'header' })}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 font-semibold text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Get Brief
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-gray-900 z-50 lg:hidden shadow-2xl overflow-y-auto">
            {/* Mobile Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <Logo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Search Button */}
            <div className="px-4 pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  searchModal.open();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 bg-gray-800 rounded-lg text-gray-400"
              >
                <Search className="h-5 w-5" />
                <span>Search signals, companies, learn...</span>
              </button>
            </div>

            {/* Mobile Nav */}
            <nav className="p-4">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div key={item.label} className="mb-4">
                      <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                      <div className="space-y-1">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.href}
                            href={dropItem.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                              isActive(dropItem.href)
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'text-gray-300 hover:text-white hover:bg-gray-800'
                            }`}
                          >
                            <dropItem.icon className="h-5 w-5" />
                            <div>
                              <span className="block font-medium">{dropItem.label}</span>
                              <span className="text-xs text-gray-500">{dropItem.description}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1 ${
                      isActive(item.href!)
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile Subscribe Button */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <Link
                  href="/briefs"
                  onClick={() => trackEvent('brief_subscribe_clicked', { location: 'mobile_menu' })}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-semibold"
                >
                  <Sparkles className="h-4 w-4" />
                  Get Daily Brief
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
      {/* Search Modal */}
      <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.close} />
    </header>
  );
}

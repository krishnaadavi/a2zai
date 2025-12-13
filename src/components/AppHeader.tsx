'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap,
  Newspaper,
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
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import UserMenu from './UserMenu';
import Logo from './Logo';

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

  // Navigation structure with dropdowns
  const navItems: NavItem[] = [
    { href: '/', label: 'Home', icon: Zap },
    {
      label: 'Discover',
      icon: TrendingUp,
      dropdown: [
        { href: '/news', label: 'News', description: 'Latest AI headlines', icon: Newspaper },
        { href: '/models', label: 'Models', description: 'Trending AI models', icon: Brain },
        { href: '/research', label: 'Research', description: 'Academic papers', icon: FileText },
        { href: '/companies', label: 'Companies', description: 'AI industry leaders', icon: Building2 },
        { href: '/funding', label: 'Funding', description: 'Startup funding tracker', icon: Rocket },
        { href: '/tools', label: 'AI Tools', description: 'Directory of AI tools', icon: Wrench },
      ],
    },
    {
      label: 'Learn',
      icon: GraduationCap,
      dropdown: [
        { href: '/learn', label: 'Learning Hub', description: 'Start your AI journey', icon: BookOpen },
        { href: '/learn/101', label: 'AI 101', description: '6-lesson fundamentals course', icon: GraduationCap },
        { href: '/learn/glossary', label: 'Glossary', description: 'AI terms explained', icon: BookMarked },
        { href: '/courses', label: 'Courses', description: 'External AI courses', icon: BookOpen },
      ],
    },
    { href: '/digest', label: 'Weekly Digest', icon: Mail },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
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

          {/* Right Side - Subscribe & User Menu */}
          <div className="flex items-center gap-2">
            <Link
              href="/#newsletter"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 font-semibold text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Subscribe
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
                  href="/#newsletter"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-semibold"
                >
                  <Sparkles className="h-4 w-4" />
                  Subscribe to Newsletter
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

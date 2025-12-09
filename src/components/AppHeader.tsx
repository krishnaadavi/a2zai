'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Zap, BookOpen, Newspaper, Sparkles, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AppHeader() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

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

    const navLinks = [
        { href: '/', label: 'AI Pulse', icon: Zap },
        { href: '/models', label: 'Models', icon: Brain },
        { href: '/research', label: 'Research', icon: BookOpen },
        { href: '/news', label: 'News', icon: Newspaper },
    ];

    return (
        <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4">
                {/* Main Header Row */}
                <div className="flex items-center justify-between py-3">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Open menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <div className="bg-gradient-to-br from-purple-500 to-cyan-500 p-1.5 rounded-lg">
                            <Brain className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg text-white hidden sm:block">A2Z AI</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-purple-600 text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Side - Subscribe Button */}
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg font-semibold text-sm">
                            <Sparkles className="h-4 w-4" />
                            <span className="hidden sm:inline">Subscribe</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="fixed top-0 left-0 h-full w-72 bg-gray-900 z-50 md:hidden shadow-2xl">
                        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="bg-gradient-to-br from-purple-500 to-cyan-500 p-1.5 rounded-lg">
                                    <Brain className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-bold text-lg text-white">A2Z AI</span>
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <nav className="p-4 space-y-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                            }`}
                                    >
                                        <link.icon className="h-5 w-5" />
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </>
            )}
        </header>
    );
}

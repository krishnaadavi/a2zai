'use client';

import Link from 'next/link';
import { Brain, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        explore: [
            { label: 'AI Pulse', href: '/' },
            { label: 'Models', href: '/models' },
            { label: 'Research', href: '/research' },
            { label: 'News', href: '/news' },
        ],
        resources: [
            { label: 'Newsletter', href: '#' },
            { label: 'About', href: '/about' },
        ],
    };

    return (
        <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 text-white mb-4">
                            <div className="bg-gradient-to-br from-purple-500 to-cyan-500 p-1.5 rounded-lg">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl">A2Z AI</span>
                        </Link>
                        <p className="text-gray-500 text-sm max-w-md mb-4">
                            Your A-to-Z guide to AI. Stay current in 5 minutes a day.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href="https://twitter.com/aionai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-purple-400 transition-colors"
                                aria-label="Follow on Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:hello@a2zai.ai"
                                className="text-gray-500 hover:text-purple-400 transition-colors"
                                aria-label="Email us"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2">
                            {footerLinks.explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-500 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-500 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-sm">
                            © {currentYear} A2Z AI. All rights reserved.
                        </p>
                        <p className="text-gray-600 text-xs text-center md:text-right">
                            Curated AI news, research, and insights.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

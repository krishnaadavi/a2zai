'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Twitter, Mail, Github, Linkedin, Sparkles, CheckCircle } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, dailyDigest: true }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  const footerLinks = {
    discover: [
      { label: 'News', href: '/news' },
      { label: 'Models', href: '/models' },
      { label: 'Research', href: '/research' },
      { label: 'Companies', href: '/companies' },
    ],
    learn: [
      { label: 'Learning Hub', href: '/learn' },
      { label: 'AI 101 Course', href: '/learn/101' },
      { label: 'Glossary', href: '/learn/glossary' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Newsletter', href: '/#newsletter' },
    ],
  };

  const socialLinks = [
    {
      label: 'Twitter',
      href: 'https://twitter.com/a2zai_news',
      icon: Twitter,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/a2zai',
      icon: Linkedin,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/a2zai',
      icon: Github,
    },
    {
      label: 'Email',
      href: 'mailto:hello@a2zai.ai',
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      {/* Newsletter CTA Banner */}
      <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg">Stay AI-current in 5 minutes</h3>
              <p className="text-gray-400 text-sm mt-1">Free daily digest. No spam, unsubscribe anytime.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>You&apos;re subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all disabled:opacity-50 flex items-center gap-2 text-sm whitespace-nowrap"
                >
                  {loading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Logo size="md" showTagline />
            </Link>
            <p className="text-gray-500 text-sm max-w-xs mb-6">
              Your A-to-Z guide to AI. Curated news, models, research, and byte-sized learning for
              busy professionals.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-900 text-gray-500 hover:text-purple-400 hover:bg-gray-800 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Discover Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Discover
            </h3>
            <ul className="space-y-3">
              {footerLinks.discover.map((link) => (
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

          {/* Learn Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Learn
            </h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
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

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {currentYear} A2Z AI. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs text-center md:text-right">
              Made with ❤️ for the AI-curious
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

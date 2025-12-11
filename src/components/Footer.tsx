'use client';

import Link from 'next/link';
import { Twitter, Mail, Github, Linkedin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

'use client';

import { useState } from 'react';
import { Share2, Twitter, Linkedin, Link2, Check, Mail } from 'lucide-react';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  variant?: 'icon' | 'button' | 'dropdown';
  className?: string;
}

export default function ShareButton({
  url,
  title,
  description,
  variant = 'dropdown',
  className = '',
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        // User cancelled or error
        if ((err as Error).name !== 'AbortError') {
          setIsOpen(true);
        }
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleNativeShare}
        className={`p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors ${className}`}
        title="Share"
      >
        <Share2 className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="py-1">
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                Twitter / X
              </a>

              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                LinkedIn
              </a>

              <a
                href={shareLinks.email}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Mail className="h-4 w-4 text-gray-400" />
                Email
              </a>

              <div className="border-t border-gray-700 my-1" />

              <button
                onClick={() => {
                  copyToClipboard();
                  setTimeout(() => setIsOpen(false), 1000);
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4 text-gray-400" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Inline share buttons for article pages
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500 text-sm mr-1">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-400 hover:text-[#1DA1F2] hover:bg-gray-800 rounded-lg transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-400 hover:text-[#0A66C2] hover:bg-gray-800 rounded-lg transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <CopyLinkButton url={url} />
    </div>
  );
}

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={copy}
      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
      title={copied ? 'Copied!' : 'Copy link'}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Link2 className="h-4 w-4" />
      )}
    </button>
  );
}

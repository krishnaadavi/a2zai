'use client';

import { useEffect, useState, useRef } from 'react';
import { SPOTLIGHT_COMPANIES } from '@/lib/companies';
import { MOCK_COMPANY_NEWS, type RSSItem } from '@/lib/company-rss';

interface CompanyTickerProps {
    news?: RSSItem[];
}

export default function CompanyTicker({ news = MOCK_COMPANY_NEWS }: CompanyTickerProps) {
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll animation
    useEffect(() => {
        const scroll = scrollRef.current;
        if (!scroll || isPaused) return;

        let animationId: number;
        let scrollPos = 0;

        const animate = () => {
            scrollPos += 0.5;
            if (scrollPos >= scroll.scrollWidth / 2) {
                scrollPos = 0;
            }
            scroll.scrollLeft = scrollPos;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused]);

    // Duplicate news items for seamless loop
    const displayNews = [...news, ...news];

    return (
        <div
            className="relative bg-gray-950 border-b border-gray-800 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-950 to-transparent z-10" />

            {/* Scrolling content */}
            <div
                ref={scrollRef}
                className="flex items-center gap-8 py-3 px-4 overflow-x-hidden whitespace-nowrap"
            >
                {displayNews.map((item, idx) => (
                    <a
                        key={`${item.id}-${idx}`}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity flex-shrink-0"
                    >
                        {/* Company badge */}
                        <span
                            className="px-2 py-0.5 rounded text-xs font-bold text-white"
                            style={{ backgroundColor: item.companyColor }}
                        >
                            {item.companyName}
                        </span>

                        {/* Headline */}
                        <span className="text-gray-300 max-w-[300px] truncate">
                            {item.title}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}

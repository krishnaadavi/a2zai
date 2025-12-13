import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { SPOTLIGHT_COMPANIES, type Company } from '@/lib/companies';
import { type RSSItem } from '@/lib/company-rss';
import { type StockQuote } from '@/lib/stocks';
import { CompanyLogo } from '@/components/logos/CompanyLogos';

interface CompanySpotlightProps {
    news: RSSItem[];
    stocks?: StockQuote[];
}

export default function CompanySpotlight({ news, stocks = [] }: CompanySpotlightProps) {
    // Get latest news per company
    const companyNews = SPOTLIGHT_COMPANIES.map(company => {
        const latestNews = news.find(n => n.companyId === company.id);
        const stock = stocks.find(s => s.companyId === company.id);

        return {
            company,
            news: latestNews,
            stock,
        };
    });

    return (
        <section className="py-8 md:py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">Company Spotlight</h2>
                    </div>
                    <Link
                        href="/companies"
                        className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                    >
                        View all <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Company Grid - Mobile: 2 cols, Tablet: 3 cols, Desktop: 6 cols */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    {companyNews.map(({ company, news: item, stock }) => (
                        <Link
                            key={company.id}
                            href="/companies"
                            className="group relative p-3 md:p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {/* Company Header */}
                            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                <CompanyLogo companyId={company.id} size={36} fallbackColor={company.color} />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold text-sm md:text-base truncate">
                                        {company.name}
                                    </h3>
                                    {stock && (
                                        <div className="flex items-center gap-1 text-xs">
                                            <span className="text-gray-500 hidden sm:inline">{stock.ticker}</span>
                                            <span className={stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                                                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Latest News or Focus Areas - Hidden on very small screens */}
                            <div className="hidden sm:block">
                                {item ? (
                                    <p className="text-gray-400 text-xs md:text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                                        {item.title}
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-1">
                                        {company.categories.slice(0, 2).map((cat) => (
                                            <span
                                                key={cat}
                                                className="text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-400"
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

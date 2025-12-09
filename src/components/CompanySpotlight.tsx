import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { SPOTLIGHT_COMPANIES, type Company } from '@/lib/companies';
import { type RSSItem } from '@/lib/company-rss';
import { type StockQuote } from '@/lib/stocks';

interface CompanySpotlightProps {
    news: RSSItem[];
    stocks?: StockQuote[];
}

// Map company logos to inline SVGs for now
const CompanyLogo = ({ company }: { company: Company }) => {
    // Simplified logo representations using gradients/text
    return (
        <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: company.color }}
        >
            {company.name.charAt(0)}
        </div>
    );
};

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
        <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Company Spotlight</h2>
                    </div>
                    <span className="text-gray-500 text-sm">AI industry leaders</span>
                </div>

                {/* Company Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {companyNews.map(({ company, news: item, stock }) => (
                        <div
                            key={company.id}
                            className="group relative p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all hover:scale-[1.02]"
                        >
                            {/* Company Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <CompanyLogo company={company} />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold truncate">{company.name}</h3>
                                    {stock && (
                                        <div className="flex items-center gap-1 text-xs">
                                            <span className="text-gray-500">{stock.ticker}</span>
                                            <span className={stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                                                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Latest News */}
                            {item ? (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                                        {item.title}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Read more</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </div>
                                </a>
                            ) : (
                                <p className="text-gray-600 text-sm italic">No recent updates</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

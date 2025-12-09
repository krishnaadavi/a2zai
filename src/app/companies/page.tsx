import { Metadata } from 'next';
import { Building2, TrendingUp, TrendingDown, ExternalLink, Twitter, Rss, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AI_COMPANIES, type Company } from '@/lib/companies';
import { fetchAIStocks, MOCK_STOCK_DATA } from '@/lib/stocks';
import { fetchAllCompanyNews, MOCK_COMPANY_NEWS, type RSSItem } from '@/lib/company-rss';
import { CompanyLogo } from '@/components/logos/CompanyLogos';

export const metadata: Metadata = {
    title: 'AI Companies | A2Z AI',
    description: 'Track AI industry leaders: NVIDIA, Meta, Google, OpenAI, Anthropic, Microsoft and more.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function CompaniesPage() {
    const [stocks, companyNews] = await Promise.all([
        fetchAIStocks().catch(() => MOCK_STOCK_DATA),
        fetchAllCompanyNews(2).catch(() => MOCK_COMPANY_NEWS),
    ]);

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 via-pink-900/20 to-gray-900 py-8 md:py-12 px-4 border-b border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                            <Building2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-white">AI Companies</h1>
                    </div>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl">
                        Track the companies shaping the future of AI. From chip makers to model providers,
                        stay informed about industry leaders.
                    </p>
                </div>
            </section>

            {/* Company Grid */}
            <section className="py-8 md:py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Mobile: Single column, Tablet+: Two columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {AI_COMPANIES.map((company) => {
                            const stock = stocks.find(s => s.companyId === company.id);
                            const news = companyNews.filter(n => n.companyId === company.id).slice(0, 2);

                            return (
                                <div
                                    key={company.id}
                                    className="group p-4 md:p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/30 transition-all"
                                >
                                    {/* Header */}
                                    <div className="flex items-start gap-3 md:gap-4 mb-4">
                                        <CompanyLogo companyId={company.id} size={48} fallbackColor={company.color} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                                                <h2 className="text-lg md:text-xl font-bold text-white">{company.name}</h2>
                                                {company.ticker && (
                                                    <span className="text-gray-500 text-sm font-mono">{company.ticker}</span>
                                                )}
                                            </div>

                                            {/* Stock */}
                                            {stock && (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-white font-mono text-sm md:text-base">${stock.price.toFixed(2)}</span>
                                                    <span className={`flex items-center gap-1 text-xs md:text-sm ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                                                        }`}>
                                                        {stock.changePercent >= 0 ? (
                                                            <TrendingUp className="h-3 w-3" />
                                                        ) : (
                                                            <TrendingDown className="h-3 w-3" />
                                                        )}
                                                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm mb-3 md:mb-4">
                                        {company.description}
                                    </p>

                                    {/* Categories - Horizontal scroll on mobile */}
                                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                                        {company.categories.slice(0, 4).map((cat) => (
                                            <span
                                                key={cat}
                                                className="flex-shrink-0 px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs"
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Latest News */}
                                    {news.length > 0 && (
                                        <div className="border-t border-gray-800 pt-3 md:pt-4 mt-3 md:mt-4">
                                            <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-2">Latest Updates</h3>
                                            <div className="space-y-2">
                                                {news.map((item) => (
                                                    <a
                                                        key={item.id}
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block text-sm text-gray-300 hover:text-purple-300 transition-colors line-clamp-1"
                                                    >
                                                        → {item.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Links */}
                                    <div className="flex items-center gap-4 mt-4 pt-3 md:pt-4 border-t border-gray-800">
                                        {company.twitterHandle && (
                                            <a
                                                href={`https://twitter.com/${company.twitterHandle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-gray-500 hover:text-purple-400 transition-colors text-sm"
                                            >
                                                <Twitter className="h-4 w-4" />
                                                <span className="hidden sm:inline">Twitter</span>
                                            </a>
                                        )}
                                        {company.rssFeed && (
                                            <a
                                                href={company.rssFeed}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-gray-500 hover:text-purple-400 transition-colors text-sm"
                                            >
                                                <Rss className="h-4 w-4" />
                                                <span className="hidden sm:inline">Blog</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

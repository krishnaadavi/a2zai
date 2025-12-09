// A2Z AI - RSS Feed Fetcher
// Fetches company blog posts via RSS

import { getCompanyById, AI_COMPANIES, type Company } from './companies';

export interface RSSItem {
    id: string;
    title: string;
    link: string;
    pubDate: string;
    description: string;
    companyId: string;
    companyName: string;
    companyColor: string;
}

// Parse RSS XML to items
function parseRSS(xml: string, company: Company): RSSItem[] {
    const items: RSSItem[] = [];

    // Simple regex parsing for RSS items
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/;
    const linkRegex = /<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/;
    const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/;
    const descRegex = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/;

    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
        const itemXml = match[1];

        const titleMatch = titleRegex.exec(itemXml);
        const linkMatch = linkRegex.exec(itemXml);
        const pubDateMatch = pubDateRegex.exec(itemXml);
        const descMatch = descRegex.exec(itemXml);

        if (titleMatch && linkMatch) {
            items.push({
                id: `${company.id}-${items.length}`,
                title: titleMatch[1].trim(),
                link: linkMatch[1].trim(),
                pubDate: pubDateMatch?.[1] || new Date().toISOString(),
                description: descMatch?.[1]?.replace(/<[^>]*>/g, '').slice(0, 200) || '',
                companyId: company.id,
                companyName: company.name,
                companyColor: company.color,
            });
        }
    }

    return items;
}

// Fetch RSS feed for a company
export async function fetchCompanyRSS(companyId: string, limit = 5): Promise<RSSItem[]> {
    const company = getCompanyById(companyId);
    if (!company?.rssFeed) {
        return [];
    }

    try {
        const response = await fetch(company.rssFeed, {
            headers: { 'User-Agent': 'A2Z-AI/1.0' },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            console.error(`Failed to fetch RSS for ${company.name}: ${response.status}`);
            return [];
        }

        const xml = await response.text();
        return parseRSS(xml, company).slice(0, limit);
    } catch (error) {
        console.error(`Error fetching RSS for ${company.name}:`, error);
        return [];
    }
}

// Fetch RSS from all companies with feeds
export async function fetchAllCompanyNews(limit = 3): Promise<RSSItem[]> {
    const companiesWithFeeds = AI_COMPANIES.filter(c => c.rssFeed);

    const allItems = await Promise.all(
        companiesWithFeeds.map(c => fetchCompanyRSS(c.id, limit))
    );

    // Flatten and sort by date
    return allItems
        .flat()
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

// Mock data for development/fallback
export const MOCK_COMPANY_NEWS: RSSItem[] = [
    {
        id: 'nvidia-1',
        title: 'NVIDIA Announces Next-Gen Blackwell GPUs for AI Training',
        link: 'https://blogs.nvidia.com/blog/blackwell-ai/',
        pubDate: new Date().toISOString(),
        description: 'New Blackwell architecture delivers 4x performance improvement for large language model training...',
        companyId: 'nvidia',
        companyName: 'NVIDIA',
        companyColor: '#76B900',
    },
    {
        id: 'meta-1',
        title: 'Introducing Llama 3.3: Smaller, Faster, Smarter',
        link: 'https://ai.meta.com/blog/llama-3-3/',
        pubDate: new Date(Date.now() - 3600000).toISOString(),
        description: 'Our latest Llama model achieves GPT-4 performance in a 70B parameter package...',
        companyId: 'meta',
        companyName: 'Meta',
        companyColor: '#0866FF',
    },
    {
        id: 'openai-1',
        title: 'GPT-4 Turbo with Vision Now Available in API',
        link: 'https://openai.com/blog/gpt-4-turbo-vision/',
        pubDate: new Date(Date.now() - 7200000).toISOString(),
        description: 'Developers can now access multimodal capabilities with our latest API update...',
        companyId: 'openai',
        companyName: 'OpenAI',
        companyColor: '#10A37F',
    },
    {
        id: 'google-1',
        title: 'Gemini 2.0: Our Most Capable Model Yet',
        link: 'https://blog.google/technology/ai/gemini-2/',
        pubDate: new Date(Date.now() - 10800000).toISOString(),
        description: 'Gemini 2.0 introduces native multimodal reasoning and improved context windows...',
        companyId: 'google',
        companyName: 'Google',
        companyColor: '#4285F4',
    },
    {
        id: 'anthropic-1',
        title: 'Claude 3.5 Sonnet: New Benchmarks in Code Generation',
        link: 'https://www.anthropic.com/news/claude-3-5-sonnet',
        pubDate: new Date(Date.now() - 14400000).toISOString(),
        description: 'Claude 3.5 Sonnet sets new records on SWE-bench and HumanEval...',
        companyId: 'anthropic',
        companyName: 'Anthropic',
        companyColor: '#D4A27F',
    },
    {
        id: 'microsoft-1',
        title: 'Azure AI Studio: Enterprise RAG Made Simple',
        link: 'https://blogs.microsoft.com/ai/azure-ai-studio/',
        pubDate: new Date(Date.now() - 18000000).toISOString(),
        description: 'New Azure AI Studio features make building RAG applications easier than ever...',
        companyId: 'microsoft',
        companyName: 'Microsoft',
        companyColor: '#00A4EF',
    },
];

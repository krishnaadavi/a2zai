// NewsData.io API Client
// Free tier: 200 requests/day

interface NewsDataArticle {
    article_id: string;
    title: string;
    link: string;
    description: string | null;
    pubDate: string;
    source_name: string;
    source_url: string;
    category: string[];
    keywords: string[] | null;
    image_url: string | null;
    ai_tag?: string;
    sentiment?: string;
}

interface NewsDataResponse {
    status: string;
    totalResults: number;
    results: NewsDataArticle[];
    nextPage?: string;
}

export interface AINewsItem {
    id: string;
    title: string;
    url: string;
    description: string;
    source: string;
    publishedAt: string;
    category: string;
    readTime: string;
    imageUrl?: string;
}

// Estimate read time based on description length
function estimateReadTime(description: string | null): string {
    if (!description) return '2 min';
    const words = description.split(/\s+/).length;
    const minutes = Math.max(2, Math.ceil(words / 200));
    return `${minutes} min`;
}

// Map NewsData categories to our categories
function mapCategory(categories: string[], keywords: string[] | null): string {
    const allTags = [...categories, ...(keywords || [])].map(s => s.toLowerCase());

    if (allTags.some(t => t.includes('llm') || t.includes('language model') || t.includes('gpt') || t.includes('claude'))) {
        return 'LLMs';
    }
    if (allTags.some(t => t.includes('open source') || t.includes('opensource') || t.includes('llama') || t.includes('mistral'))) {
        return 'Open Source';
    }
    if (allTags.some(t => t.includes('research') || t.includes('paper') || t.includes('study'))) {
        return 'Research';
    }
    if (allTags.some(t => t.includes('regulation') || t.includes('policy') || t.includes('law') || t.includes('government'))) {
        return 'Policy';
    }
    if (allTags.some(t => t.includes('startup') || t.includes('funding') || t.includes('acquisition'))) {
        return 'Business';
    }
    if (allTags.some(t => t.includes('robot') || t.includes('automation'))) {
        return 'Robotics';
    }
    if (allTags.some(t => t.includes('image') || t.includes('vision') || t.includes('diffusion') || t.includes('midjourney'))) {
        return 'Vision';
    }

    return 'AI News';
}

export async function fetchAINews(limit: number = 10): Promise<AINewsItem[]> {
    const apiKey = process.env.NEWSDATA_API_KEY;

    if (!apiKey) {
        console.warn('[newsdata] NEWSDATA_API_KEY not set, returning mock data');
        return getMockNews();
    }

    console.log(`[newsdata] API key found, fetching ${limit} articles...`);

    try {
        // Search for AI-related news
        const query = encodeURIComponent('artificial intelligence OR machine learning OR LLM OR GPT OR AI');
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${query}&language=en&category=technology,science&size=${limit}`;

        // IMPORTANT: No caching - always fetch fresh data
        const response = await fetch(url, {
            cache: 'no-store', // Disable all caching
        });

        console.log(`[newsdata] API response status: ${response.status}`);

        if (!response.ok) {
            console.error(`[newsdata] API HTTP error: ${response.status} ${response.statusText}`);
            return getMockNews();
        }

        const data: NewsDataResponse = await response.json();

        console.log(`[newsdata] API status: ${data.status}, results: ${data.results?.length || 0}`);

        if (data.status !== 'success' || !data.results) {
            console.error('[newsdata] API returned non-success status:', data);
            return getMockNews();
        }

        return data.results.map(article => ({
            id: article.article_id,
            title: article.title,
            url: article.link,
            description: article.description || '',
            source: article.source_name,
            publishedAt: article.pubDate,
            category: mapCategory(article.category, article.keywords),
            readTime: estimateReadTime(article.description),
            imageUrl: article.image_url || undefined,
        }));
    } catch (error) {
        console.error('[newsdata] Fetch error:', error);
        return getMockNews();
    }
}

// Mock data for development / fallback
function getMockNews(): AINewsItem[] {
    console.warn('[newsdata] Returning mock data');
    return [
        {
            id: '1',
            title: 'OpenAI announces GPT-5 with improved reasoning capabilities',
            url: 'https://example.com/1',
            description: 'The latest model shows significant improvements in multi-step reasoning and factual accuracy.',
            source: 'TechCrunch',
            publishedAt: new Date().toISOString(),
            category: 'LLMs',
            readTime: '3 min',
        },
        {
            id: '2',
            title: "Google DeepMind's Gemini 2.0 achieves new benchmarks in multimodal AI",
            url: 'https://example.com/2',
            description: 'The updated model excels at understanding images, video, and audio together.',
            source: 'The Verge',
            publishedAt: new Date().toISOString(),
            category: 'Research',
            readTime: '4 min',
        },
        {
            id: '3',
            title: 'Anthropic releases Claude 3.5 with improved coding abilities',
            url: 'https://example.com/3',
            description: 'New features include better code generation and debugging capabilities.',
            source: 'VentureBeat',
            publishedAt: new Date().toISOString(),
            category: 'LLMs',
            readTime: '2 min',
        },
        {
            id: '4',
            title: 'Meta open-sources Llama 3.2 with 90B parameter version',
            url: 'https://example.com/4',
            description: 'The largest open-source model yet challenges proprietary alternatives.',
            source: 'Ars Technica',
            publishedAt: new Date().toISOString(),
            category: 'Open Source',
            readTime: '5 min',
        },
        {
            id: '5',
            title: 'AI regulation debate heats up in EU parliament',
            url: 'https://example.com/5',
            description: 'New amendments propose stricter controls on AI development and deployment.',
            source: 'Reuters',
            publishedAt: new Date().toISOString(),
            category: 'Policy',
            readTime: '4 min',
        },
    ];
}

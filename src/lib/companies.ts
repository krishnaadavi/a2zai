// A2Z AI - Company Registry
// Tracks AI-focused companies for news aggregation

export interface Company {
    id: string;
    name: string;
    ticker?: string; // Stock ticker if public
    logo: string; // SVG or URL
    color: string; // Brand color for badges
    rssFeed?: string; // Company blog RSS
    twitterHandle?: string;
    categories: string[]; // AI focus areas
    description: string;
}

export const AI_COMPANIES: Company[] = [
    {
        id: 'nvidia',
        name: 'NVIDIA',
        ticker: 'NVDA',
        logo: '/logos/nvidia.svg',
        color: '#76B900',
        rssFeed: 'https://blogs.nvidia.com/feed/',
        twitterHandle: 'nvidia',
        categories: ['GPUs', 'CUDA', 'Infrastructure', 'Hardware'],
        description: 'Leading AI chip manufacturer powering ML/AI infrastructure',
    },
    {
        id: 'meta',
        name: 'Meta',
        ticker: 'META',
        logo: '/logos/meta.svg',
        color: '#0866FF',
        rssFeed: 'https://ai.meta.com/blog/rss/',
        twitterHandle: 'MetaAI',
        categories: ['LLMs', 'Open Source', 'PyTorch', 'Research'],
        description: 'Creator of Llama, PyTorch, and open-source AI research',
    },
    {
        id: 'google',
        name: 'Google',
        ticker: 'GOOGL',
        logo: '/logos/google.svg',
        color: '#4285F4',
        rssFeed: 'https://blog.google/technology/ai/rss/',
        twitterHandle: 'GoogleAI',
        categories: ['Gemini', 'DeepMind', 'TPUs', 'Research'],
        description: 'Google AI, DeepMind, and Gemini model family',
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        ticker: 'MSFT',
        logo: '/logos/microsoft.svg',
        color: '#00A4EF',
        rssFeed: 'https://blogs.microsoft.com/ai/feed/',
        twitterHandle: 'MSFTResearch',
        categories: ['Azure AI', 'Copilot', 'OpenAI Partner', 'Enterprise'],
        description: 'Azure AI services, Copilot, and OpenAI partnership',
    },
    {
        id: 'openai',
        name: 'OpenAI',
        ticker: undefined, // Private
        logo: '/logos/openai.svg',
        color: '#10A37F',
        rssFeed: 'https://openai.com/blog/rss/',
        twitterHandle: 'OpenAI',
        categories: ['GPT', 'ChatGPT', 'DALL-E', 'Research'],
        description: 'Creators of GPT-4, ChatGPT, and DALL-E',
    },
    {
        id: 'anthropic',
        name: 'Anthropic',
        ticker: undefined, // Private
        logo: '/logos/anthropic.svg',
        color: '#D4A27F',
        rssFeed: 'https://www.anthropic.com/news/rss',
        twitterHandle: 'AnthropicAI',
        categories: ['Claude', 'Safety', 'Constitutional AI', 'Research'],
        description: 'AI safety company, creators of Claude',
    },
    {
        id: 'amazon',
        name: 'Amazon',
        ticker: 'AMZN',
        logo: '/logos/amazon.svg',
        color: '#FF9900',
        twitterHandle: 'awscloud',
        categories: ['Bedrock', 'SageMaker', 'Alexa', 'Cloud'],
        description: 'AWS AI services, Bedrock, and enterprise ML',
    },
    {
        id: 'apple',
        name: 'Apple',
        ticker: 'AAPL',
        logo: '/logos/apple.svg',
        color: '#A2AAAD',
        twitterHandle: 'Apple',
        categories: ['Apple Intelligence', 'MLX', 'On-device AI', 'Privacy'],
        description: 'Apple Intelligence and on-device ML with MLX',
    },
    {
        id: 'xai',
        name: 'xAI',
        ticker: undefined, // Private (Elon's company)
        logo: '/logos/xai.svg',
        color: '#FFFFFF',
        twitterHandle: 'xaboratory',
        categories: ['Grok', 'LLMs', 'Research'],
        description: 'Elon Musk\'s AI company, creators of Grok',
    },
    {
        id: 'mistral',
        name: 'Mistral AI',
        ticker: undefined, // Private
        logo: '/logos/mistral.svg',
        color: '#F7D046',
        twitterHandle: 'MistralAI',
        categories: ['Open Weights', 'LLMs', 'European AI'],
        description: 'European AI lab with high-performance open models',
    },
];

// Tier 1 companies for MVP spotlight
export const SPOTLIGHT_COMPANIES = AI_COMPANIES.filter(c =>
    ['nvidia', 'meta', 'google', 'microsoft', 'openai', 'anthropic'].includes(c.id)
);

// Companies with stock tickers for stock widget
export const PUBLIC_COMPANIES = AI_COMPANIES.filter(c => c.ticker);

// Get company by ID
export function getCompanyById(id: string): Company | undefined {
    return AI_COMPANIES.find(c => c.id === id);
}

// Get company by name (fuzzy match)
export function getCompanyByName(name: string): Company | undefined {
    const lower = name.toLowerCase();
    return AI_COMPANIES.find(c =>
        c.name.toLowerCase().includes(lower) ||
        lower.includes(c.name.toLowerCase())
    );
}

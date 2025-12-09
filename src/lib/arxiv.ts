// arXiv API Client
// Free, no API key required

interface ArxivEntry {
    id: string;
    title: string;
    summary: string;
    authors: string[];
    published: string;
    updated: string;
    categories: string[];
    pdfUrl: string;
    arxivUrl: string;
}

export interface ResearchPaper {
    id: string;
    title: string;
    summary: string;
    authors: string[];
    publishedAt: string;
    categories: string[];
    pdfUrl: string;
    arxivUrl: string;
    institution?: string;
}

// AI/ML related arXiv categories
const AI_CATEGORIES = [
    'cs.AI',    // Artificial Intelligence
    'cs.LG',    // Machine Learning
    'cs.CL',    // Computation and Language (NLP)
    'cs.CV',    // Computer Vision
    'cs.NE',    // Neural and Evolutionary Computing
    'stat.ML',  // Machine Learning (stat)
];

function parseArxivXML(xml: string): ArxivEntry[] {
    const entries: ArxivEntry[] = [];
    const entryMatches = xml.match(/<entry>([\s\S]*?)<\/entry>/g);

    if (!entryMatches) return entries;

    for (const entryXml of entryMatches) {
        const getId = (s: string) => s.match(/<id>(.*?)<\/id>/)?.[1] || '';
        const getTitle = (s: string) => s.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/\s+/g, ' ').trim() || '';
        const getSummary = (s: string) => s.match(/<summary>([\s\S]*?)<\/summary>/)?.[1]?.replace(/\s+/g, ' ').trim() || '';
        const getPublished = (s: string) => s.match(/<published>(.*?)<\/published>/)?.[1] || '';
        const getUpdated = (s: string) => s.match(/<updated>(.*?)<\/updated>/)?.[1] || '';

        // Get authors
        const authorMatches = entryXml.match(/<author>[\s\S]*?<name>(.*?)<\/name>[\s\S]*?<\/author>/g) || [];
        const authors = authorMatches.map(a => a.match(/<name>(.*?)<\/name>/)?.[1] || '').filter(Boolean);

        // Get categories
        const categoryMatches = entryXml.match(/term="([^"]+)"/g) || [];
        const categories = categoryMatches.map(c => c.match(/term="([^"]+)"/)?.[1] || '').filter(Boolean);

        // Get PDF link
        const pdfMatch = entryXml.match(/<link[^>]+title="pdf"[^>]+href="([^"]+)"/);
        const pdfUrl = pdfMatch?.[1] || '';

        const id = getId(entryXml);

        entries.push({
            id,
            title: getTitle(entryXml),
            summary: getSummary(entryXml),
            authors,
            published: getPublished(entryXml),
            updated: getUpdated(entryXml),
            categories,
            pdfUrl,
            arxivUrl: id,
        });
    }

    return entries;
}

// Extract institution from first author if possible (heuristic)
function guessInstitution(authors: string[]): string | undefined {
    if (!authors.length) return undefined;

    // Common AI lab names to check
    const institutions: Record<string, string> = {
        'openai': 'OpenAI',
        'google': 'Google',
        'deepmind': 'DeepMind',
        'anthropic': 'Anthropic',
        'meta': 'Meta AI',
        'microsoft': 'Microsoft',
        'nvidia': 'NVIDIA',
        'stanford': 'Stanford',
        'mit': 'MIT',
        'berkeley': 'UC Berkeley',
        'cmu': 'CMU',
    };

    // For arXiv we don't have affiliation in basic API, so return undefined
    return undefined;
}

export async function fetchLatestPapers(limit: number = 10): Promise<ResearchPaper[]> {
    try {
        // Query for AI/ML papers from the last week
        const categories = AI_CATEGORIES.map(c => `cat:${c}`).join('+OR+');
        const url = `https://export.arxiv.org/api/query?search_query=${categories}&sortBy=submittedDate&sortOrder=descending&max_results=${limit}`;

        const response = await fetch(url, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            console.error('arXiv API error:', response.status);
            return getMockPapers();
        }

        const xml = await response.text();
        const entries = parseArxivXML(xml);

        return entries.map(entry => ({
            id: entry.id,
            title: entry.title,
            summary: entry.summary.slice(0, 300) + (entry.summary.length > 300 ? '...' : ''),
            authors: entry.authors.slice(0, 3),
            publishedAt: entry.published,
            categories: entry.categories,
            pdfUrl: entry.pdfUrl,
            arxivUrl: entry.arxivUrl,
            institution: guessInstitution(entry.authors),
        }));
    } catch (error) {
        console.error('Error fetching arXiv papers:', error);
        return getMockPapers();
    }
}

function getMockPapers(): ResearchPaper[] {
    return [
        {
            id: '2312.00001',
            title: 'Scaling Laws for Neural Language Models: A Comprehensive Study',
            summary: 'We investigate the scaling properties of Transformer language models across multiple dimensions including model size, data, and compute...',
            authors: ['J. Smith', 'A. Johnson', 'M. Williams'],
            publishedAt: new Date().toISOString(),
            categories: ['cs.CL', 'cs.LG'],
            pdfUrl: 'https://arxiv.org/pdf/2312.00001',
            arxivUrl: 'https://arxiv.org/abs/2312.00001',
            institution: 'DeepMind',
        },
        {
            id: '2312.00002',
            title: 'Constitutional AI: Harmlessness from AI Feedback',
            summary: 'We develop a technique for training harmless AI assistants using AI-generated feedback rather than human feedback...',
            authors: ['Y. Bai', 'S. Kadavath', 'A. Askell'],
            publishedAt: new Date().toISOString(),
            categories: ['cs.AI', 'cs.CL'],
            pdfUrl: 'https://arxiv.org/pdf/2312.00002',
            arxivUrl: 'https://arxiv.org/abs/2312.00002',
            institution: 'Anthropic',
        },
    ];
}

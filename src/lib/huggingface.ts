// HuggingFace Hub API Client
// Free tier available

export interface HFModel {
    id: string;
    modelId: string;
    name: string;
    author: string;
    downloads: number;
    likes: number;
    trending?: number;
    tags: string[];
    pipelineTag?: string;
    lastModified: string;
}

export interface TrendingModel {
    name: string;
    provider: string;
    trend: string;
    downloads: number;
    type: string;
    url: string;
}

export type TrendingModelsResult = {
    data: TrendingModel[];
    source: 'huggingface' | 'fallback';
    updatedAt: string;
};

interface HFAPIModel {
    _id: string;
    id: string;
    author: string;
    downloads: number;
    likes: number;
    tags: string[];
    pipeline_tag?: string;
    lastModified: string;
    trending_score?: number;
}

// Map pipeline tags to friendly names
function getPipelineType(pipelineTag?: string): string {
    const typeMap: Record<string, string> = {
        'text-generation': 'LLM',
        'text2text-generation': 'LLM',
        'text-classification': 'NLP',
        'token-classification': 'NLP',
        'question-answering': 'NLP',
        'summarization': 'NLP',
        'translation': 'NLP',
        'conversational': 'Chat',
        'image-classification': 'Vision',
        'object-detection': 'Vision',
        'image-segmentation': 'Vision',
        'image-to-text': 'Vision',
        'text-to-image': 'Image Gen',
        'image-to-image': 'Image Gen',
        'audio-classification': 'Audio',
        'automatic-speech-recognition': 'ASR',
        'text-to-speech': 'TTS',
        'feature-extraction': 'Embeddings',
    };

    return typeMap[pipelineTag || ''] || 'AI Model';
}

// Calculate trend percentage (mock - based on likes)
function calculateTrend(likes: number, downloads: number): string {
    const score = Math.min(30, Math.round((likes / Math.max(1, downloads)) * 1000));
    return `+${score}%`;
}

export async function fetchTrendingModelsDetailed(limit: number = 10): Promise<TrendingModelsResult> {
    try {
        const safeLimit = Math.min(Math.max(limit, 1), 50);
        // Use broad trending feed to avoid stale text-only filter.
        const url = `https://huggingface.co/api/models?sort=trendingScore&direction=-1&limit=${safeLimit}`;
        const headers: HeadersInit = process.env.HUGGINGFACE_API_KEY
            ? { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` }
            : {};

        const response = await fetch(url, {
            headers,
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('HuggingFace API error:', response.status);
            return {
                data: getMockModels(),
                source: 'fallback',
                updatedAt: new Date().toISOString(),
            };
        }

        const models: HFAPIModel[] = await response.json();

        return {
            data: models.map(model => ({
                name: model.id.split('/').pop() || model.id,
                provider: model.author || model.id.split('/')[0] || 'HuggingFace',
                trend: calculateTrend(model.likes, model.downloads),
                downloads: model.downloads,
                type: getPipelineType(model.pipeline_tag),
                url: `https://huggingface.co/${model.id}`,
            })),
            source: 'huggingface',
            updatedAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error('Error fetching HuggingFace models:', error);
        return {
            data: getMockModels(),
            source: 'fallback',
            updatedAt: new Date().toISOString(),
        };
    }
}

export async function fetchTrendingModels(limit: number = 10): Promise<TrendingModel[]> {
    const result = await fetchTrendingModelsDetailed(limit);
    return result.data;
}

// Fetch specific categories of models
export async function fetchModelsByCategory(
    category: 'llm' | 'vision' | 'audio' | 'multimodal',
    limit: number = 5
): Promise<TrendingModel[]> {
    const filterMap = {
        llm: 'text-generation',
        vision: 'image-classification',
        audio: 'automatic-speech-recognition',
        multimodal: 'image-to-text',
    };

    try {
        const filter = filterMap[category];
        const url = `https://huggingface.co/api/models?sort=downloads&direction=-1&limit=${limit}&filter=${filter}`;

        const response = await fetch(url, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            return getMockModels().slice(0, limit);
        }

        const models: HFAPIModel[] = await response.json();

        return models.map(model => ({
            name: model.id.split('/').pop() || model.id,
            provider: model.author,
            trend: calculateTrend(model.likes, model.downloads),
            downloads: model.downloads,
            type: getPipelineType(model.pipeline_tag),
            url: `https://huggingface.co/${model.id}`,
        }));
    } catch (error) {
        console.error('Error fetching models by category:', error);
        return getMockModels().slice(0, limit);
    }
}

function getMockModels(): TrendingModel[] {
    return [
        {
            name: 'GPT-4o',
            provider: 'OpenAI',
            trend: '+12%',
            downloads: 0,
            type: 'LLM',
            url: 'https://openai.com/gpt-4',
        },
        {
            name: 'Claude 3.5 Sonnet',
            provider: 'Anthropic',
            trend: '+8%',
            downloads: 0,
            type: 'LLM',
            url: 'https://anthropic.com/claude',
        },
        {
            name: 'Gemini Pro',
            provider: 'Google',
            trend: '+5%',
            downloads: 0,
            type: 'Multimodal',
            url: 'https://deepmind.google/gemini',
        },
        {
            name: 'Llama 3.2',
            provider: 'Meta',
            trend: '+15%',
            downloads: 5_000_000,
            type: 'LLM',
            url: 'https://huggingface.co/meta-llama/Llama-3.2-3B',
        },
        {
            name: 'Mistral 7B',
            provider: 'Mistral AI',
            trend: '+10%',
            downloads: 3_000_000,
            type: 'LLM',
            url: 'https://huggingface.co/mistralai/Mistral-7B-v0.1',
        },
    ];
}

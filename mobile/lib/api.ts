import { NewsArticle, GlossaryTerm, AIModel, AITool } from './types';
import { fetchWithCache } from './cache';

const API_BASE = 'https://www.a2zai.ai';

async function fetchAPI<T>(path: string, options?: RequestInit & { token?: string }): Promise<T> {
  const { token, ...fetchOptions } = options || {};
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...fetchOptions,
    headers,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Cache TTLs
const FIVE_MIN = 5 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;

// ── News (cached 5 min) ──────────────────────────────
export async function getNews(params?: {
  category?: string;
  page?: number;
  limit?: number;
}): Promise<{ articles: NewsArticle[]; totalPages: number }> {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  const qs = query.toString();
  const cacheKey = `news_${qs || 'default'}`;

  const raw: any = await fetchWithCache(cacheKey, () => fetchAPI(`/api/news${qs ? `?${qs}` : ''}`), FIVE_MIN);

  // Map API response shape { success, data, count } to expected { articles, totalPages }
  const items = raw?.data ?? raw?.articles ?? (Array.isArray(raw) ? raw : []);
  const articles: NewsArticle[] = items.map((a: any) => ({
    id: a.id ?? '',
    title: a.title ?? '',
    description: a.description ?? '',
    source: a.source ?? '',
    category: a.category ?? '',
    pubDate: a.publishedAt ?? a.pubDate ?? '',
    link: a.url ?? a.link ?? '',
    imageUrl: a.imageUrl,
  }));

  return { articles, totalPages: Math.ceil((raw?.count ?? articles.length) / (params?.limit ?? 10)) };
}

// ── Glossary (cached 24h — content rarely changes) ───
export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  const raw: any = await fetchWithCache('glossary_all', () => fetchAPI('/api/glossary'), ONE_DAY);
  const items = raw?.data ?? (Array.isArray(raw) ? raw : []);
  return items.map((t: any) => ({
    id: t.slug ?? t.id ?? '',
    term: t.term ?? '',
    definition: t.shortDef ?? t.definition ?? '',
    category: t.category ?? '',
    difficulty: t.difficulty ?? 'beginner',
    relatedTerms: t.relatedTerms,
  }));
}

export async function getGlossaryTerm(slug: string): Promise<GlossaryTerm> {
  return fetchWithCache(
    `glossary_${slug}`,
    () => fetchAPI(`/api/glossary?term=${encodeURIComponent(slug)}`),
    ONE_DAY
  );
}

// ── Models (cached 1h) ───────────────────────────────
export async function getModels(): Promise<AIModel[]> {
  const raw: any = await fetchWithCache('models', () => fetchAPI('/api/models'), ONE_HOUR);
  const items = raw?.data ?? (Array.isArray(raw) ? raw : []);
  return items.map((m: any) => ({
    id: m.id ?? m.name ?? '',
    name: m.name ?? '',
    author: m.provider ?? m.author ?? '',
    downloads: m.downloads ?? 0,
    likes: m.likes ?? 0,
    pipeline_tag: m.type ?? m.pipeline_tag,
    description: m.description,
  }));
}

// ── Search (not cached) ──────────────────────────────
export async function search(query: string): Promise<{ results: any[] }> {
  return fetchAPI(`/api/search?q=${encodeURIComponent(query)}`);
}

// ── User endpoints (authenticated, not cached) ───────
export async function getUserProgress(token: string) {
  return fetchAPI('/api/user/progress', { token });
}

export async function saveArticle(token: string, articleId: string, title: string, url: string, source: string) {
  return fetchAPI('/api/user/saved', {
    method: 'POST',
    token,
    body: JSON.stringify({ articleId, title, url, source }),
  });
}

export async function getSavedArticles(token: string) {
  return fetchAPI('/api/user/saved', { token });
}

// ── Tools (cached 24h) ──────────────────────────────
export async function getTools(): Promise<AITool[]> {
  return fetchWithCache('tools', () => fetchAPI('/api/tools'), ONE_DAY);
}

import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://a2zai.ai';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/models`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/companies`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn/101`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Dynamic pages - Glossary terms
  let glossaryPages: MetadataRoute.Sitemap = [];
  try {
    const glossaryTerms = await prisma.glossaryTerm.findMany({
      select: { slug: true, updatedAt: true },
    });

    glossaryPages = glossaryTerms.map((term) => ({
      url: `${baseUrl}/learn/glossary/${term.slug}`,
      lastModified: term.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Failed to fetch glossary terms for sitemap:', error);
  }

  // Dynamic pages - Explainers
  let explainerPages: MetadataRoute.Sitemap = [];
  try {
    const explainers = await prisma.explainer.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    explainerPages = explainers.map((explainer) => ({
      url: `${baseUrl}/learn/101/${explainer.slug}`,
      lastModified: explainer.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Failed to fetch explainers for sitemap:', error);
  }

  return [...staticPages, ...glossaryPages, ...explainerPages];
}

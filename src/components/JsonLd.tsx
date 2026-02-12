type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Glossary Term structured data
export function GlossaryTermJsonLd({
  term,
  definition,
  url,
}: {
  term: string;
  definition: string;
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    url: url,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'A2Z AI Glossary',
      url: 'https://a2zai.ai/learn/glossary',
    },
  };

  return <JsonLd data={data} />;
}

// Article/Explainer structured data
export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = 'A2Z AI',
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://a2zai.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'A2Z AI',
      url: 'https://a2zai.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://a2zai.ai/icon',
      },
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };

  return <JsonLd data={data} />;
}

// Course structured data for AI 101
export function CourseJsonLd({
  name,
  description,
  url,
  provider = 'A2Z AI',
}: {
  name: string;
  description: string;
  url: string;
  provider?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: name,
    description: description,
    url: url,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://a2zai.ai',
    },
    isAccessibleForFree: true,
    educationalLevel: 'Beginner',
  };

  return <JsonLd data={data} />;
}

// Website structured data for homepage
export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'A2Z AI',
    alternateName: 'A2Z AI - AI Intelligence for Builders and Investors',
    url: 'https://a2zai.ai',
    description: 'Track AI companies, funding, model releases, and market signals in one intelligence feed.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://a2zai.ai/learn/glossary?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={data} />;
}

// Organization structured data
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'A2Z AI',
    url: 'https://a2zai.ai',
    logo: 'https://a2zai.ai/icon',
    sameAs: [
      'https://twitter.com/a2zai_news',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://a2zai.ai',
    },
  };

  return <JsonLd data={data} />;
}

// FAQ structured data
export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

// Breadcrumb structured data
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

// ItemList for comparison/collection pages
export function ItemListJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; description?: string; url?: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: name,
    description: description,
    url: url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.description && { description: item.description }),
      ...(item.url && { url: item.url }),
    })),
  };

  return <JsonLd data={data} />;
}

// HowTo for prompts/guides
export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return <JsonLd data={data} />;
}

// Product comparison
export function ComparisonJsonLd({
  products,
}: {
  products: { name: string; description: string; brand: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Model Comparison',
    description: 'Comparison of leading AI models including features, pricing, and capabilities',
    url: 'https://a2zai.ai/compare',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: product.name,
        description: product.description,
        applicationCategory: 'Artificial Intelligence',
        operatingSystem: 'Web',
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        url: product.url,
      },
    })),
  };

  return <JsonLd data={data} />;
}

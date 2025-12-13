import { Metadata } from 'next';
import Link from 'next/link';
import {
  GitCompare,
  Check,
  X,
  Minus,
  Zap,
  DollarSign,
  Brain,
  Code,
  Image,
  Lock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ShareButtons } from '@/components/ShareButton';
import { ComparisonJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'AI Model Comparison | GPT-4 vs Claude vs Gemini vs Llama | A2Z AI',
  description: 'Compare leading AI models side-by-side. GPT-4, Claude 3.5, Gemini Pro, Llama 3, and more. Features, pricing, capabilities, and use cases.',
};

type FeatureValue = boolean | string | 'partial';

interface Model {
  id: string;
  name: string;
  provider: string;
  color: string;
  description: string;
  releaseDate: string;
  pricing: {
    input: string;
    output: string;
    free?: boolean;
  };
  contextWindow: string;
  features: Record<string, FeatureValue>;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
  url: string;
}

const models: Model[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    color: 'from-emerald-500 to-green-600',
    description: 'OpenAI\'s most capable multimodal model with vision, audio, and text.',
    releaseDate: 'May 2024',
    pricing: {
      input: '$2.50/1M tokens',
      output: '$10/1M tokens',
      free: true,
    },
    contextWindow: '128K tokens',
    features: {
      'Text Generation': true,
      'Code Generation': true,
      'Vision/Images': true,
      'Audio Input': true,
      'Audio Output': true,
      'Video Understanding': 'partial',
      'Web Browsing': true,
      'Function Calling': true,
      'JSON Mode': true,
      'File Upload': true,
      'API Access': true,
      'Fine-tuning': true,
      'Local Deployment': false,
    },
    strengths: [
      'Best-in-class multimodal capabilities',
      'Native audio understanding and generation',
      'Fast response times',
      'Large ecosystem and integrations',
    ],
    weaknesses: [
      'Higher cost than alternatives',
      'No local deployment option',
      'Knowledge cutoff limitations',
    ],
    bestFor: ['General-purpose AI assistant', 'Multimodal applications', 'Enterprise integrations'],
    url: 'https://openai.com/gpt-4',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    color: 'from-orange-500 to-amber-600',
    description: 'Anthropic\'s most intelligent model, excellent for complex reasoning and coding.',
    releaseDate: 'June 2024',
    pricing: {
      input: '$3/1M tokens',
      output: '$15/1M tokens',
      free: true,
    },
    contextWindow: '200K tokens',
    features: {
      'Text Generation': true,
      'Code Generation': true,
      'Vision/Images': true,
      'Audio Input': false,
      'Audio Output': false,
      'Video Understanding': false,
      'Web Browsing': false,
      'Function Calling': true,
      'JSON Mode': true,
      'File Upload': true,
      'API Access': true,
      'Fine-tuning': false,
      'Local Deployment': false,
    },
    strengths: [
      'Exceptional at coding tasks',
      'Longest context window (200K)',
      'Strong reasoning and analysis',
      'Best-in-class safety alignment',
    ],
    weaknesses: [
      'No native audio capabilities',
      'No web browsing in base model',
      'No fine-tuning available yet',
    ],
    bestFor: ['Complex coding projects', 'Long document analysis', 'Research and writing'],
    url: 'https://anthropic.com/claude',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    color: 'from-blue-500 to-indigo-600',
    description: 'Google\'s flagship model with the largest context window available.',
    releaseDate: 'February 2024',
    pricing: {
      input: '$1.25/1M tokens',
      output: '$5/1M tokens',
      free: true,
    },
    contextWindow: '2M tokens',
    features: {
      'Text Generation': true,
      'Code Generation': true,
      'Vision/Images': true,
      'Audio Input': true,
      'Audio Output': false,
      'Video Understanding': true,
      'Web Browsing': true,
      'Function Calling': true,
      'JSON Mode': true,
      'File Upload': true,
      'API Access': true,
      'Fine-tuning': true,
      'Local Deployment': false,
    },
    strengths: [
      'Massive 2M token context window',
      'Native video understanding',
      'Competitive pricing',
      'Strong Google integration',
    ],
    weaknesses: [
      'Inconsistent quality on some tasks',
      'Less refined than GPT-4/Claude',
      'Regional availability limitations',
    ],
    bestFor: ['Very long documents', 'Video analysis', 'Google Workspace integration'],
    url: 'https://deepmind.google/gemini',
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    color: 'from-purple-500 to-violet-600',
    description: 'Meta\'s open-weights model, available for local deployment and customization.',
    releaseDate: 'July 2024',
    pricing: {
      input: 'Free (self-hosted)',
      output: 'Free (self-hosted)',
      free: true,
    },
    contextWindow: '128K tokens',
    features: {
      'Text Generation': true,
      'Code Generation': true,
      'Vision/Images': false,
      'Audio Input': false,
      'Audio Output': false,
      'Video Understanding': false,
      'Web Browsing': false,
      'Function Calling': true,
      'JSON Mode': true,
      'File Upload': 'partial',
      'API Access': true,
      'Fine-tuning': true,
      'Local Deployment': true,
    },
    strengths: [
      'Free and open-weights',
      'Full local deployment possible',
      'Unlimited fine-tuning',
      'No API rate limits (self-hosted)',
    ],
    weaknesses: [
      'Requires significant compute for hosting',
      'No native multimodal support',
      'Less capable than GPT-4/Claude',
    ],
    bestFor: ['Self-hosted applications', 'Privacy-sensitive use cases', 'Custom fine-tuning'],
    url: 'https://llama.meta.com',
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large 2',
    provider: 'Mistral AI',
    color: 'from-rose-500 to-pink-600',
    description: 'European AI lab\'s flagship model with strong multilingual capabilities.',
    releaseDate: 'July 2024',
    pricing: {
      input: '$2/1M tokens',
      output: '$6/1M tokens',
      free: false,
    },
    contextWindow: '128K tokens',
    features: {
      'Text Generation': true,
      'Code Generation': true,
      'Vision/Images': false,
      'Audio Input': false,
      'Audio Output': false,
      'Video Understanding': false,
      'Web Browsing': false,
      'Function Calling': true,
      'JSON Mode': true,
      'File Upload': true,
      'API Access': true,
      'Fine-tuning': true,
      'Local Deployment': true,
    },
    strengths: [
      'Excellent multilingual support',
      'Strong code generation',
      'EU data residency options',
      'Competitive pricing',
    ],
    weaknesses: [
      'No multimodal capabilities',
      'Smaller ecosystem',
      'Less brand recognition',
    ],
    bestFor: ['European compliance needs', 'Multilingual applications', 'Cost-effective deployment'],
    url: 'https://mistral.ai',
  },
  {
    id: 'grok-2',
    name: 'Grok 2',
    provider: 'xAI',
    color: 'from-gray-500 to-slate-600',
    description: 'xAI\'s model with real-time X/Twitter data access and witty personality.',
    releaseDate: 'August 2024',
    pricing: {
      input: '$2/1M tokens',
      output: '$10/1M tokens',
      free: false,
    },
    contextWindow: '128K tokens',
    features: {
      'Text Generation': true,
      'Code Generation': true,
      'Vision/Images': true,
      'Audio Input': false,
      'Audio Output': false,
      'Video Understanding': false,
      'Web Browsing': true,
      'Function Calling': true,
      'JSON Mode': true,
      'File Upload': true,
      'API Access': true,
      'Fine-tuning': false,
      'Local Deployment': false,
    },
    strengths: [
      'Real-time X/Twitter data access',
      'More permissive content policies',
      'Fast inference speed',
      'Unique personality options',
    ],
    weaknesses: [
      'Smaller training data',
      'Limited integrations',
      'Newer with less track record',
    ],
    bestFor: ['Real-time information', 'Social media analysis', 'Creative content'],
    url: 'https://x.ai',
  },
];

const featureList = [
  'Text Generation',
  'Code Generation',
  'Vision/Images',
  'Audio Input',
  'Audio Output',
  'Video Understanding',
  'Web Browsing',
  'Function Calling',
  'JSON Mode',
  'File Upload',
  'API Access',
  'Fine-tuning',
  'Local Deployment',
];

function FeatureIcon({ value }: { value: FeatureValue }) {
  if (value === true) {
    return <Check className="h-5 w-5 text-green-400" />;
  }
  if (value === false) {
    return <X className="h-5 w-5 text-red-400/50" />;
  }
  return <Minus className="h-5 w-5 text-yellow-400" />;
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <ComparisonJsonLd
        products={models.map((m) => ({
          name: m.name,
          description: m.description,
          brand: m.provider,
          url: m.url,
        }))}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-6">
            <GitCompare className="h-4 w-4" />
            Updated December 2024
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            AI Model <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Comparison</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Compare GPT-4, Claude, Gemini, Llama, and more. Find the right model for your use case.
          </p>
          <ShareButtons url="https://a2zai.ai/compare" title="AI Model Comparison - A2Z AI" />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
              <div className="text-3xl font-bold text-white">{models.length}</div>
              <div className="text-sm text-gray-400">Models Compared</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
              <div className="text-3xl font-bold text-white">{featureList.length}</div>
              <div className="text-sm text-gray-400">Features Tracked</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
              <div className="text-3xl font-bold text-emerald-400">2M</div>
              <div className="text-sm text-gray-400">Max Context (Gemini)</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
              <div className="text-3xl font-bold text-purple-400">Free</div>
              <div className="text-sm text-gray-400">Open Models (Llama)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Brain className="h-6 w-6 text-purple-400" />
            Model Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <div
                key={model.id}
                className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${model.color} text-white mb-2`}>
                      {model.provider}
                    </div>
                    <h3 className="text-xl font-bold text-white">{model.name}</h3>
                  </div>
                  <a
                    href={model.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <p className="text-gray-400 text-sm mb-4">{model.description}</p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    <div className="text-xs text-gray-500 mb-1">Context</div>
                    <div className="text-sm font-semibold text-white">{model.contextWindow}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    <div className="text-xs text-gray-500 mb-1">Input Price</div>
                    <div className="text-sm font-semibold text-white">{model.pricing.input}</div>
                  </div>
                </div>

                {/* Best For */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Best for:</div>
                  <div className="flex flex-wrap gap-1">
                    {model.bestFor.map((use) => (
                      <span key={use} className="px-2 py-1 text-xs rounded bg-gray-800 text-gray-300">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Features */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {model.features['Vision/Images'] === true && (
                    <span className="flex items-center gap-1">
                      <Image className="h-3 w-3" /> Vision
                    </span>
                  )}
                  {model.features['Code Generation'] === true && (
                    <span className="flex items-center gap-1">
                      <Code className="h-3 w-3" /> Code
                    </span>
                  )}
                  {model.features['Local Deployment'] === true && (
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Local
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GitCompare className="h-6 w-6 text-blue-400" />
            Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium sticky left-0 bg-gray-950">Feature</th>
                  {models.map((model) => (
                    <th key={model.id} className="text-center py-4 px-3 min-w-[100px]">
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${model.color} text-white`}>
                        {model.name.split(' ')[0]}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureList.map((feature, idx) => (
                  <tr key={feature} className={idx % 2 === 0 ? 'bg-gray-900/30' : ''}>
                    <td className="py-3 px-4 text-gray-300 text-sm sticky left-0 bg-inherit">{feature}</td>
                    {models.map((model) => (
                      <td key={`${model.id}-${feature}`} className="text-center py-3 px-3">
                        <div className="flex justify-center">
                          <FeatureIcon value={model.features[feature]} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" /> Supported
            </div>
            <div className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-yellow-400" /> Partial
            </div>
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-400/50" /> Not available
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-green-400" />
            Pricing Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Model</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Input Price</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Output Price</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Free Tier</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Context</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, idx) => (
                  <tr key={model.id} className={`border-b border-gray-800/50 ${idx % 2 === 0 ? 'bg-gray-900/30' : ''}`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${model.color}`} />
                        <span className="text-white font-medium">{model.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{model.pricing.input}</td>
                    <td className="py-4 px-4 text-gray-300">{model.pricing.output}</td>
                    <td className="py-4 px-4">
                      {model.pricing.free ? (
                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">Available</span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-gray-800 text-gray-500 text-xs">Paid only</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-300">{model.contextWindow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Strengths & Weaknesses */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Zap className="h-6 w-6 text-yellow-400" />
            Strengths & Weaknesses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((model) => (
              <div key={model.id} className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${model.color}`} />
                  <h3 className="text-lg font-bold text-white">{model.name}</h3>
                  <span className="text-sm text-gray-500">{model.provider}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-green-400 mb-2">Strengths</div>
                    <ul className="space-y-1">
                      {model.strengths.map((s) => (
                        <li key={s} className="text-sm text-gray-400 flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-400 mb-2">Limitations</div>
                    <ul className="space-y-1">
                      {model.weaknesses.map((w) => (
                        <li key={w} className="text-sm text-gray-400 flex items-start gap-2">
                          <X className="h-4 w-4 text-red-400/50 flex-shrink-0 mt-0.5" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900/20 to-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to try these models?</h2>
          <p className="text-gray-400 mb-8">
            Explore our tools directory to find applications built on these models, or learn more in our AI 101 course.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
            >
              Browse AI Tools <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Explore Use Cases
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

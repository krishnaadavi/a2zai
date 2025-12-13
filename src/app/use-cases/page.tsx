import { Metadata } from 'next';
import Link from 'next/link';
import {
  Code,
  PenTool,
  Briefcase,
  GraduationCap,
  Scale,
  LineChart,
  Headphones,
  Camera,
  Search,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ShareButtons } from '@/components/ShareButton';

export const metadata: Metadata = {
  title: 'AI Use Cases | A2Z AI',
  description: 'Discover practical AI applications across industries. Real-world use cases for developers, marketers, writers, researchers, and more.',
};

const useCaseCategories = [
  {
    id: 'development',
    name: 'Software Development',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    description: 'Code faster, debug smarter, ship better software',
    useCases: [
      {
        title: 'Code Generation',
        description: 'Generate boilerplate, functions, and entire features from natural language descriptions.',
        tools: ['GitHub Copilot', 'Cursor', 'Claude', 'GPT-4'],
        example: '"Write a React hook that fetches user data with loading and error states"',
      },
      {
        title: 'Code Review & Bug Detection',
        description: 'Get AI-powered code reviews, find bugs, and identify security vulnerabilities.',
        tools: ['Cursor', 'Claude', 'CodeRabbit', 'Snyk'],
        example: 'Paste code and ask "Are there any bugs or security issues in this code?"',
      },
      {
        title: 'Documentation Generation',
        description: 'Auto-generate docstrings, README files, and API documentation.',
        tools: ['Mintlify', 'Claude', 'GPT-4'],
        example: '"Generate comprehensive JSDoc comments for this module"',
      },
      {
        title: 'Code Refactoring',
        description: 'Modernize legacy code, improve performance, and apply best practices.',
        tools: ['Cursor', 'Claude', 'GPT-4'],
        example: '"Refactor this class component to a modern React functional component with hooks"',
      },
    ],
  },
  {
    id: 'writing',
    name: 'Writing & Content',
    icon: PenTool,
    color: 'from-purple-500 to-pink-500',
    description: 'Create, edit, and optimize content at scale',
    useCases: [
      {
        title: 'Blog & Article Writing',
        description: 'Draft blog posts, articles, and long-form content with AI assistance.',
        tools: ['Claude', 'GPT-4', 'Jasper', 'Copy.ai'],
        example: '"Write a 1500-word blog post about the future of remote work"',
      },
      {
        title: 'Editing & Proofreading',
        description: 'Improve clarity, fix grammar, and enhance writing style.',
        tools: ['Claude', 'Grammarly', 'GPT-4'],
        example: '"Edit this draft for clarity and conciseness while maintaining my voice"',
      },
      {
        title: 'SEO Content Optimization',
        description: 'Optimize content for search engines while keeping it readable.',
        tools: ['Surfer SEO', 'Clearscope', 'Claude'],
        example: '"Optimize this article for the keyword \'AI productivity tools\'"',
      },
      {
        title: 'Social Media Content',
        description: 'Create engaging posts, threads, and captions for social platforms.',
        tools: ['Claude', 'GPT-4', 'Buffer AI'],
        example: '"Turn this blog post into a Twitter thread with hooks"',
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing & Sales',
    icon: LineChart,
    color: 'from-orange-500 to-red-500',
    description: 'Generate leads, personalize outreach, and optimize campaigns',
    useCases: [
      {
        title: 'Email Campaign Writing',
        description: 'Craft compelling email sequences, subject lines, and CTAs.',
        tools: ['Claude', 'GPT-4', 'Lavender', 'Copy.ai'],
        example: '"Write a 5-email nurture sequence for SaaS trial users"',
      },
      {
        title: 'Ad Copy Generation',
        description: 'Create high-converting ad copy for Google, Facebook, and LinkedIn.',
        tools: ['Claude', 'GPT-4', 'Anyword'],
        example: '"Write 10 variations of Google ad copy for our project management tool"',
      },
      {
        title: 'Market Research',
        description: 'Analyze competitors, identify trends, and summarize market data.',
        tools: ['Perplexity', 'Claude', 'GPT-4'],
        example: '"Analyze the competitive landscape for AI writing tools in 2024"',
      },
      {
        title: 'Personalized Outreach',
        description: 'Generate personalized cold emails and LinkedIn messages at scale.',
        tools: ['Claude', 'GPT-4', 'Instantly', 'Apollo'],
        example: '"Write a personalized cold email to a VP of Engineering based on their LinkedIn"',
      },
    ],
  },
  {
    id: 'research',
    name: 'Research & Analysis',
    icon: Search,
    color: 'from-emerald-500 to-teal-500',
    description: 'Synthesize information, analyze data, and accelerate discovery',
    useCases: [
      {
        title: 'Literature Review',
        description: 'Summarize research papers, identify key findings, and spot gaps.',
        tools: ['Claude', 'Perplexity', 'Elicit', 'Consensus'],
        example: '"Summarize the key findings from these 10 papers on transformer efficiency"',
      },
      {
        title: 'Data Analysis',
        description: 'Analyze datasets, generate insights, and create visualizations.',
        tools: ['Claude', 'GPT-4 + Code Interpreter', 'Julius AI'],
        example: '"Analyze this CSV and identify the top 3 factors affecting customer churn"',
      },
      {
        title: 'Competitive Intelligence',
        description: 'Monitor competitors, track industry trends, and synthesize reports.',
        tools: ['Perplexity', 'Claude', 'Crayon'],
        example: '"What new features have our top 5 competitors launched in the past quarter?"',
      },
      {
        title: 'Survey Analysis',
        description: 'Analyze open-ended survey responses and extract themes.',
        tools: ['Claude', 'GPT-4', 'MonkeyLearn'],
        example: '"Categorize these 500 customer feedback responses into themes"',
      },
    ],
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    icon: Headphones,
    color: 'from-indigo-500 to-purple-500',
    description: 'Scale support, reduce response times, and improve satisfaction',
    useCases: [
      {
        title: 'Chatbots & Virtual Agents',
        description: 'Deploy AI chatbots to handle common customer queries 24/7.',
        tools: ['Intercom Fin', 'Zendesk AI', 'Dialogflow'],
        example: 'AI handles "How do I reset my password?" while escalating complex issues',
      },
      {
        title: 'Response Drafting',
        description: 'Draft professional responses to customer emails and tickets.',
        tools: ['Claude', 'GPT-4', 'Freshdesk AI'],
        example: '"Draft a response to this angry customer complaint about shipping delays"',
      },
      {
        title: 'Knowledge Base Creation',
        description: 'Generate and maintain help articles and FAQs.',
        tools: ['Claude', 'GPT-4', 'Notion AI'],
        example: '"Create a help article explaining how to set up two-factor authentication"',
      },
      {
        title: 'Sentiment Analysis',
        description: 'Analyze customer sentiment across tickets, reviews, and social media.',
        tools: ['Claude', 'MonkeyLearn', 'Brandwatch'],
        example: '"Analyze sentiment trends in our support tickets from the past month"',
      },
    ],
  },
  {
    id: 'education',
    name: 'Education & Learning',
    icon: GraduationCap,
    color: 'from-yellow-500 to-orange-500',
    description: 'Personalized tutoring, content creation, and skill development',
    useCases: [
      {
        title: 'Personalized Tutoring',
        description: 'Get 1-on-1 explanations tailored to your learning style and level.',
        tools: ['Claude', 'GPT-4', 'Khan Academy AI', 'Khanmigo'],
        example: '"Explain quantum entanglement like I\'m a high school student"',
      },
      {
        title: 'Course Content Creation',
        description: 'Generate lesson plans, quizzes, and educational materials.',
        tools: ['Claude', 'GPT-4', 'Coursera AI'],
        example: '"Create a 6-week curriculum for an intro to machine learning course"',
      },
      {
        title: 'Language Learning',
        description: 'Practice conversations, get corrections, and learn vocabulary.',
        tools: ['Claude', 'GPT-4', 'Duolingo Max'],
        example: '"Have a conversation with me in Spanish about my weekend plans"',
      },
      {
        title: 'Study Assistance',
        description: 'Summarize textbooks, create flashcards, and explain concepts.',
        tools: ['Claude', 'GPT-4', 'Quizlet AI'],
        example: '"Create 20 flashcards from this chapter on cellular biology"',
      },
    ],
  },
  {
    id: 'legal',
    name: 'Legal',
    icon: Scale,
    color: 'from-slate-500 to-gray-600',
    description: 'Contract analysis, research, and document drafting',
    useCases: [
      {
        title: 'Contract Review',
        description: 'Analyze contracts for risks, unusual clauses, and missing terms.',
        tools: ['Claude', 'Harvey', 'Spellbook'],
        example: '"Review this NDA and flag any clauses that are unusual or risky"',
      },
      {
        title: 'Legal Research',
        description: 'Research case law, statutes, and legal precedents.',
        tools: ['Claude', 'Westlaw Edge', 'Casetext'],
        example: '"Find relevant case law on software licensing disputes in California"',
      },
      {
        title: 'Document Drafting',
        description: 'Draft legal documents, agreements, and correspondence.',
        tools: ['Claude', 'Harvey', 'GPT-4'],
        example: '"Draft a simple services agreement for a consulting engagement"',
      },
      {
        title: 'Due Diligence',
        description: 'Analyze large document sets for M&A and compliance reviews.',
        tools: ['Kira', 'Luminance', 'Claude'],
        example: 'Analyze 1000 contracts to extract key terms and identify risks',
      },
    ],
  },
  {
    id: 'creative',
    name: 'Creative & Design',
    icon: Camera,
    color: 'from-pink-500 to-rose-500',
    description: 'Generate images, videos, and creative assets',
    useCases: [
      {
        title: 'Image Generation',
        description: 'Create custom images, illustrations, and artwork from text.',
        tools: ['Midjourney', 'DALL-E 3', 'Stable Diffusion'],
        example: '"A minimalist logo for a tech startup, blue and white, clean design"',
      },
      {
        title: 'Video Creation',
        description: 'Generate video content, animations, and visual effects.',
        tools: ['Runway', 'Pika', 'Sora', 'HeyGen'],
        example: '"Create a 10-second product demo video from these screenshots"',
      },
      {
        title: 'Music & Audio',
        description: 'Generate music, sound effects, and audio content.',
        tools: ['Suno', 'Udio', 'Stable Audio'],
        example: '"Create a 60-second upbeat background track for a YouTube video"',
      },
      {
        title: 'Design Assistance',
        description: 'Get design feedback, generate variations, and iterate faster.',
        tools: ['Claude', 'GPT-4V', 'Figma AI'],
        example: '"Review this landing page design and suggest improvements"',
      },
    ],
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            Practical Applications
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Use Cases</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-world applications of AI across industries. Discover how professionals are using AI to work smarter.
          </p>
          <div className="mt-6">
            <ShareButtons url="https://a2zai.ai/use-cases" title="AI Use Cases - A2Z AI" />
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-6 px-4 border-b border-gray-800 sticky top-0 bg-gray-950/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {useCaseCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-3 py-1.5 rounded-full text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {useCaseCategories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>

              {/* Use Cases Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>

                    {/* Example */}
                    <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 mb-4">
                      <p className="text-xs text-gray-500 mb-1">Example prompt:</p>
                      <p className="text-sm text-gray-300 italic">{useCase.example}</p>
                    </div>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2">
                      {useCase.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 text-xs rounded bg-gray-800 text-gray-400"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900/20 to-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to get started with AI?</h2>
          <p className="text-gray-400 mb-8">
            Learn the fundamentals with our AI 101 course, or explore our comprehensive glossary.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/learn/101/what-is-ai"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-colors"
            >
              Start AI 101 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/glossary"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Browse Glossary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

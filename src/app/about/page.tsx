import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  Target,
  Users,
  BookOpen,
  Sparkles,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: 'About | A2Z AI',
  description:
    'Learn about A2Z AI, the intelligence platform for tracking AI companies, funding, and model releases.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Curated, Not Comprehensive',
      description: 'Top 5 stories daily, not 500. We filter the noise so you get signal.',
    },
    {
      icon: Clock,
      title: 'Byte-Sized Learning',
      description: 'Complex AI topics explained simply. Understand in minutes, not hours.',
    },
    {
      icon: Users,
      title: 'For Everyone',
      description: "No PhD required. AI literacy for professionals whose work is being transformed.",
    },
    {
      icon: Zap,
      title: 'One Place',
      description: 'News, models, research, and learning — all in one curated destination.',
    },
  ];

  const features = [
    'Daily AI news digest with the top 5 stories that matter',
    'Trending AI models from Hugging Face and beyond',
    'Latest research papers simplified from arXiv',
    'AI company news and market movements',
    'Glossary of 100+ AI terms explained simply',
    'AI 101 course for beginners',
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-16 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto relative text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showTagline />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            AI Intelligence for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Builders and Investors
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We turn AI noise into decision-ready signals across companies, startups, funding, and model ecosystems.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-4">
              <Sparkles className="h-4 w-4" />
              Our Mission
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Making AI Accessible to Everyone
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              AI is transforming every industry. Whether you&apos;re a marketer, teacher, healthcare
              worker, or business owner, understanding AI isn&apos;t optional anymore — it&apos;s essential.
              But who has time to track every launch, round, and model update manually?
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
            <p className="text-2xl text-white font-semibold mb-2">
              &ldquo;Track what changed in AI, every day&rdquo;
            </p>
            <p className="text-gray-500">
              That&apos;s our promise. We identify signal so you can make better decisions faster.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Makes Us Different</h2>
            <p className="text-gray-400">Our approach to AI intelligence and education</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/30 transition-colors"
              >
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl w-fit mb-4">
                  <value.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What You&apos;ll Find Here</h2>
            <p className="text-gray-400">Everything you need to track and understand the AI landscape</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 p-4">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Build your edge with high-signal AI intelligence and practical learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg"
            >
              <Sparkles className="h-5 w-5" />
              Open Intelligence Feed
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
            >
              Start Learning
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

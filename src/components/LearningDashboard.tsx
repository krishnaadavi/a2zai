'use client';

import { useSession } from 'next-auth/react';
import { BookOpen, GraduationCap, BookMarked, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';

interface LearningDashboardProps {
  variant?: 'full' | 'compact';
  totalGlossary?: number;
  totalExplainers?: number;
}

export default function LearningDashboard({
  variant = 'full',
  totalGlossary = 100,
  totalExplainers = 6,
}: LearningDashboardProps) {
  const { data: session } = useSession();
  const { stats, loading } = useProgress();

  if (!session?.user) {
    return (
      <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-2">Track Your Progress</h3>
        <p className="text-gray-400 text-sm mb-4">
          Sign in to track your learning progress across glossary terms and AI 101 lessons.
        </p>
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Sign in to start
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 animate-pulse">
        <div className="h-6 w-40 bg-gray-800 rounded mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gray-800 rounded" />
          <div className="h-20 bg-gray-800 rounded" />
        </div>
      </div>
    );
  }

  const glossaryCompleted = stats?.glossary.completed || 0;
  const explainerCompleted = stats?.explainer.completed || 0;
  const glossaryPercent = Math.round((glossaryCompleted / totalGlossary) * 100);
  const explainerPercent = Math.round((explainerCompleted / totalExplainers) * 100);
  const totalCompleted = glossaryCompleted + explainerCompleted;

  if (variant === 'compact') {
    return (
      <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-400" />
            Your Progress
          </h3>
          <Link href="/profile" className="text-xs text-purple-400 hover:text-purple-300">
            View all
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Glossary</span>
              <span>{glossaryCompleted}/{totalGlossary}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all"
                style={{ width: `${glossaryPercent}%` }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>AI 101</span>
              <span>{explainerCompleted}/{totalExplainers}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                style={{ width: `${explainerPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Learning Progress
        </h3>
        {totalCompleted > 0 && (
          <span className="text-sm text-green-400 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            {totalCompleted} completed
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Glossary Progress */}
        <Link
          href="/learn/glossary"
          className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BookMarked className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                AI Glossary
              </h4>
              <p className="text-xs text-gray-500">{totalGlossary} terms</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">{glossaryCompleted} completed</span>
            <span className="text-purple-400 font-medium">{glossaryPercent}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all"
              style={{ width: `${glossaryPercent}%` }}
            />
          </div>
        </Link>

        {/* AI 101 Progress */}
        <Link
          href="/learn/101"
          className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <GraduationCap className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-medium group-hover:text-green-300 transition-colors">
                AI 101 Course
              </h4>
              <p className="text-xs text-gray-500">{totalExplainers} lessons</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">{explainerCompleted} completed</span>
            <span className="text-green-400 font-medium">{explainerPercent}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
              style={{ width: `${explainerPercent}%` }}
            />
          </div>
        </Link>
      </div>

      {totalCompleted === 0 && (
        <p className="text-center text-gray-500 text-sm mt-4">
          Start learning to track your progress!
        </p>
      )}
    </div>
  );
}

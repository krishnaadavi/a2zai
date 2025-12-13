'use client';

import { useState, useMemo } from 'react';
import {
  GraduationCap,
  Clock,
  ExternalLink,
  Star,
  Users,
  Award,
  Filter,
  Search,
  BookOpen,
  Play,
  Code,
  FileText,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import {
  COURSES,
  COURSE_PLATFORMS,
  COURSE_TOPICS,
  LEARNING_PATHS,
  getFeaturedCourses,
  getCourseById,
  type Course,
  type LearningPath,
} from '@/lib/courses-data';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;
const PRICES = ['Free', 'Freemium', 'Paid'] as const;

function FormatIcon({ format }: { format: Course['format'] }) {
  switch (format) {
    case 'Video':
      return <Play className="h-3 w-3" />;
    case 'Interactive':
      return <Code className="h-3 w-3" />;
    case 'Text':
      return <FileText className="h-3 w-3" />;
    case 'Project-Based':
      return <BookOpen className="h-3 w-3" />;
    default:
      return null;
  }
}

function CourseCard({ course }: { course: Course }) {
  return (
    <a
      href={course.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
              {course.platform}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                course.price === 'Free'
                  ? 'bg-green-500/20 text-green-300'
                  : course.price === 'Freemium'
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {course.price}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </div>
        <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
      </div>

      {/* Instructor */}
      <p className="text-sm text-gray-500 mb-2">by {course.instructor}</p>

      {/* Description */}
      <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{course.description}</p>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {course.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-4">
          <span
            className={`px-2 py-0.5 rounded text-xs ${
              course.level === 'Beginner'
                ? 'bg-green-500/10 text-green-400'
                : course.level === 'Intermediate'
                ? 'bg-yellow-500/10 text-yellow-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {course.level}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {course.duration}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {course.rating && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              {course.rating}
            </span>
          )}
          {course.certificate && (
            <span title="Certificate available">
              <Award className="h-4 w-4 text-cyan-400" />
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

function LearningPathCard({ path }: { path: LearningPath }) {
  const courses = path.courses.map(getCourseById).filter(Boolean) as Course[];

  return (
    <div className="p-5 rounded-xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/20">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-bold text-white">{path.title}</h3>
        <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
          {path.level}
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-4">{path.description}</p>

      {/* Course List */}
      <div className="space-y-2 mb-4">
        {courses.map((course, idx) => (
          <a
            key={course.id}
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group"
          >
            <span className="text-xs text-gray-500 w-5">{idx + 1}.</span>
            <span className="text-sm text-gray-300 group-hover:text-purple-300 flex-1 truncate">
              {course.title}
            </span>
            <span className="text-xs text-gray-500">{course.platform}</span>
          </a>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {path.duration}
        </span>
        <span>{path.courses.length} courses</span>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredCourses = useMemo(() => {
    let courses = [...COURSES];

    if (selectedLevel) {
      courses = courses.filter((c) => c.level === selectedLevel);
    }

    if (selectedPlatform) {
      courses = courses.filter((c) => c.platform === selectedPlatform);
    }

    if (selectedTopic) {
      courses = courses.filter((c) => c.topics.includes(selectedTopic));
    }

    if (selectedPrice) {
      courses = courses.filter((c) => c.price === selectedPrice);
    }

    if (showFreeOnly) {
      courses = courses.filter((c) => c.price === 'Free');
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.instructor.toLowerCase().includes(query) ||
          c.topics.some((t) => t.toLowerCase().includes(query))
      );
    }

    return courses;
  }, [selectedLevel, selectedPlatform, selectedTopic, selectedPrice, showFreeOnly, searchQuery]);

  const featuredCourses = getFeaturedCourses();

  const clearFilters = () => {
    setSelectedLevel(null);
    setSelectedPlatform(null);
    setSelectedTopic(null);
    setSelectedPrice(null);
    setShowFreeOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedLevel || selectedPlatform || selectedTopic || selectedPrice || showFreeOnly || searchQuery;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8 md:py-12 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">AI Course Directory</h1>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-6">
            Curated collection of the best AI and machine learning courses from top universities
            and platforms. From beginner to advanced, free to paid.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
              <BookOpen className="h-4 w-4 text-purple-400" />
              <span className="text-gray-300">{COURSES.length} courses</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
              <span className="text-green-400">Free:</span>
              <span className="text-gray-300">
                {COURSES.filter((c) => c.price === 'Free').length}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
              <Award className="h-4 w-4 text-cyan-400" />
              <span className="text-gray-300">
                {COURSES.filter((c) => c.certificate).length} with certificates
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-8 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ChevronRight className="h-5 w-5 text-purple-400" />
            Learning Paths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEARNING_PATHS.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 px-4 border-b border-gray-800 sticky top-16 bg-gray-950/95 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search courses, topics, instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm"
              />
            </div>

            {/* Level */}
            <select
              value={selectedLevel || ''}
              onChange={(e) => setSelectedLevel(e.target.value || null)}
              className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50"
            >
              <option value="">All Levels</option>
              {LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            {/* Platform */}
            <select
              value={selectedPlatform || ''}
              onChange={(e) => setSelectedPlatform(e.target.value || null)}
              className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50"
            >
              <option value="">All Platforms</option>
              {COURSE_PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>

            {/* Topic */}
            <select
              value={selectedTopic || ''}
              onChange={(e) => setSelectedTopic(e.target.value || null)}
              className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50"
            >
              <option value="">All Topics</option>
              {COURSE_TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            {/* Free Only Toggle */}
            <button
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showFreeOnly
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-white'
              }`}
            >
              Free Only
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {!hasActiveFilters && (
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Featured Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Courses */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {hasActiveFilters ? `${filteredCourses.length} Results` : 'All Courses'}
            </h2>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No courses match your filters.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Start Learning Today</h2>
          <p className="text-gray-400 mb-6">
            Not sure where to begin? Check out our AI 101 course for a structured introduction
            to artificial intelligence.
          </p>
          <Link
            href="/learn/101"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all font-semibold"
          >
            <GraduationCap className="h-5 w-5" />
            Start AI 101
          </Link>
        </div>
      </section>
    </div>
  );
}

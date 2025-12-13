import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Courses Directory | A2Z AI',
  description: 'Curated directory of the best AI and machine learning courses. Find courses from Coursera, Fast.ai, Stanford, and more.',
  keywords: 'AI courses, machine learning courses, deep learning tutorials, AI education, learn AI',
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

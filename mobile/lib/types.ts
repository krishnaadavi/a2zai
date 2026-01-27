export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  category: string;
  pubDate: string;
  link: string;
  imageUrl?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedTerms?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  termId?: string;
}

export interface AIModel {
  id: string;
  name: string;
  author: string;
  downloads: number;
  likes: number;
  pipeline_tag?: string;
  description?: string;
}

export interface AITool {
  name: string;
  description: string;
  category: string;
  url: string;
  pricing: string;
  icon?: string;
}

export interface UserProgress {
  termsLearned: number;
  quizzesTaken: number;
  quizBestScore: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface DailyTeaser {
  fact: string;
  source?: string;
  category: string;
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress } from './types';

// ── Progress ──────────────────────────────────────────
const PROGRESS_KEY = 'a2z_progress';

const defaultProgress: UserProgress = {
  termsLearned: 0,
  quizzesTaken: 0,
  quizBestScore: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
};

export async function getProgress(): Promise<UserProgress> {
  try {
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!raw) return { ...defaultProgress };
    return JSON.parse(raw);
  } catch {
    return { ...defaultProgress };
  }
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export async function updateStreak(): Promise<UserProgress> {
  const progress = await getProgress();
  const today = new Date().toISOString().split('T')[0];

  if (progress.lastActiveDate === today) {
    return progress; // already counted today
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (progress.lastActiveDate === yesterday) {
    progress.currentStreak += 1;
  } else {
    progress.currentStreak = 1;
  }

  if (progress.currentStreak > progress.longestStreak) {
    progress.longestStreak = progress.currentStreak;
  }

  progress.lastActiveDate = today;
  await saveProgress(progress);
  return progress;
}

export async function recordQuiz(score: number, total: number): Promise<UserProgress> {
  const progress = await getProgress();
  progress.quizzesTaken += 1;
  const pct = Math.round((score / total) * 100);
  if (pct > progress.quizBestScore) {
    progress.quizBestScore = pct;
  }
  await saveProgress(progress);
  return progress;
}

export async function recordTermLearned(): Promise<UserProgress> {
  const progress = await getProgress();
  progress.termsLearned += 1;
  await saveProgress(progress);
  return progress;
}

// ── Bookmarks ─────────────────────────────────────────
const BOOKMARKS_KEY = 'a2z_bookmarks';

export async function getBookmarks(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function toggleBookmark(id: string): Promise<boolean> {
  const bookmarks = await getBookmarks();
  const idx = bookmarks.indexOf(id);
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return false; // removed
  } else {
    bookmarks.push(id);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return true; // added
  }
}

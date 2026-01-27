import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'a2z_cache_';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// Get cached data if it exists and hasn't expired
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      // Expired — remove it
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
}

// Store data in cache with expiry
export async function setCache<T>(key: string, data: T, ttlMs: number = CACHE_EXPIRY): Promise<void> {
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttlMs,
    };
    await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch (e) {
    console.warn('Cache write failed:', e);
  }
}

// Remove specific cache entry
export async function clearCache(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(CACHE_PREFIX + key);
  } catch {
    // ignore
  }
}

// Clear all cached data
export async function clearAllCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
    }
  } catch {
    // ignore
  }
}

// Fetch with cache — tries cache first, falls back to network, caches result
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = CACHE_EXPIRY
): Promise<T> {
  // Try cache first
  const cached = await getCached<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch from network
  const data = await fetcher();

  // Cache the result (non-blocking)
  setCache(key, data, ttlMs).catch(() => {});

  return data;
}

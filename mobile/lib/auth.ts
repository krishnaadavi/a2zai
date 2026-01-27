import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'a2z_session';

export interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface StoredSession {
  sessionToken: string;
  user: AuthUser;
  expiresAt: string;
}

export async function getStoredSession(): Promise<StoredSession | null> {
  try {
    const raw = await SecureStore.getItemAsync(SESSION_KEY);
    if (!raw) return null;
    const session: StoredSession = JSON.parse(raw);
    if (new Date(session.expiresAt) < new Date()) {
      await clearStoredSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function saveSession(session: StoredSession): Promise<void> {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
}

export async function clearStoredSession(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}

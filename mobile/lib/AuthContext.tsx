import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  AuthUser,
  StoredSession,
  getStoredSession,
  saveSession,
  clearStoredSession,
} from './auth';

const API_BASE = 'https://www.a2zai.ai';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: AuthUser | null;
  sessionToken: string | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  sessionToken: null,
  isLoading: true,
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  // Restore session on mount
  useEffect(() => {
    (async () => {
      const stored = await getStoredSession();
      if (stored) {
        setUser(stored.user);
        setSessionToken(stored.sessionToken);
      }
      setIsLoading(false);
    })();
  }, []);

  // Handle Google auth response
  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.params.id_token;
      exchangeToken('google', idToken);
    }
  }, [response]);

  const exchangeToken = useCallback(
    async (
      provider: 'google' | 'apple',
      token: string,
      appleUser?: { name?: string; email?: string }
    ) => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/mobile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider,
            token,
            user: appleUser,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Sign in failed');
        }

        const data = await res.json();
        const session: StoredSession = {
          sessionToken: data.sessionToken,
          user: data.user,
          expiresAt: data.expiresAt,
        };

        await saveSession(session);
        setUser(session.user);
        setSessionToken(session.sessionToken);
      } catch (error: any) {
        Alert.alert('Sign In Error', error.message || 'Something went wrong');
      }
    },
    []
  );

  const signInWithGoogle = useCallback(async () => {
    await promptAsync();
  }, [promptAsync]);

  const signInWithApple = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('No identity token received from Apple');
      }

      const fullName = credential.fullName;
      const name = fullName
        ? [fullName.givenName, fullName.familyName].filter(Boolean).join(' ')
        : undefined;

      await exchangeToken('apple', credential.identityToken, {
        name: name || undefined,
        email: credential.email || undefined,
      });
    } catch (error: any) {
      if (error.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Apple Sign In Error', error.message || 'Something went wrong');
      }
    }
  }, [exchangeToken]);

  const signOut = useCallback(async () => {
    try {
      if (sessionToken) {
        fetch(`${API_BASE}/api/auth/mobile`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${sessionToken}` },
        }).catch(() => {});
      }
    } finally {
      await clearStoredSession();
      setUser(null);
      setSessionToken(null);
    }
  }, [sessionToken]);

  return (
    <AuthContext.Provider
      value={{ user, sessionToken, isLoading, signInWithGoogle, signInWithApple, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

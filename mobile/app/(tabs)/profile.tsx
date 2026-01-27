import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as AppleAuthentication from 'expo-apple-authentication';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { brand, dark } from '@/constants/Colors';
import { getProgress } from '@/lib/storage';
import { UserProgress } from '@/lib/types';
import { useAuth } from '@/lib/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signInWithGoogle, signInWithApple, signOut } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  const loadProgress = useCallback(async () => {
    const p = await getProgress();
    setProgress(p);
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const stats = progress || {
    termsLearned: 0,
    quizzesTaken: 0,
    quizBestScore: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#1e1b4b']}
        style={styles.profileHeader}
      >
        {user ? (
          <>
            {user.image ? (
              <Image source={{ uri: user.image }} style={styles.userAvatar} />
            ) : (
              <View style={styles.avatar}>
                <FontAwesome name="user" size={32} color={brand.purple} />
              </View>
            )}
            <Text style={styles.profileTitle}>{user.name || 'AI Learner'}</Text>
            <Text style={styles.profileSub}>{user.email}</Text>
            <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.avatar}>
              <FontAwesome name="user" size={32} color={brand.purple} />
            </View>
            <Text style={styles.profileTitle}>AI Learner</Text>
            <Text style={styles.profileSub}>Track your AI learning journey</Text>

            <View style={styles.authButtons}>
              {Platform.OS === 'ios' && (
                <AppleAuthentication.AppleAuthenticationButton
                  buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                  buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                  cornerRadius={12}
                  style={styles.appleButton}
                  onPress={signInWithApple}
                />
              )}
              <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
                <FontAwesome name="google" size={16} color="#fff" />
                <Text style={styles.signInText}>Sign in with Google</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.signInHint}>Sync progress across devices</Text>
          </>
        )}
      </LinearGradient>

      {/* Stats Grid */}
      <Text style={styles.sectionTitle}>Your Progress</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <FontAwesome name="fire" size={24} color="#f97316" />
          <Text style={styles.statValue}>{stats.currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome name="trophy" size={24} color="#eab308" />
          <Text style={styles.statValue}>{stats.longestStreak}</Text>
          <Text style={styles.statLabel}>Best Streak</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome name="book" size={24} color={brand.cyan} />
          <Text style={styles.statValue}>{stats.termsLearned}</Text>
          <Text style={styles.statLabel}>Terms Learned</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome name="check-circle" size={24} color={brand.green} />
          <Text style={styles.statValue}>{stats.quizzesTaken}</Text>
          <Text style={styles.statLabel}>Quizzes Taken</Text>
        </View>
      </View>

      {/* Best Quiz Score */}
      {stats.quizzesTaken > 0 && (
        <View style={styles.bestScoreCard}>
          <FontAwesome name="star" size={20} color="#eab308" />
          <View style={styles.bestScoreInfo}>
            <Text style={styles.bestScoreLabel}>Best Quiz Score</Text>
            <Text style={styles.bestScoreValue}>{stats.quizBestScore}%</Text>
          </View>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => router.push('/quiz/random')}
          >
            <Text style={styles.retryBtnText}>Beat it</Text>
            <FontAwesome name="arrow-right" size={12} color={brand.purple} />
          </TouchableOpacity>
        </View>
      )}

      {/* Quick Links */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Quick Links</Text>
      {[
        { label: 'Full AI 101 Course', icon: 'graduation-cap' as const, url: 'https://a2zai.ai/learn/101' },
        { label: 'AI Glossary', icon: 'book' as const, url: 'https://a2zai.ai/learn/glossary' },
        { label: 'AI Tools Directory', icon: 'wrench' as const, url: 'https://a2zai.ai/tools' },
        { label: 'Latest Research', icon: 'flask' as const, url: 'https://a2zai.ai/research' },
        { label: 'Prompt Library', icon: 'magic' as const, url: 'https://a2zai.ai/prompts' },
      ].map((link) => (
        <TouchableOpacity
          key={link.label}
          style={styles.linkCard}
          onPress={() => Linking.openURL(link.url)}
        >
          <FontAwesome name={link.icon} size={18} color={brand.purple} />
          <Text style={styles.linkText}>{link.label}</Text>
          <FontAwesome name="external-link" size={14} color={dark.textMuted} />
        </TouchableOpacity>
      ))}

      {/* About */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>A2Z AI</Text>
        <Text style={styles.aboutText}>
          Your go-to app for learning AI — from basics to breakthroughs.
          Built for curious minds of all ages.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://a2zai.ai/about')}>
          <Text style={styles.aboutLink}>Visit a2zai.ai</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: dark.bg },
  content: { paddingBottom: 32 },

  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: dark.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: brand.purple,
    marginBottom: 12,
  },
  profileTitle: { color: dark.text, fontSize: 22, fontWeight: '700' },
  profileSub: { color: dark.textSecondary, fontSize: 14, marginTop: 4, marginBottom: 16 },
  authButtons: {
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
    gap: 10,
  },
  appleButton: {
    width: '100%',
    height: 48,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#4285F4',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
  },
  signInText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  signInHint: { color: dark.textMuted, fontSize: 12, marginTop: 8 },
  userAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: brand.purple,
    marginBottom: 12,
  },
  signOutBtn: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: dark.border,
  },
  signOutText: { color: dark.textMuted, fontSize: 14 },

  sectionTitle: { color: dark.text, fontSize: 18, fontWeight: '700', marginBottom: 12, paddingHorizontal: 16 },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    width: '47%' as any,
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: dark.border,
  },
  statValue: { color: dark.text, fontSize: 28, fontWeight: '700' },
  statLabel: { color: dark.textMuted, fontSize: 12 },

  bestScoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: dark.border,
  },
  bestScoreInfo: { flex: 1 },
  bestScoreLabel: { color: dark.textMuted, fontSize: 12 },
  bestScoreValue: { color: '#eab308', fontSize: 24, fontWeight: '700' },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: brand.purple,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  retryBtnText: { color: brand.purple, fontWeight: '600', fontSize: 13 },

  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: dark.border,
  },
  linkText: { flex: 1, color: dark.text, fontSize: 15, fontWeight: '500' },

  aboutSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  aboutTitle: { color: dark.text, fontSize: 18, fontWeight: '700', marginBottom: 8 },
  aboutText: { color: dark.textSecondary, fontSize: 14, textAlign: 'center', lineHeight: 20 },
  aboutLink: { color: brand.purple, fontSize: 14, fontWeight: '600', marginTop: 12 },
});

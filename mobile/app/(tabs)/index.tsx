import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { brand, dark } from '@/constants/Colors';
import { getNews } from '@/lib/api';
import { getDailyTeaser } from '@/lib/quiz-data';
import { updateStreak } from '@/lib/storage';
import { NewsArticle, DailyTeaser } from '@/lib/types';

export default function HomeScreen() {
  const router = useRouter();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [teaser, setTeaser] = useState<DailyTeaser | null>(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [newsData, progress] = await Promise.all([
        getNews({ limit: 10 }).catch(() => ({ articles: [], totalPages: 0 })),
        updateStreak(),
      ]);
      const articles = Array.isArray(newsData) ? newsData : (newsData?.articles ?? []);
      setNews(articles);
      setStreak(progress?.currentStreak ?? 0);
      setTeaser(getDailyTeaser());
    } catch (e) {
      console.warn('Failed to load home data:', e);
      setTeaser(getDailyTeaser());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={brand.purple} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={brand.purple} />}
    >
      {/* Streak Banner */}
      {streak > 0 && (
        <View style={styles.streakBanner}>
          <FontAwesome name="fire" size={18} color="#f97316" />
          <Text style={styles.streakText}>{streak} day streak!</Text>
        </View>
      )}

      {/* Daily Teaser */}
      {teaser && (
        <LinearGradient
          colors={['#7c3aed', '#06b6d4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.teaserCard}
        >
          <View style={styles.teaserBadge}>
            <FontAwesome name="lightbulb-o" size={14} color="#fbbf24" />
            <Text style={styles.teaserBadgeText}>Daily AI Teaser</Text>
          </View>
          <Text style={styles.teaserFact}>{teaser.fact}</Text>
          <View style={styles.teaserCategory}>
            <Text style={styles.teaserCategoryText}>{teaser.category}</Text>
          </View>
        </LinearGradient>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#7c3aed' }]}
          onPress={() => router.push('/quiz/random')}
        >
          <FontAwesome name="question-circle" size={20} color="#fff" />
          <Text style={styles.actionText}>Quick Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#0891b2' }]}
          onPress={() => router.push('/learn')}
        >
          <FontAwesome name="book" size={20} color="#fff" />
          <Text style={styles.actionText}>Flashcards</Text>
        </TouchableOpacity>
      </View>

      {/* Latest News */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest AI News</Text>
        <FontAwesome name="newspaper-o" size={16} color={dark.textMuted} />
      </View>

      {news.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome name="wifi" size={32} color={dark.textMuted} />
          <Text style={styles.emptyText}>News loading...</Text>
          <Text style={styles.emptySubtext}>Pull to refresh</Text>
        </View>
      ) : (
        news.map((article, idx) => (
          <TouchableOpacity
            key={article.id || idx}
            style={styles.newsCard}
            onPress={() => {
              if (article.link) {
                Linking.openURL(article.link);
              }
            }}
            activeOpacity={0.7}
          >
            <View style={styles.newsCardContent}>
              <View style={styles.newsSource}>
                <Text style={styles.newsSourceText}>{article.source}</Text>
                <Text style={styles.newsDot}> · </Text>
                <Text style={styles.newsDate}>
                  {new Date(article.pubDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </View>
              <Text style={styles.newsTitle} numberOfLines={2}>
                {article.title}
              </Text>
              {article.description && (
                <Text style={styles.newsDesc} numberOfLines={2}>
                  {article.description}
                </Text>
              )}
              {article.category && (
                <View style={styles.newsCategoryBadge}>
                  <Text style={styles.newsCategoryText}>{article.category}</Text>
                </View>
              )}
            </View>
            <FontAwesome name="chevron-right" size={14} color={dark.textMuted} style={styles.newsChevron} />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: dark.bg },
  content: { padding: 16, paddingBottom: 32 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: dark.bg },

  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#451a03',
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  streakText: { color: '#fb923c', fontWeight: '700', fontSize: 15 },

  teaserCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  teaserBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  teaserBadgeText: { color: '#fbbf24', fontWeight: '700', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 },
  teaserFact: { color: '#fff', fontSize: 17, fontWeight: '600', lineHeight: 24 },
  teaserCategory: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 12,
  },
  teaserCategoryText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { color: dark.text, fontSize: 20, fontWeight: '700' },

  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { color: dark.textSecondary, fontSize: 16, fontWeight: '600' },
  emptySubtext: { color: dark.textMuted, fontSize: 14 },

  newsCard: {
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: dark.border,
  },
  newsCardContent: { flex: 1 },
  newsSource: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  newsSourceText: { color: brand.purple, fontSize: 12, fontWeight: '600' },
  newsDot: { color: dark.textMuted, fontSize: 12 },
  newsDate: { color: dark.textMuted, fontSize: 12 },
  newsTitle: { color: dark.text, fontSize: 15, fontWeight: '600', lineHeight: 20, marginBottom: 4 },
  newsDesc: { color: dark.textSecondary, fontSize: 13, lineHeight: 18 },
  newsCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: dark.bgElevated,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 8,
  },
  newsCategoryText: { color: dark.textSecondary, fontSize: 11, fontWeight: '600' },
  newsChevron: { marginLeft: 12 },
});

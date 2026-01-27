import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { brand, dark } from '@/constants/Colors';

export default function ArticleScreen() {
  const { id, title, source, description, link, pubDate, category } = useLocalSearchParams<{
    id: string;
    title?: string;
    source?: string;
    description?: string;
    link?: string;
    pubDate?: string;
    category?: string;
  }>();
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Source and date */}
      <View style={styles.meta}>
        {source && <Text style={styles.source}>{source}</Text>}
        {pubDate && (
          <>
            <Text style={styles.dot}> · </Text>
            <Text style={styles.date}>
              {new Date(pubDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </>
        )}
      </View>

      {/* Title */}
      <Text style={styles.title}>{title || 'Article'}</Text>

      {/* Category badge */}
      {category && (
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      )}

      {/* Description */}
      {description && (
        <View style={styles.descSection}>
          <Text style={styles.descText}>{description}</Text>
        </View>
      )}

      {/* Read full article */}
      {link && (
        <TouchableOpacity
          style={styles.readBtn}
          onPress={() => Linking.openURL(link)}
        >
          <FontAwesome name="external-link" size={16} color="#fff" />
          <Text style={styles.readBtnText}>Read Full Article</Text>
        </TouchableOpacity>
      )}

      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={14} color={brand.purple} />
        <Text style={styles.backBtnText}>Back to News</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: dark.bg },
  content: { padding: 20, paddingBottom: 40 },

  meta: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  source: { color: brand.purple, fontSize: 14, fontWeight: '600' },
  dot: { color: dark.textMuted, fontSize: 14 },
  date: { color: dark.textMuted, fontSize: 14 },

  title: {
    color: dark.text,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 12,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: dark.bgElevated,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 20,
  },
  categoryText: { color: dark.textSecondary, fontSize: 12, fontWeight: '600' },

  descSection: {
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: dark.border,
  },
  descText: { color: dark.textSecondary, fontSize: 16, lineHeight: 24 },

  readBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: brand.purple,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  readBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  backBtnText: { color: brand.purple, fontWeight: '600', fontSize: 14 },
});

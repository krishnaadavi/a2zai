import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { brand, dark } from '@/constants/Colors';
import { getGlossaryTerm } from '@/lib/api';
import { recordTermLearned } from '@/lib/storage';
import { GlossaryTerm } from '@/lib/types';

export default function TermDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [term, setTerm] = useState<GlossaryTerm | null>(null);
  const [loading, setLoading] = useState(true);
  const [learned, setLearned] = useState(false);

  useEffect(() => {
    if (slug) {
      getGlossaryTerm(slug)
        .then(setTerm)
        .catch(() => setTerm(null))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const markLearned = async () => {
    await recordTermLearned();
    setLearned(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={brand.purple} />
      </View>
    );
  }

  if (!term) {
    return (
      <View style={styles.center}>
        <FontAwesome name="exclamation-circle" size={32} color={dark.textMuted} />
        <Text style={styles.errorText}>Term not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <LinearGradient
        colors={['#1e1b4b', '#312e81']}
        style={styles.header}
      >
        <View style={styles.diffBadge}>
          <Text style={styles.diffText}>{term.difficulty || 'beginner'}</Text>
        </View>
        <Text style={styles.termTitle}>{term.term}</Text>
        {term.category && (
          <View style={styles.catBadge}>
            <Text style={styles.catText}>{term.category}</Text>
          </View>
        )}
      </LinearGradient>

      <View style={styles.defSection}>
        <Text style={styles.defLabel}>Definition</Text>
        <Text style={styles.defText}>{term.definition}</Text>
      </View>

      {term.relatedTerms && term.relatedTerms.length > 0 && (
        <View style={styles.relatedSection}>
          <Text style={styles.relatedLabel}>Related Terms</Text>
          <View style={styles.chipRow}>
            {term.relatedTerms.map((rt) => (
              <TouchableOpacity
                key={rt}
                style={styles.chip}
                onPress={() => router.push(`/term/${encodeURIComponent(rt)}`)}
              >
                <Text style={styles.chipText}>{rt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[styles.learnBtn, learned && styles.learnBtnDone]}
        onPress={markLearned}
        disabled={learned}
      >
        <FontAwesome name={learned ? 'check' : 'graduation-cap'} size={18} color="#fff" />
        <Text style={styles.learnBtnText}>
          {learned ? 'Marked as learned!' : 'Mark as learned'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: dark.bg },
  content: { paddingBottom: 32 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: dark.bg, gap: 12 },
  errorText: { color: dark.textSecondary, fontSize: 16 },
  backLink: { color: brand.purple, fontSize: 14, fontWeight: '600' },

  header: {
    padding: 24,
    paddingTop: 16,
    alignItems: 'center',
    gap: 12,
  },
  diffBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  diffText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  termTitle: { color: '#fff', fontSize: 28, fontWeight: '700', textAlign: 'center' },
  catBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  catText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },

  defSection: { padding: 20 },
  defLabel: { color: dark.textMuted, fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  defText: { color: dark.text, fontSize: 17, lineHeight: 26 },

  relatedSection: { paddingHorizontal: 20, marginBottom: 24 },
  relatedLabel: { color: dark.textMuted, fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: dark.bgCard,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: dark.border,
  },
  chipText: { color: brand.purple, fontSize: 13, fontWeight: '600' },

  learnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: brand.purple,
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
  },
  learnBtnDone: { backgroundColor: brand.green },
  learnBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

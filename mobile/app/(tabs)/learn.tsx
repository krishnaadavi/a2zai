import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { brand, dark } from '@/constants/Colors';
import { getGlossaryTerms } from '@/lib/api';
import { GlossaryTerm } from '@/lib/types';
import { getProgress, recordTermLearned } from '@/lib/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 64;

export default function LearnScreen() {
  const router = useRouter();
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [termsLearned, setTermsLearned] = useState(0);
  const [loading, setLoading] = useState(true);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const loadData = useCallback(async () => {
    try {
      const [glossary, progress] = await Promise.all([
        getGlossaryTerms().catch(() => []),
        getProgress(),
      ]);
      // Shuffle terms for variety
      const termsList = Array.isArray(glossary) ? glossary : [];
      const shuffled = [...termsList].sort(() => Math.random() - 0.5);
      setTerms(shuffled.length > 0 ? shuffled : fallbackTerms);
      setTermsLearned(progress?.termsLearned ?? 0);
    } catch {
      setTerms(fallbackTerms);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: flipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const nextCard = async () => {
    if (!flipped) {
      // Mark as learned when they move on
    }
    await recordTermLearned();
    setTermsLearned((prev) => prev + 1);
    setFlipped(false);
    flipAnim.setValue(0);
    setCurrentCard((prev) => (prev + 1) % terms.length);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const currentTerm = terms[currentCard];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={brand.purple} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Stats Bar */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <FontAwesome name="book" size={16} color={brand.cyan} />
          <Text style={styles.statValue}>{termsLearned}</Text>
          <Text style={styles.statLabel}>Learned</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome name="clone" size={16} color={brand.purple} />
          <Text style={styles.statValue}>{terms.length}</Text>
          <Text style={styles.statLabel}>Terms</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome name="tasks" size={16} color={brand.green} />
          <Text style={styles.statValue}>{currentCard + 1}/{terms.length}</Text>
          <Text style={styles.statLabel}>Current</Text>
        </View>
      </View>

      {/* Flashcard */}
      <Text style={styles.sectionTitle}>Glossary Flashcards</Text>
      <Text style={styles.sectionSub}>Tap the card to flip it</Text>

      {currentTerm && (
        <View style={styles.cardContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={flipCard}>
            {/* Front */}
            <Animated.View
              style={[
                styles.flashcard,
                { transform: [{ rotateY: frontInterpolate }], backfaceVisibility: 'hidden' },
              ]}
            >
              <LinearGradient
                colors={['#1e1b4b', '#312e81']}
                style={styles.flashcardInner}
              >
                <View style={styles.difficultyBadge}>
                  <Text style={styles.difficultyText}>
                    {currentTerm.difficulty || 'beginner'}
                  </Text>
                </View>
                <Text style={styles.flashcardTerm}>{currentTerm.term}</Text>
                <View style={styles.tapHint}>
                  <FontAwesome name="hand-pointer-o" size={14} color="rgba(255,255,255,0.5)" />
                  <Text style={styles.tapHintText}>Tap to reveal definition</Text>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Back */}
            <Animated.View
              style={[
                styles.flashcard,
                styles.flashcardBack,
                { transform: [{ rotateY: backInterpolate }], backfaceVisibility: 'hidden' },
              ]}
            >
              <LinearGradient
                colors={['#064e3b', '#065f46']}
                style={styles.flashcardInner}
              >
                <Text style={styles.flashcardTermSmall}>{currentTerm.term}</Text>
                <Text style={styles.flashcardDef}>{currentTerm.definition}</Text>
                {currentTerm.category && (
                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{currentTerm.category}</Text>
                  </View>
                )}
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>

          {/* Nav Buttons */}
          <View style={styles.cardNav}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => {
                setFlipped(false);
                flipAnim.setValue(0);
                setCurrentCard((prev) => (prev - 1 + terms.length) % terms.length);
              }}
            >
              <FontAwesome name="arrow-left" size={18} color={dark.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.learnedBtn} onPress={nextCard}>
              <FontAwesome name="check" size={16} color="#fff" />
              <Text style={styles.learnedBtnText}>Got it!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => {
                setFlipped(false);
                flipAnim.setValue(0);
                setCurrentCard((prev) => (prev + 1) % terms.length);
              }}
            >
              <FontAwesome name="arrow-right" size={18} color={dark.text} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Quiz CTA */}
      <TouchableOpacity
        style={styles.quizCta}
        onPress={() => router.push('/quiz/random')}
      >
        <LinearGradient
          colors={['#7c3aed', '#a855f7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.quizCtaGradient}
        >
          <FontAwesome name="question-circle" size={22} color="#fff" />
          <View style={styles.quizCtaContent}>
            <Text style={styles.quizCtaTitle}>Test Your Knowledge</Text>
            <Text style={styles.quizCtaSub}>5 quick questions on AI fundamentals</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="rgba(255,255,255,0.7)" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Topic Chips */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Browse by Topic</Text>
      <View style={styles.chipGrid}>
        {['Neural Networks', 'LLMs', 'Computer Vision', 'NLP', 'Generative AI', 'Robotics', 'Ethics', 'Open Source'].map(
          (topic) => (
            <TouchableOpacity key={topic} style={styles.chip}>
              <Text style={styles.chipText}>{topic}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </ScrollView>
  );
}

// Fallback terms if API fails
const fallbackTerms: GlossaryTerm[] = [
  { id: '1', term: 'Large Language Model (LLM)', definition: 'An AI model trained on massive text datasets that can understand and generate human language. Examples include GPT-4, Claude, and Llama.', category: 'Models', difficulty: 'beginner' },
  { id: '2', term: 'Neural Network', definition: 'A computing system inspired by the human brain, made up of layers of interconnected nodes (neurons) that process information and learn patterns.', category: 'Fundamentals', difficulty: 'beginner' },
  { id: '3', term: 'Transformer', definition: 'A neural network architecture that uses attention mechanisms to process sequential data. It powers most modern AI models including GPT and BERT.', category: 'Architecture', difficulty: 'intermediate' },
  { id: '4', term: 'Fine-tuning', definition: 'The process of taking a pre-trained AI model and further training it on a smaller, specific dataset to adapt it for a particular task.', category: 'Training', difficulty: 'intermediate' },
  { id: '5', term: 'Prompt Engineering', definition: 'The practice of crafting effective instructions (prompts) to get the best possible output from AI models. Better prompts lead to better results.', category: 'Usage', difficulty: 'beginner' },
  { id: '6', term: 'Hallucination', definition: 'When an AI model generates information that sounds plausible but is factually incorrect or completely fabricated.', category: 'Safety', difficulty: 'beginner' },
  { id: '7', term: 'Reinforcement Learning', definition: 'A type of machine learning where an AI agent learns by taking actions in an environment and receiving rewards or penalties based on outcomes.', category: 'Training', difficulty: 'intermediate' },
  { id: '8', term: 'Computer Vision', definition: 'The field of AI that enables machines to interpret and understand visual information from images and videos.', category: 'Applications', difficulty: 'beginner' },
  { id: '9', term: 'Token', definition: 'A chunk of text (usually a word or part of a word) that AI models process. Context windows are measured in tokens.', category: 'Concepts', difficulty: 'beginner' },
  { id: '10', term: 'RAG', definition: 'Retrieval-Augmented Generation — a technique where AI looks up real information from a knowledge base before generating an answer, reducing hallucinations.', category: 'Techniques', difficulty: 'advanced' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: dark.bg },
  content: { padding: 16, paddingBottom: 32 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: dark.bg },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: dark.border,
  },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { color: dark.text, fontSize: 18, fontWeight: '700' },
  statLabel: { color: dark.textMuted, fontSize: 12 },

  sectionTitle: { color: dark.text, fontSize: 20, fontWeight: '700', marginBottom: 4 },
  sectionSub: { color: dark.textMuted, fontSize: 14, marginBottom: 16 },

  cardContainer: { alignItems: 'center', marginBottom: 24 },
  flashcard: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
  },
  flashcardBack: {
    position: 'absolute',
    top: 0,
  },
  flashcardInner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  difficultyText: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  flashcardTerm: { color: '#fff', fontSize: 24, fontWeight: '700', textAlign: 'center' },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    position: 'absolute',
    bottom: 16,
  },
  tapHintText: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  flashcardTermSmall: { color: '#86efac', fontSize: 14, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  flashcardDef: { color: '#fff', fontSize: 16, lineHeight: 22, textAlign: 'center' },
  categoryTag: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    position: 'absolute',
    bottom: 16,
  },
  categoryTagText: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '600' },

  cardNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: dark.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: dark.border,
  },
  learnedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: brand.green,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  learnedBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  quizCta: { marginBottom: 8 },
  quizCtaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
    gap: 14,
  },
  quizCtaContent: { flex: 1 },
  quizCtaTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  quizCtaSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 },

  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    backgroundColor: dark.bgCard,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: dark.border,
  },
  chipText: { color: dark.textSecondary, fontSize: 13, fontWeight: '600' },
});

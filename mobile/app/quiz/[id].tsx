import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { brand, dark, quiz as quizColors } from '@/constants/Colors';
import { getQuizRound } from '@/lib/quiz-data';
import { recordQuiz, updateStreak } from '@/lib/storage';
import { QuizQuestion } from '@/lib/types';

export default function QuizScreen() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const round = getQuizRound(5);
    setQuestions(round);
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: questions.length > 0 ? (currentIdx / questions.length) * 100 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentIdx, questions.length, progressAnim]);

  const handleAnswer = async (answerIdx: number) => {
    if (selectedAnswer !== null) return; // prevent double-tap
    setSelectedAnswer(answerIdx);
    setShowExplanation(true);

    const correct = answerIdx === questions[currentIdx].correctIndex;
    if (correct) {
      setScore((s) => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const nextQuestion = async () => {
    if (currentIdx + 1 >= questions.length) {
      const finalScore = score + (selectedAnswer === questions[currentIdx].correctIndex ? 0 : 0);
      await recordQuiz(finalScore, questions.length);
      await updateStreak();
      setFinished(true);
      return;
    }

    // Animate transition
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }, 150);
  };

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

  // Results screen
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? 'trophy' : pct >= 60 ? 'star' : pct >= 40 ? 'thumbs-up' : 'book';
    const message =
      pct >= 80 ? 'Amazing!' : pct >= 60 ? 'Great job!' : pct >= 40 ? 'Not bad!' : 'Keep learning!';

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.resultContent}>
        <LinearGradient
          colors={pct >= 60 ? ['#065f46', '#064e3b'] : ['#1e1b4b', '#312e81']}
          style={styles.resultCard}
        >
          <FontAwesome name={emoji as any} size={48} color={pct >= 60 ? '#fbbf24' : brand.purple} />
          <Text style={styles.resultMessage}>{message}</Text>
          <Text style={styles.resultScore}>
            {score}/{questions.length}
          </Text>
          <Text style={styles.resultPct}>{pct}% correct</Text>
        </LinearGradient>

        {/* Review answers */}
        <Text style={styles.reviewTitle}>Review Answers</Text>
        {questions.map((q, idx) => (
          <View key={q.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <FontAwesome
                name={q.correctIndex === idx ? 'check-circle' : 'times-circle'}
                size={16}
                color={quizColors.correct}
              />
              <Text style={styles.reviewQ} numberOfLines={2}>{q.question}</Text>
            </View>
            <Text style={styles.reviewAnswer}>
              Answer: {q.options[q.correctIndex]}
            </Text>
          </View>
        ))}

        <View style={styles.resultActions}>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => {
              setQuestions(getQuizRound(5));
              setCurrentIdx(0);
              setSelectedAnswer(null);
              setScore(0);
              setFinished(false);
              setShowExplanation(false);
            }}
          >
            <FontAwesome name="refresh" size={16} color="#fff" />
            <Text style={styles.retryBtnText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const question = questions[currentIdx];
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.quizContent}>
      {/* Progress bar */}
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
      </View>
      <Text style={styles.progressText}>
        Question {currentIdx + 1} of {questions.length}
      </Text>

      {/* Question */}
      <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
        <Text style={styles.questionText}>{question.question}</Text>

        {/* Options */}
        <View style={styles.options}>
          {question.options.map((option, idx) => {
            let optionStyle = styles.option;
            let textStyle = styles.optionText;

            if (selectedAnswer !== null) {
              if (idx === question.correctIndex) {
                optionStyle = { ...styles.option, ...styles.optionCorrect };
                textStyle = { ...styles.optionText, ...styles.optionTextCorrect };
              } else if (idx === selectedAnswer && idx !== question.correctIndex) {
                optionStyle = { ...styles.option, ...styles.optionWrong };
                textStyle = { ...styles.optionText, ...styles.optionTextWrong };
              }
            }

            return (
              <TouchableOpacity
                key={idx}
                style={[optionStyle]}
                onPress={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                activeOpacity={0.7}
              >
                <View style={styles.optionLetter}>
                  <Text style={styles.optionLetterText}>
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={[textStyle, { flex: 1 }]}>{option}</Text>
                {selectedAnswer !== null && idx === question.correctIndex && (
                  <FontAwesome name="check-circle" size={20} color={quizColors.correct} />
                )}
                {selectedAnswer !== null && idx === selectedAnswer && idx !== question.correctIndex && (
                  <FontAwesome name="times-circle" size={20} color={quizColors.wrong} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation */}
        {showExplanation && (
          <View style={styles.explanation}>
            <FontAwesome name="info-circle" size={16} color={brand.cyan} />
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}
      </Animated.View>

      {/* Next button */}
      {selectedAnswer !== null && (
        <TouchableOpacity style={styles.nextBtn} onPress={nextQuestion}>
          <Text style={styles.nextBtnText}>
            {currentIdx + 1 >= questions.length ? 'See Results' : 'Next Question'}
          </Text>
          <FontAwesome name="arrow-right" size={16} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Score tracker */}
      <View style={styles.scoreTracker}>
        {questions.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.scoreDot,
              idx < currentIdx && { backgroundColor: quizColors.correct },
              idx === currentIdx && { backgroundColor: brand.purple, transform: [{ scale: 1.3 }] },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: dark.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: dark.bg },
  loadingText: { color: dark.textSecondary, fontSize: 16 },

  quizContent: { padding: 16, paddingBottom: 32 },

  progressBar: {
    height: 6,
    backgroundColor: dark.bgCard,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: brand.purple,
    borderRadius: 3,
  },
  progressText: {
    color: dark.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
  },

  questionCard: {
    backgroundColor: dark.bgCard,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: dark.border,
  },
  questionText: {
    color: dark.text,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 20,
  },

  options: { gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: dark.bgElevated,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: dark.borderLight,
    gap: 12,
  },
  optionCorrect: {
    backgroundColor: quizColors.correctBg,
    borderColor: quizColors.correct,
  },
  optionWrong: {
    backgroundColor: quizColors.wrongBg,
    borderColor: quizColors.wrong,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: dark.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLetterText: { color: dark.textSecondary, fontWeight: '700', fontSize: 14 },
  optionText: { color: dark.text, fontSize: 15, lineHeight: 20 },
  optionTextCorrect: { color: quizColors.correct },
  optionTextWrong: { color: quizColors.wrong },

  explanation: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#0c2d48',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
  },
  explanationText: { color: dark.textSecondary, fontSize: 14, lineHeight: 20, flex: 1 },

  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: brand.purple,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
  },
  nextBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  scoreTracker: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
  },
  scoreDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: dark.border,
  },

  // Results
  resultContent: { padding: 16, paddingBottom: 32, alignItems: 'center' },
  resultCard: {
    width: '100%',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  resultMessage: { color: '#fff', fontSize: 24, fontWeight: '700' },
  resultScore: { color: '#fff', fontSize: 48, fontWeight: '700' },
  resultPct: { color: 'rgba(255,255,255,0.7)', fontSize: 16 },

  reviewTitle: { color: dark.text, fontSize: 18, fontWeight: '700', alignSelf: 'flex-start', marginBottom: 12 },
  reviewCard: {
    width: '100%',
    backgroundColor: dark.bgCard,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: dark.border,
  },
  reviewHeader: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginBottom: 4 },
  reviewQ: { color: dark.text, fontSize: 14, fontWeight: '600', flex: 1 },
  reviewAnswer: { color: quizColors.correct, fontSize: 13, marginLeft: 24 },

  resultActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    width: '100%',
  },
  retryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: brand.purple,
    borderRadius: 12,
    paddingVertical: 14,
  },
  retryBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  doneBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: dark.border,
  },
  doneBtnText: { color: dark.text, fontWeight: '700', fontSize: 15 },
});

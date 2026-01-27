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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { brand, dark } from '@/constants/Colors';
import { getModels } from '@/lib/api';
import { AIModel } from '@/lib/types';

const toolCategories = [
  { name: 'Chatbots', icon: 'comments' as const, color: '#7c3aed', count: 8 },
  { name: 'Writing', icon: 'pencil' as const, color: '#06b6d4', count: 7 },
  { name: 'Image Gen', icon: 'picture-o' as const, color: '#ec4899', count: 6 },
  { name: 'Video', icon: 'film' as const, color: '#f97316', count: 5 },
  { name: 'Audio', icon: 'music' as const, color: '#22c55e', count: 4 },
  { name: 'Coding', icon: 'code' as const, color: '#6366f1', count: 8 },
  { name: 'Research', icon: 'flask' as const, color: '#14b8a6', count: 5 },
  { name: 'Business', icon: 'briefcase' as const, color: '#eab308', count: 6 },
  { name: 'Education', icon: 'graduation-cap' as const, color: '#a855f7', count: 4 },
  { name: 'Design', icon: 'paint-brush' as const, color: '#ef4444', count: 5 },
  { name: 'Productivity', icon: 'rocket' as const, color: '#0ea5e9', count: 4 },
  { name: 'Data', icon: 'database' as const, color: '#64748b', count: 3 },
];

const companies = [
  { name: 'OpenAI', tagline: 'ChatGPT, GPT-4, DALL·E', color: '#10A37F' },
  { name: 'Anthropic', tagline: 'Claude AI assistant', color: '#D4A27F' },
  { name: 'Google DeepMind', tagline: 'Gemini, AlphaFold', color: '#4285F4' },
  { name: 'Meta AI', tagline: 'Llama, open source models', color: '#0866FF' },
  { name: 'NVIDIA', tagline: 'AI hardware & CUDA', color: '#76B900' },
  { name: 'Mistral AI', tagline: 'Open-weight LLMs', color: '#FF7000' },
];

export default function ExploreScreen() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState<'tools' | 'models' | 'companies'>('tools');

  const loadData = useCallback(async () => {
    try {
      const data = await getModels().catch(() => []);
      setModels(Array.isArray(data) ? data.slice(0, 10) : []);
    } catch {
      setModels([]);
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={brand.purple} />}
    >
      {/* Section Tabs */}
      <View style={styles.tabs}>
        {(['tools', 'models', 'companies'] as const).map((section) => (
          <TouchableOpacity
            key={section}
            style={[styles.tab, activeSection === section && styles.tabActive]}
            onPress={() => setActiveSection(section)}
          >
            <Text style={[styles.tabText, activeSection === section && styles.tabTextActive]}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tools Grid */}
      {activeSection === 'tools' && (
        <>
          <Text style={styles.sectionTitle}>AI Tools Directory</Text>
          <Text style={styles.sectionSub}>60+ tools across 12 categories</Text>
          <View style={styles.toolGrid}>
            {toolCategories.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                style={styles.toolCard}
                onPress={() => Linking.openURL(`https://a2zai.ai/tools#${cat.name.toLowerCase()}`)}
              >
                <View style={[styles.toolIconWrap, { backgroundColor: cat.color + '20' }]}>
                  <FontAwesome name={cat.icon} size={22} color={cat.color} />
                </View>
                <Text style={styles.toolName}>{cat.name}</Text>
                <Text style={styles.toolCount}>{cat.count} tools</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* Trending Models */}
      {activeSection === 'models' && (
        <>
          <Text style={styles.sectionTitle}>Trending Models</Text>
          <Text style={styles.sectionSub}>Popular on HuggingFace</Text>
          {loading ? (
            <ActivityIndicator size="large" color={brand.purple} style={{ marginTop: 32 }} />
          ) : models.length === 0 ? (
            <View style={styles.emptyState}>
              <FontAwesome name="cubes" size={32} color={dark.textMuted} />
              <Text style={styles.emptyText}>Models loading...</Text>
            </View>
          ) : (
            models.map((model, idx) => (
              <TouchableOpacity
                key={model.id || idx}
                style={styles.modelCard}
                onPress={() => Linking.openURL(`https://huggingface.co/${model.id}`)}
              >
                <View style={styles.modelRank}>
                  <Text style={styles.modelRankText}>#{idx + 1}</Text>
                </View>
                <View style={styles.modelInfo}>
                  <Text style={styles.modelName} numberOfLines={1}>{model.name || model.id}</Text>
                  <Text style={styles.modelAuthor}>{model.author}</Text>
                  {model.pipeline_tag && (
                    <View style={styles.modelTag}>
                      <Text style={styles.modelTagText}>{model.pipeline_tag}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.modelStats}>
                  <View style={styles.modelStatRow}>
                    <FontAwesome name="download" size={11} color={dark.textMuted} />
                    <Text style={styles.modelStatText}>
                      {model.downloads > 1000000 ? `${(model.downloads / 1000000).toFixed(1)}M` : model.downloads > 1000 ? `${(model.downloads / 1000).toFixed(0)}K` : model.downloads}
                    </Text>
                  </View>
                  <View style={styles.modelStatRow}>
                    <FontAwesome name="heart" size={11} color="#ef4444" />
                    <Text style={styles.modelStatText}>
                      {model.likes > 1000 ? `${(model.likes / 1000).toFixed(1)}K` : model.likes}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </>
      )}

      {/* Companies */}
      {activeSection === 'companies' && (
        <>
          <Text style={styles.sectionTitle}>AI Industry Leaders</Text>
          <Text style={styles.sectionSub}>The companies shaping AI</Text>
          {companies.map((company) => (
            <TouchableOpacity
              key={company.name}
              style={styles.companyCard}
              onPress={() => Linking.openURL(`https://a2zai.ai/companies`)}
            >
              <View style={[styles.companyDot, { backgroundColor: company.color }]} />
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>{company.name}</Text>
                <Text style={styles.companyTagline}>{company.tagline}</Text>
              </View>
              <FontAwesome name="chevron-right" size={14} color={dark.textMuted} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => Linking.openURL('https://a2zai.ai/companies')}
          >
            <Text style={styles.viewAllText}>View all 50+ companies</Text>
            <FontAwesome name="external-link" size={14} color={brand.purple} />
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: dark.bg },
  content: { padding: 16, paddingBottom: 32 },

  tabs: {
    flexDirection: 'row',
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: brand.purple,
  },
  tabText: { color: dark.textMuted, fontWeight: '600', fontSize: 14 },
  tabTextActive: { color: '#fff' },

  sectionTitle: { color: dark.text, fontSize: 20, fontWeight: '700', marginBottom: 4 },
  sectionSub: { color: dark.textMuted, fontSize: 14, marginBottom: 16 },

  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { color: dark.textSecondary, fontSize: 16 },

  // Tools
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    width: '47%' as any,
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: dark.border,
  },
  toolIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  toolName: { color: dark.text, fontSize: 14, fontWeight: '600' },
  toolCount: { color: dark.textMuted, fontSize: 12, marginTop: 2 },

  // Models
  modelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: dark.border,
  },
  modelRank: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: dark.bgElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modelRankText: { color: brand.purple, fontSize: 13, fontWeight: '700' },
  modelInfo: { flex: 1 },
  modelName: { color: dark.text, fontSize: 14, fontWeight: '600' },
  modelAuthor: { color: dark.textMuted, fontSize: 12, marginTop: 2 },
  modelTag: {
    alignSelf: 'flex-start',
    backgroundColor: dark.bgElevated,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  modelTagText: { color: dark.textSecondary, fontSize: 10, fontWeight: '600' },
  modelStats: { alignItems: 'flex-end', gap: 4 },
  modelStatRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  modelStatText: { color: dark.textMuted, fontSize: 11 },

  // Companies
  companyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: dark.bgCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: dark.border,
  },
  companyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 14,
  },
  companyInfo: { flex: 1 },
  companyName: { color: dark.text, fontSize: 15, fontWeight: '600' },
  companyTagline: { color: dark.textMuted, fontSize: 13, marginTop: 2 },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginTop: 8,
  },
  viewAllText: { color: brand.purple, fontSize: 14, fontWeight: '600' },
});

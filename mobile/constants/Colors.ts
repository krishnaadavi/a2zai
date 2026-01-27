// A2Z AI Brand Colors — matches the web app at a2zai.ai
export const brand = {
  purple: '#a855f7',
  purpleLight: '#c084fc',
  purpleDark: '#7c3aed',
  cyan: '#06b6d4',
  cyanLight: '#22d3ee',
  indigo: '#6366f1',
  green: '#22c55e',
};

export const dark = {
  bg: '#030712',
  bgCard: '#111827',
  bgCardHover: '#1f2937',
  bgElevated: '#1e293b',
  border: '#1f2937',
  borderLight: '#374151',
  text: '#f9fafb',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
};

export const quiz = {
  correct: '#22c55e',
  correctBg: '#052e16',
  wrong: '#ef4444',
  wrongBg: '#450a0a',
  pending: '#334155',
};

const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: brand.purple,
    tabIconDefault: '#ccc',
    tabIconSelected: brand.purple,
  },
  dark: {
    text: dark.text,
    background: dark.bg,
    tint: brand.purple,
    tabIconDefault: dark.textMuted,
    tabIconSelected: brand.purple,
  },
};

export default Colors;

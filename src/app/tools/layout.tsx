import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Tools Directory | A2Z AI',
  description: 'Comprehensive directory of 50+ AI tools across categories like chatbots, image generators, video editors, and coding assistants.',
  keywords: 'AI tools, ChatGPT, Claude, Midjourney, AI assistants, AI apps, generative AI tools',
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

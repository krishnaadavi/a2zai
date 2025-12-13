import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI News | A2Z AI',
  description: 'Latest AI news and updates from around the world. Stay informed about artificial intelligence developments, product launches, and industry trends.',
  keywords: 'AI news, artificial intelligence news, machine learning news, tech news, AI updates',
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

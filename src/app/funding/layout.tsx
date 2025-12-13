import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Funding Tracker | A2Z AI',
  description: 'Track the latest AI startup funding rounds, investments, and valuations. See who is raising money in the AI industry.',
  keywords: 'AI funding, AI investments, startup funding, AI venture capital, AI valuations',
};

export default function FundingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

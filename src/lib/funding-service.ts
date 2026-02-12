import { FUNDING_ROUNDS, type FundingRound } from '@/lib/funding-data';

export type FundingQuery = {
  limit?: number;
  category?: string | null;
  round?: string | null;
  q?: string | null;
  sortBy?: 'date' | 'amount';
};

function sortRounds(rounds: FundingRound[], sortBy: 'date' | 'amount' = 'date'): FundingRound[] {
  if (sortBy === 'amount') {
    return [...rounds].sort((a, b) => b.amountNum - a.amountNum);
  }
  return [...rounds].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function queryFundingRounds(query: FundingQuery = {}): FundingRound[] {
  const {
    limit = 100,
    category,
    round,
    q,
    sortBy = 'date',
  } = query;

  let rounds = [...FUNDING_ROUNDS];

  if (category) {
    rounds = rounds.filter((r) => r.category === category);
  }

  if (round) {
    rounds = rounds.filter((r) => r.round === round);
  }

  if (q) {
    const needle = q.toLowerCase().trim();
    rounds = rounds.filter(
      (r) =>
        r.company.toLowerCase().includes(needle) ||
        r.description.toLowerCase().includes(needle) ||
        r.investors.some((i) => i.toLowerCase().includes(needle))
    );
  }

  const sorted = sortRounds(rounds, sortBy);
  const safeLimit = Math.min(Math.max(limit, 1), 500);
  return sorted.slice(0, safeLimit);
}

export function getFundingStats(rounds: FundingRound[]) {
  const totalFunding = rounds.reduce((sum, r) => sum + r.amountNum, 0);
  const totalDeals = rounds.length;
  const avgDealSize = totalDeals > 0 ? totalFunding / totalDeals : 0;
  const latestRoundDate = rounds.length > 0 ? rounds[0].date : null;

  return {
    totalFunding,
    totalDeals,
    avgDealSize,
    latestRoundDate,
  };
}

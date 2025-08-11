import type { Topic } from '../types/topics';

export type SentimentBreakdown = {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
};

export const getSentimentBreakdown = (
  topic?: Topic
): SentimentBreakdown | null => {
  if (!topic) {
    return null;
  }

  const total = typeof topic.volume === 'number' ? topic.volume : 0;
  const pos = topic.sentiment?.positive ?? 0;
  const neu = topic.sentiment?.neutral ?? 0;
  const neg = topic.sentiment?.negative ?? 0;

  const clamp = (num: number) => Math.max(0, Math.min(num, total));
  const positive = clamp(pos);
  const neutral = clamp(neu);
  const negative = clamp(neg);

  const denom = total || positive + neutral + negative || 1;
  const toPct = (num: number) => Math.round((num / denom) * 100);

  return {
    positive,
    neutral,
    negative,
    total: total || positive + neutral + negative,
    positivePct: toPct(positive),
    neutralPct: toPct(neutral),
    negativePct: toPct(negative)
  };
};

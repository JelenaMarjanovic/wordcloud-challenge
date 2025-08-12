import { describe, it, expect } from 'vitest';
import { createSizeScale, FONT_BUCKETS } from '../wordcloudBuckets';
import type { Topic } from '../../types/topics';

const t = (label: string, volume: number): Topic => ({
  id: label,
  label,
  volume,
  sentimentScore: 50,
  sentiment: { positive: 0, neutral: 1, negative: 0 }
});

describe('createSizeScale', () => {
  it('returns base size for empty input', () => {
    const scale = createSizeScale([]);
    expect(scale(999)).toBe(FONT_BUCKETS[0]);
  });

  it('maps volumes into fixed buckets', () => {
    const topics: Topic[] = [t('a', 1), t('b', 10), t('c', 100)];
    const scale = createSizeScale(topics);
    [1, 10, 100].forEach((v) => expect(FONT_BUCKETS).toContain(scale(v)));
  });
});

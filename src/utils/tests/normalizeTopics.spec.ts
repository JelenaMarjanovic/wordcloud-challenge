import { describe, it, expect } from 'vitest';
import { normalizeTopics } from '../normalizeTopics';

describe('normalizeTopics', () => {
  it('returns [] for invalid payloads', () => {
    expect(normalizeTopics(null)).toEqual([]);
    expect(normalizeTopics({})).toEqual([]);
    expect(normalizeTopics('x')).toEqual([]);
  });

  it('extracts from payload.topics', () => {
    const payload: unknown = { topics: [{ label: 'A', volume: 10 }] };
    const out = normalizeTopics(payload);
    expect(out).toEqual([{ label: 'A', volume: 10 }]);
  });

  it('filters invalid items', () => {
    const payload: unknown = [
      { label: 'A', volume: 10 },
      { label: 12 } as unknown
    ];
    const out = normalizeTopics(payload);
    expect(out).toEqual([{ label: 'A', volume: 10 }]);
  });
});

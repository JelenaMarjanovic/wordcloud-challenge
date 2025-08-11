import type { Topic } from '../types/topics';

export const computeThresholds = (topics: Topic[]): number[] => {
  if (topics.length === 0) {
    return [];
  }

  const vols = topics.map((t) => t.volume).sort((a, b) => a - b);
  const pick = (p: number) => vols[Math.floor(p * (vols.length - 1))];

  return [pick(0), pick(0.2), pick(0.4), pick(0.6), pick(0.8), pick(1)];
};

export const bucketIndex = (volume: number, thresholds: number[]): number => {
  for (let i = 0; i < thresholds.length; i++) {
    if (volume <= thresholds[i]) return i;
  }

  return thresholds.length - 1;
};

import type { Topic } from '../types/topics';
import { scaleQuantile } from 'd3-scale';

export const FONT_BUCKETS = [12, 16, 20, 28, 40, 56] as const;

export const createSizeScale = (topics: Topic[]) => {
  const volumes = topics.map((topic) => topic.volume);

  if (volumes.length === 0) {
    return () => FONT_BUCKETS[0];
  }

  const scale = scaleQuantile<number, number>()
    .domain(volumes)
    .range([...FONT_BUCKETS]);

  return (volume: number) => scale(volume);
};

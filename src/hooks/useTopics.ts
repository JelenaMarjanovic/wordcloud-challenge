import { useEffect, useState } from 'react';
import type { Topic } from '../types/topics';
import { normalizeTopics } from '../utils/normalizeTopics';

export const useTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const res = await fetch('/topics.json');
        if (!res.ok) {
          throw new Error('Failed to load topics');
        }

        const payload = await res.json();
        const normalizedData = normalizeTopics(payload);

        if (
          import.meta.env.MODE !== 'production' &&
          normalizedData.length === 0
        ) {
          console.warn('useTopics: unexpected topics.json shape', payload);
        }

        setTopics(normalizedData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, []);

  return { topics, loading, error };
};

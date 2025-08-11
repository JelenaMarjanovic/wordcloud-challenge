import { useEffect, useState } from 'react';
import type { Topic } from '../types/topics';

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

        const data = Array.isArray(payload?.topics)
          ? payload.topics
          : Array.isArray(payload)
            ? payload
            : [];

        if (
          import.meta.env.MODE !== 'production' &&
          (!Array.isArray(data) ||
            !data.every((item) => 'label' in item && 'volume' in item))
        ) {
          console.warn('useTopics: unexpected topics.json shape', payload);
        }

        setTopics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, []);

  return { topics, loading, error };
};

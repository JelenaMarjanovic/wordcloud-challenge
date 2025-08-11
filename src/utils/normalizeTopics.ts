import type { Topic } from '../types/topics';

const isValidTopic = (topicCandidate: unknown): topicCandidate is Topic =>
  typeof (topicCandidate as { label?: unknown })?.label === 'string' &&
  typeof (topicCandidate as { volume?: unknown })?.volume === 'number';

/**
 * Normalizes and validates topics data.
 * Ensures we always return a valid Topic[] even if payload is malformed.
 *
 * @param payload - The raw JSON payload from topics.json
 * @returns A valid array of Topic objects
 */
export const normalizeTopics = (payload: unknown): Topic[] => {
  if (Array.isArray(payload)) {
    return payload.filter(isValidTopic);
  }

  if (
    typeof payload === 'object' &&
    payload !== null &&
    'topics' in payload &&
    Array.isArray((payload as { topics: unknown[] }).topics)
  ) {
    return (payload as { topics: unknown[] }).topics.filter(isValidTopic);
  }

  return [];
};

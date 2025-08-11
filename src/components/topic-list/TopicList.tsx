import type { Topic } from '../../types/topics';
import { computeThresholds, bucketIndex } from '../../utils/sizeBuckets';

import styles from './TopicList.module.css';

type TopicListProps = {
  topics: Topic[];
  selectedId?: string | null;
  onSelect: (topic: Topic) => void;
};

const sentimentClass = (score?: number) => {
  if (typeof score !== 'number') {
    return styles['text-neu'];
  }

  if (score > 60) {
    return styles['text-pos'];
  }

  if (score < 40) {
    return styles['text-neg'];
  }

  return styles['text-neu'];
};

const TopicList = ({ topics, selectedId, onSelect }: TopicListProps) => {
  const thresholds = computeThresholds(topics);

  return (
    <ul className={styles.list}>
      {topics.map((topic, idx) => {
        const key = topic.id ?? `${topic.label}-${idx}`;
        const pressed = (topic.id ?? '') === (selectedId ?? '');

        const bucketIdx = bucketIndex(topic.volume, thresholds); // 0..5
        const sizeClass = styles[`size-${bucketIdx}`];
        const colorClass = sentimentClass(topic.sentimentScore);

        return (
          <li key={key}>
            <button
              type="button"
              className={`${styles.itemButton} ${sizeClass} ${colorClass}`}
              aria-pressed={pressed}
              onClick={() => onSelect(topic)}
            >
              {topic.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TopicList;

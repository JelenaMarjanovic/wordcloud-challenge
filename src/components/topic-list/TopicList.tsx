import type { Topic } from '../../types/topics';
import styles from './TopicList.module.css';

type TopicListProps = {
  topics: Topic[];
  selectedId?: string | null;
  onSelect: (topic: Topic) => void;
};

const TopicList = ({ topics, selectedId, onSelect }: TopicListProps) => {
  return (
    <ul className={styles.list}>
      {topics.map((topic, idx) => {
        const key = topic.id ?? `${topic.label}-${idx}`;
        const pressed = (topic.id ?? '') === (selectedId ?? '');

        return (
          <li key={key}>
            <button
              type="button"
              className={styles.itemButton}
              aria-pressed={pressed}
              onClick={() => onSelect(topic)}
            >
              {topic.label} — {topic.volume}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TopicList;

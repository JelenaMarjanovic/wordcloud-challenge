import type { Topic } from '../../types/topics';
import { getSentimentBreakdown } from '../../utils/sentimentBreakdown';
import styles from './TopicPanel.module.css';

type TopicPanelProps = {
  topic?: Topic | null;
};

const TopicPanel = ({ topic }: TopicPanelProps) => {
  if (!topic) {
    return <p className={styles.hint}>Select a topic to view details.</p>;
  }

  const breakdown = getSentimentBreakdown(topic);

  return (
    <section
      aria-live="polite"
      aria-labelledby="topic-panel-title"
      className={styles.panel}
    >
      <div className={styles.card}>
        <span className={styles.label}>Information on topic</span>
        <h2 id="topic-panel-title" className={styles.header}>
          {topic.label}
        </h2>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Total Mentions</span>
        <div className={styles.value}>{breakdown?.total ?? 0}</div>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Mentions</span>

        {breakdown ? (
          <div className={styles.badgeRow}>
            <span
              className={styles.badge}
              aria-label={`Positive Mentions ${breakdown.positive} (${breakdown.positivePct}%)`}
            >
              <span
                className={`${styles.dot} ${styles.dotPos}`}
                aria-hidden="true"
              />
              Positive Mentions: {breakdown.positive} ({breakdown.positivePct}%)
            </span>
            <span
              className={styles.badge}
              aria-label={`Neutral Mentions ${breakdown.neutral} (${breakdown.neutralPct}%)`}
            >
              <span
                className={`${styles.dot} ${styles.dotNeu}`}
                aria-hidden="true"
              />
              Neutral Mentions: {breakdown.neutral} ({breakdown.neutralPct}%)
            </span>
            <span
              className={styles.badge}
              aria-label={`Negative Mentions ${breakdown.negative} (${breakdown.negativePct}%)`}
            >
              <span
                className={`${styles.dot} ${styles.dotNeg}`}
                aria-hidden="true"
              />
              Negative Mentions: {breakdown.negative} ({breakdown.negativePct}%)
            </span>
          </div>
        ) : (
          <p className={styles.hint}>No sentiment data.</p>
        )}
      </div>
    </section>
  );
};

export default TopicPanel;

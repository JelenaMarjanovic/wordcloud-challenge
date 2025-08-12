import { useMemo, useCallback } from 'react';
import { Wordcloud } from '@visx/wordcloud';
import { Text } from '@visx/text';
import type { Topic } from '../../types/topics';
import { useContainerSize } from '../../hooks/useContainerSize';
import { createSizeScale } from '../../utils/wordcloudBuckets';

import styles from './WordCloud.module.css';

type WordCloudWord = {
  text: string;
  value: number;
  score?: number;
  topic: Topic;
};

type LaidOutWord = WordCloudWord & {
  x: number;
  y: number;
  size: number;
  rotate: number;
  text: string;
};

const sentimentClass = (score?: number) => {
  if (typeof score !== 'number') {
    return styles['sent-neu'];
  }

  if (score > 60) {
    return styles['sent-pos'];
  }

  if (score < 40) {
    return styles['sent-neg'];
  }

  return styles['sent-neu'];
};

const WordCloud = ({
  topics,
  onSelect
}: {
  topics: Topic[];
  onSelect?: (topic: Topic) => void;
}) => {
  const { containerRef, width, height } = useContainerSize<HTMLDivElement>();
  const sizeForVolume = useMemo(() => createSizeScale(topics), [topics]);

  const words = useMemo<WordCloudWord[]>(
    () =>
      topics.map((topic) => ({
        text: topic.label,
        value: topic.volume,
        score: topic.sentimentScore,
        topic
      })),
    [topics]
  );

  const handleActivate = useCallback(
    (word: LaidOutWord) => {
      onSelect?.(word.topic);
    },
    [onSelect]
  );

  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      id="cloud"
      role="region"
      aria-label="Word cloud"
    >
      {width > 0 && height > 0 && (
        <svg width={width} height={height}>
          <Wordcloud<WordCloudWord>
            words={words}
            width={width}
            height={height}
            padding={2}
            spiral="archimedean"
            rotate={() => (Math.random() > 0.5 ? 15 : -15)}
            font="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', Arial"
            fontSize={(word) => sizeForVolume(word.value)}
          >
            {(laidOut) =>
              (laidOut as unknown as LaidOutWord[]).map((word, idx) => (
                <Text
                  key={`${word.text}-${idx}`}
                  textAnchor="middle"
                  transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
                  fontSize={word.size}
                  className={`${styles.word} ${sentimentClass(word.score)}`}
                  tabIndex={0}
                  aria-label={`${word.text}, ${word.value} mentions`}
                  onClick={() => handleActivate(word)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleActivate(word);
                    }
                  }}
                >
                  {word.text}
                </Text>
              ))
            }
          </Wordcloud>
        </svg>
      )}
    </div>
  );
};

export default WordCloud;

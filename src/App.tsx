import { useState } from 'react';
import { useTopics } from './hooks/useTopics';
import type { Topic } from './types/topics';
import TopicList from './components/topic-list/TopicList';
import TopicPanel from './components/topic-panel/TopicPanel';

export default function App() {
  const { topics, loading, error } = useTopics();
  const [selected, setSelected] = useState<Topic | null>(null);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container text-error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>My Topics Challenge</h1>

      <div className="layout">
        <main className="main" id="cloud">
          <TopicList
            topics={topics}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
          />
        </main>

        <aside className="aside" aria-label="Topic details">
          <TopicPanel topic={selected} />
        </aside>
      </div>
    </div>
  );
}

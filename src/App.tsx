import { useTopics } from './hooks/useTopics';

export default function App() {
  const { topics, loading, error } = useTopics();

  if (loading) {
    return <p style={{ padding: 16 }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ padding: 16, color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>My Topics Challenge</h1>
      <ul>
        {topics.map((topic, idx) => (
          <li key={topic.id ?? `${topic.label}-${idx}`}>
            {topic.label}: {topic.volume}
          </li>
        ))}
      </ul>
    </div>
  );
}

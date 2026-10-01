import { useEffect, useRef, useState } from 'react';

export default function PlanningList({ loadSessions }) {
  const [group, setGroup] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const requestId = useRef(0);

  useEffect(() => {
    const currentRequest = ++requestId.current;
    // A fetch starts after the filter changes, so the loading state belongs to this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError('');

    loadSessions({ group })
      .then(result => {
        if (currentRequest !== requestId.current) return;
        setItems(result);
      })
      .catch(() => {
        if (currentRequest !== requestId.current) return;
        setItems([]);
        setError('Impossible de charger le planning.');
      })
      .finally(() => {
        if (currentRequest === requestId.current) setLoading(false);
      });
  }, [group, loadSessions, retryCount]);

  return (
    <section>
      <h1>Planning</h1>
      <label htmlFor="group-filter">Groupe</label>
      <select
        id="group-filter"
        aria-label="Groupe"
        value={group}
        onChange={event => setGroup(event.target.value)}
      >
        <option value="all">Tous</option>
        <option value="A">Groupe A</option>
        <option value="B">Groupe B</option>
        <option value="Promotion">Promotion</option>
      </select>
      {loading && <p role="status">Chargement...</p>}
      {!loading && error && (
        <div role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => setRetryCount(value => value + 1)}>
            Réessayer
          </button>
        </div>
      )}
      {!loading && !error && items.length === 0 && <p>Aucune séance.</p>}
      {!loading && !error && items.length > 0 && (
        <ul>{items.map(session => <li key={session.id}>{session.title}</li>)}</ul>
      )}
    </section>
  );
}
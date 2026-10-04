import { useEffect, useState } from 'react';

export default function PlanningListInitial({ loadSessions }) {
  const [group, setGroup] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadSessions({ group }).then(result => {
      setItems(result);
      setLoading(false);
    });
  }, [group, loadSessions]);

  return (
    <section>
      <h1>Planning</h1>
      <label htmlFor="initial-group">Groupe</label>
      <select
        id="initial-group"
        aria-label="Groupe"
        value={group}
        onChange={event => setGroup(event.target.value)}
      >
        <option value="all">Tous</option>
        <option value="A">Groupe A</option>
        <option value="B">Groupe B</option>
        <option value="Promotion">Promotion</option>
      </select>
      {loading ? (
        <p role="status">Chargement...</p>
      ) : (
        <ul>{items.map(session => <li key={session.id}>{session.title}</li>)}</ul>
      )}
    </section>
  );
}
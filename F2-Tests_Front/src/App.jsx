import { useCallback } from 'react';
import PlanningList from './Planning.jsx';

const sessions = [
  { id: 's01', group: 'A', title: 'React composants' },
  { id: 's02', group: 'B', title: 'React événements' },
  { id: 's03', group: 'Promotion', title: 'Données et SQL' },
];

export default function App() {
  const loadSessions = useCallback(async ({ group }) => (
    group === 'all'
      ? sessions
      : sessions.filter(session => session.group === group || session.group === 'Promotion')
  ), []);

  return <PlanningList loadSessions={loadSessions} />;
}
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import PlanningListInitial from './Planning_Initial.jsx';

afterEach(() => {
  cleanup();
});

function deferred() {
  let resolve;
  const promise = new Promise(resolvePromise => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

describe('PlanningListInitial - défauts avant correction', () => {
  it('devrait afficher une erreur et proposer une nouvelle tentative', async () => {
    render(<PlanningListInitial loadSessions={vi.fn(() => Promise.reject(new Error('network')))} />);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('devrait ignorer une réponse obsolète', async () => {
    const user = userEvent.setup();
    const first = deferred();
    const second = deferred();
    const loadSessions = vi.fn(({ group }) => group === 'all' ? first.promise : second.promise);
    render(<PlanningListInitial loadSessions={loadSessions} />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Groupe' }), 'A');
    second.resolve([{ id: 'recent', title: 'Réponse récente' }]);
    expect(await screen.findByText('Réponse récente')).toBeInTheDocument();
    first.resolve([{ id: 'old', title: 'Réponse obsolète' }]);

    await waitFor(() => expect(screen.getByText('Réponse obsolète')).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('Réponse obsolète')).not.toBeInTheDocument());
  });
});
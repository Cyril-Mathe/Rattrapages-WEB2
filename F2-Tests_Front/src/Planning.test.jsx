import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import PlanningList from './Planning.jsx';

const session = (id, group, title) => ({ id, group, title });

afterEach(() => {
  cleanup();
});

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

describe('PlanningList', () => {
  it('affiche le chargement puis les séances', async () => {
    const request = deferred();
    const loadSessions = vi.fn(() => request.promise);
    render(<PlanningList loadSessions={loadSessions} />);

    expect(screen.getByRole('status')).toHaveTextContent('Chargement');
    request.resolve([session('s01', 'A', 'React composants')]);

    expect(await screen.findByText('React composants')).toBeInTheDocument();
  });

  it('inclut Promotion quand le groupe A est sélectionné', async () => {
    const user = userEvent.setup();
    const loadSessions = vi.fn(({ group }) => Promise.resolve(
      group === 'A'
        ? [session('s01', 'A', 'React composants'), session('s03', 'Promotion', 'Données et SQL')]
        : [],
    ));
    render(<PlanningList loadSessions={loadSessions} />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Groupe' }), 'A');

    expect(await screen.findByText('Données et SQL')).toBeInTheDocument();
    expect(screen.getByText('React composants')).toBeInTheDocument();
  });

  it('affiche un état vide', async () => {
    render(<PlanningList loadSessions={vi.fn(() => Promise.resolve([]))} />);

    expect(await screen.findByText('Aucune séance.')).toBeInTheDocument();
  });

  it('affiche une erreur puis permet une nouvelle tentative', async () => {
    const user = userEvent.setup();
    const loadSessions = vi.fn()
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce([session('s01', 'A', 'React composants')]);
    render(<PlanningList loadSessions={loadSessions} />);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Réessayer' }));

    expect(await screen.findByText('React composants')).toBeInTheDocument();
    expect(loadSessions).toHaveBeenCalledTimes(2);
  });

  it('ignore une réponse obsolète arrivée après la nouvelle réponse', async () => {
    const user = userEvent.setup();
    const first = deferred();
    const second = deferred();
    const loadSessions = vi.fn(({ group }) => group === 'all' ? first.promise : second.promise);
    render(<PlanningList loadSessions={loadSessions} />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Groupe' }), 'A');
    second.resolve([session('s02', 'A', 'Réponse récente')]);
    expect(await screen.findByText('Réponse récente')).toBeInTheDocument();
    first.resolve([session('s01', 'A', 'Réponse obsolète')]);

    await waitFor(() => expect(screen.queryByText('Réponse obsolète')).not.toBeInTheDocument());
  });

  it('expose un filtre accessible et utilisable au clavier', async () => {
    const user = userEvent.setup();
    const loadSessions = vi.fn(() => Promise.resolve([session('s01', 'A', 'React composants')]));
    render(<PlanningList loadSessions={loadSessions} />);

    const filter = screen.getByRole('combobox', { name: 'Groupe' });
    filter.focus();
    await user.keyboard('{ArrowDown}{Enter}');

    expect(document.activeElement).toBe(filter);
    expect(loadSessions).toHaveBeenCalled();
  });
});
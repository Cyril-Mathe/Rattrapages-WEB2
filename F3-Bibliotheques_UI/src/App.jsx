import { useEffect, useRef, useState } from 'react'

const sessions = [
  {
    id: 's01',
    date: '2026-10-19',
    period: 'am',
    group: 'A',
    mode: 'DG',
    title: 'Composants web',
    domain: 'React',
    teacherId: 't1',
    status: 'confirmed',
  },
  {
    id: 's02',
    date: '2026-10-19',
    period: 'am',
    group: 'B',
    mode: 'DG',
    title: 'Événements web',
    domain: 'React',
    teacherId: 't2',
    status: 'confirmed',
  },
  {
    id: 's03',
    date: '2026-10-19',
    period: 'pm',
    group: 'Promotion',
    mode: 'CE',
    title: 'Données et SQL',
    domain: 'Data',
    teacherId: 't1',
    status: 'confirmed',
  },
  {
    id: 's04',
    date: '2026-10-20',
    period: 'am',
    group: 'A',
    mode: 'DG',
    title: 'Authentification',
    domain: 'Cyber',
    teacherId: 't2',
    status: 'proposed',
  },
  {
    id: 's05',
    date: '2026-10-20',
    period: 'am',
    group: 'B',
    mode: 'DG',
    title: 'Revue de projet',
    domain: 'Projet',
    teacherId: 't3',
    status: 'proposed',
  },
  {
    id: 's06',
    date: '2026-10-20',
    period: 'pm',
    group: 'Promotion',
    mode: 'AUTO',
    title: 'Travail autonome',
    domain: 'Projet',
    teacherId: null,
    status: 'proposed',
  },
]

const teachers = {
  t1: 'Antoine Luckso',
  t2: 'Siôn Genders',
  t3: 'Dany Siriphol',
}

const groupOptions = ['Tous les groupes', 'A', 'B', 'Promotion']
const statusOptions = ['Tous les statuts', 'confirmed', 'proposed']

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

function formatDate(date) {
  return dateFormatter.format(new Date(`${date}T12:00:00`))
}

function formatPeriod(period) {
  return period === 'am' ? 'Matin (9h - 12h30)' : 'Après-midi (13h30 - 17h)'
}

function statusLabel(status) {
  return status === 'confirmed' ? 'Confirmé' : 'Proposé'
}

function App() {
  const [group, setGroup] = useState('Tous les groupes')
  const [status, setStatus] = useState('Tous les statuts')
  const [selectedSession, setSelectedSession] = useState(null)
  const lastTrigger = useRef(null)

  const visibleSessions = sessions.filter((session) => {
    const matchesGroup =
      group === 'Tous les groupes' ||
      session.group === group ||
      (group === 'A' && session.group === 'Promotion') ||
      (group === 'B' && session.group === 'Promotion')
    const matchesStatus =
      status === 'Tous les statuts' || session.status === status
    return matchesGroup && matchesStatus
  })

  function openDetails(session, event) {
    lastTrigger.current = event.currentTarget
    setSelectedSession(session)
  }

  function closeDetails() {
    setSelectedSession(null)
    requestAnimationFrame(() => lastTrigger.current?.focus())
  }

  useEffect(() => {
    if (!selectedSession) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') closeDetails()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedSession])

  return (
    <div className="min-h-screen">
      <header className="flex min-h-16 items-center justify-between bg-ink px-4 text-white sm:min-h-[72px] sm:px-[5vw]">
        <a className="flex items-center gap-2.5 text-[1.2rem] font-extrabold tracking-wide text-white no-underline" href="/" aria-label="MATRiCE, accueil">
          <span className="flex h-9 w-9 items-center justify-center rounded-[.55rem] bg-teal" aria-hidden="true">M</span>
          <span>MATRiCE</span>
        </a>
        <span className="text-xs text-[#b8c7d9] sm:text-sm">WEB2 <span aria-hidden="true">·</span> Planning</span>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 py-8 sm:px-8 sm:py-16">
        <section className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end" aria-labelledby="page-title">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[.1em] text-muted">Semaine du 19 octobre 2026</p>
            <h1 className="mb-3 text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-tight tracking-[-.04em] text-ink" id="page-title">Planning des séances</h1>
            <p className="mb-0 max-w-[620px] text-base text-muted sm:text-[1.05rem]">
              Retrouvez les séances de votre groupe et ouvrez une carte pour voir le détail.
            </p>
          </div>
          <div className="grid min-w-[150px] rounded-2xl border border-[#b8ebe5] bg-soft-teal px-5 py-4 text-center" aria-label={`${visibleSessions.length} séances affichées`}>
            <strong className="text-[1.8rem] leading-none text-[#0e8177]">{visibleSessions.length}</strong>
            <span className="mt-1 text-xs text-[#286b6c]">séances affichées</span>
          </div>
        </section>

        <section className="mb-11 rounded-2xl border border-border bg-white p-6 shadow-[0_8px_28px_#102a430d]" aria-labelledby="filters-title">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-[1.15rem] font-bold text-ink" id="filters-title">Filtrer le planning</h2>
              <p className="mb-0 text-sm text-[#6b8299]">Les séances de Promotion sont visibles pour les groupes A et B.</p>
            </div>
            {(group !== 'Tous les groupes' || status !== 'Tous les statuts') && (
              <button
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[.55rem] bg-[#eef3f8] px-4 py-2.5 font-bold text-[#28577d] transition hover:-translate-y-px"
                type="button"
                onClick={() => {
                  setGroup('Tous les groupes')
                  setStatus('Tous les statuts')
                }}
              >
                Réinitialiser
              </button>
            )}
          </div>
          <div className="mt-5 flex flex-col flex-wrap gap-4 sm:flex-row">
            <label className="grid w-full min-w-0 gap-1.5 text-xs font-bold text-[#334e68] sm:w-auto sm:min-w-[210px]">
              <span>Groupe</span>
              <select className="min-h-11 cursor-pointer rounded-[.55rem] border border-[#9fb3c8] bg-white px-3 py-2 text-sm font-normal text-[#172b4d]" value={group} onChange={(event) => setGroup(event.target.value)}>
                {groupOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="grid w-full min-w-0 gap-1.5 text-xs font-bold text-[#334e68] sm:w-auto sm:min-w-[210px]">
              <span>Statut</span>
              <select className="min-h-11 cursor-pointer rounded-[.55rem] border border-[#9fb3c8] bg-white px-3 py-2 text-sm font-normal text-[#172b4d]" value={status} onChange={(event) => setStatus(event.target.value)}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 'Tous les statuts' ? option : statusLabel(option)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section aria-labelledby="schedule-title">
          <div className="flex items-center justify-between gap-4">
            <h2 className="mb-0 text-[1.15rem] font-bold text-ink" id="schedule-title">Séances à venir</h2>
            <span className="text-sm text-[#6b8299]">{visibleSessions.length} résultat{visibleSessions.length > 1 ? 's' : ''}</span>
          </div>
          {visibleSessions.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleSessions.map((session) => (
                <article className="flex min-h-[310px] flex-col rounded-2xl border border-border bg-white p-5" key={session.id}>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold ${session.status === 'confirmed' ? 'bg-soft-teal text-[#087f72]' : 'bg-[#fff4d6] text-[#8a5b00]'}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                      {statusLabel(session.status)}
                    </span>
                    <span className="px-0 py-1 text-xs font-bold tracking-[.08em] text-[#6b8299]">{session.mode}</span>
                  </div>
                  <p className="my-4 mb-1 text-xs capitalize text-[#6b8299]">{formatDate(session.date)} <span aria-hidden="true">·</span> {formatPeriod(session.period)}</p>
                  <h3 className="mb-3 text-[1.35rem] font-bold tracking-tight text-ink">{session.title}</h3>
                  <div className="flex items-center justify-start gap-2">
                    <span className="inline-flex rounded-full bg-[#e8eff8] px-2.5 py-1 text-xs font-extrabold text-[#28577d]">{session.domain}</span>
                    <span className="text-sm text-muted">Groupe {session.group}</span>
                  </div>
                  <p className="mt-auto mb-4 flex items-center gap-2 border-0 pt-5 text-sm text-muted">
                    <span className="text-xl text-teal" aria-hidden="true">◎</span>
                    {session.teacherId ? teachers[session.teacherId] : 'Sans formateur'}
                  </p>
                  <button className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[.55rem] bg-ink px-4 py-2.5 font-bold text-white transition hover:-translate-y-px hover:bg-[#1f4c72]" type="button" onClick={(event) => openDetails(session, event)}>
                    Voir le détail <span aria-hidden="true">→</span>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-[#9fb3c8] bg-white px-4 py-12 text-center" role="status">
              <span className="mb-2 block text-3xl text-muted" aria-hidden="true">⌕</span>
              <h3 className="mb-1 font-bold text-ink">Aucune séance trouvée</h3>
              <p className="mb-0 text-[#6b8299]">Modifiez les filtres pour afficher d&apos;autres séances.</p>
            </div>
          )}
        </section>
      </main>

      {selectedSession && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#102a4399] p-4" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDetails()
        }}>
          <section className="max-h-[calc(100vh-2rem)] w-full max-w-[520px] overflow-auto rounded-2xl bg-white p-5 shadow-[0_20px_60px_#102a4350] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="details-title">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-extrabold uppercase tracking-[.1em] text-muted">Détail de la séance</p>
                <h2 className="mb-5 text-[1.7rem] font-bold text-ink" id="details-title">{selectedSession.title}</h2>
              </div>
              <button className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[#eef3f8] text-2xl leading-none text-[#334e68]" type="button" aria-label="Fermer le détail" onClick={closeDetails}>×</button>
            </div>
            <div className="mb-5 flex items-center justify-start gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold ${selectedSession.status === 'confirmed' ? 'bg-soft-teal text-[#087f72]' : 'bg-[#fff4d6] text-[#8a5b00]'}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                {statusLabel(selectedSession.status)}
              </span>
              <span className="inline-flex rounded-full bg-[#e8eff8] px-2.5 py-1 text-xs font-extrabold text-[#28577d]">{selectedSession.domain}</span>
            </div>
            <dl className="mb-6 border-t border-border">
              <div className="flex justify-between border-b border-border py-3"><dt className="text-[#6b8299]">Date</dt><dd className="m-0 text-right font-bold text-[#172b4d]">{formatDate(selectedSession.date)}</dd></div>
              <div className="flex justify-between border-b border-border py-3"><dt className="text-[#6b8299]">Période</dt><dd className="m-0 text-right font-bold text-[#172b4d]">{formatPeriod(selectedSession.period)}</dd></div>
              <div className="flex justify-between border-b border-border py-3"><dt className="text-[#6b8299]">Groupe</dt><dd className="m-0 text-right font-bold text-[#172b4d]">{selectedSession.group}</dd></div>
              <div className="flex justify-between border-b border-border py-3"><dt className="text-[#6b8299]">Mode</dt><dd className="m-0 text-right font-bold text-[#172b4d]">{selectedSession.mode}</dd></div>
              <div className="flex justify-between border-b border-border py-3"><dt className="text-[#6b8299]">Formateur</dt><dd className="m-0 text-right font-bold text-[#172b4d]">{selectedSession.teacherId ? teachers[selectedSession.teacherId] : 'Sans formateur (AUTO)'}</dd></div>
            </dl>
            <button className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[.55rem] bg-ink px-4 py-2.5 font-bold text-white transition hover:-translate-y-px hover:bg-[#1f4c72]" type="button" onClick={closeDetails}>Fermer le détail</button>
          </section>
        </div>
      )}
    </div>
  )
}

export default App

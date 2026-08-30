import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  COMPLAINT_CATEGORIES,
  COMPLAINT_TEAMS,
  complaintSummary,
  getResident,
  normalizeCategory,
  roomLabel,
  updateComplaint,
  useCommunity,
} from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import RaiseComplaintModal from './RaiseComplaintModal.jsx'
import StatusBanner from './StatusBanner.jsx'

const STATUS_FILTERS = ['all', 'raised', 'pending', 'resolved', 'rejected']

function statusBadge(status, t) {
  const map = {
    raised: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
    pending: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    resolved: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    rejected: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  }
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${map[status] || map.pending}`}>
      {t(`ops.status.${status}`)}
    </span>
  )
}

export default function ComplaintsView() {
  const { t, locale } = useI18n()
  const location = useLocation()
  const state = useCommunity()
  const summary = complaintSummary(state)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [category, setCategory] = useState(location.state?.category || 'all')
  const [residentId, setResidentId] = useState(location.state?.residentId || '')
  const [raiseOpen, setRaiseOpen] = useState(Boolean(location.state?.raise))
  const [selectedId, setSelectedId] = useState(state.complaints[0]?.id || '')
  const [resolution, setResolution] = useState('')
  const [assignee, setAssignee] = useState('')
  const [flash, setFlash] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.complaints.filter((item) => {
      if (residentId && item.residentId !== residentId) return false
      if (status !== 'all' && item.status !== status) return false
      if (category !== 'all' && normalizeCategory(item.category) !== category) return false
      if (!q) return true
      const resident = getResident(state, item.residentId)
      return [item.title, item.category, item.description, resident?.name, resident?.phone]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [category, query, residentId, state, status])

  const selected = rows.find((item) => item.id === selectedId) || rows[0] || null
  const resident = selected ? getResident(state, selected.residentId) : null

  const setStatusOf = (next, extra = {}) => {
    if (!selected) return
    updateComplaint(selected.id, { status: next, ...extra })
    setFlash(t('ops.complaintUpdated'))
    setResolution('')
  }

  const cards = [
    { key: 'raised', value: summary.raised, tone: 'bg-sky-50 text-sky-800 dark:bg-sky-500/10 dark:text-sky-200' },
    { key: 'resolved', value: summary.resolved, tone: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200' },
    { key: 'pending', value: summary.pending, tone: 'bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200' },
    { key: 'rejected', value: summary.rejected, tone: 'bg-rose-50 text-rose-800 dark:bg-rose-500/10 dark:text-rose-200' },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => setStatus(card.key === 'raised' && status !== 'raised' ? 'all' : card.key)}
            className={`dash-card rounded-2xl p-4 text-left ${card.tone}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80">{t(`ops.complaintCard.${card.key}`)}</p>
            <p className="mt-2 font-display text-3xl font-semibold">{card.value}</p>
          </button>
        ))}
      </div>

      {flash ? <StatusBanner tone="success">{flash}</StatusBanner> : null}
      {residentId ? (
        <StatusBanner tone="info">
          <span className="flex flex-wrap items-center justify-between gap-2">
            <span>
              {t('ops.complaintsFor', {
                name: location.state?.residentName || getResident(state, residentId)?.name || t('ops.unknownResident'),
              })}
            </span>
            <DashBtn variant="outline" onClick={() => setResidentId('')}>
              {t('ops.clearResidentFilter')}
            </DashBtn>
          </span>
        </StatusBanner>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
        <section className="dash-card overflow-hidden rounded-2xl">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{t('ops.complaintList')}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('ops.complaintListHint')}</p>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:max-w-xl sm:flex-row">
              <DashBtn onClick={() => setRaiseOpen(true)}>{t('home.raiseComplaint')}</DashBtn>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('ops.searchComplaints')}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <option value="all">{t('home.allCategories')}</option>
                {COMPLAINT_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {STATUS_FILTERS.map((item) => (
                  <option key={item} value={item}>
                    {item === 'all' ? t('ops.allStatuses') : t(`ops.status.${item}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {rows.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">{t('ops.noComplaints')}</p>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-white/5">
              {rows.map((item) => {
                const owner = getResident(state, item.residentId)
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(item.id)
                        setFlash('')
                        setAssignee(item.assignee || '')
                      }}
                      className={`flex w-full flex-col gap-1 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 ${
                        selected?.id === item.id ? 'bg-emerald-50/70 dark:bg-emerald-500/10' : ''
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                        {statusBadge(item.status, t)}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {owner?.name || t('ops.unknownResident')} · {item.category} · {item.raisedAt}
                      </p>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <section className="dash-card rounded-2xl p-4">
          {!selected ? (
            <p className="py-8 text-center text-sm text-slate-500">{t('ops.selectComplaint')}</p>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{selected.title}</h3>
                {statusBadge(selected.status, t)}
              </div>
              <dl className="grid gap-2 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-slate-400">{t('ops.resident')}</dt>
                  <dd className="font-medium text-slate-800 dark:text-slate-100">
                    {resident?.name || t('ops.unknownResident')}
                    {resident ? ` · ${resident.phone}` : ''}
                  </dd>
                  {resident ? <dd className="text-xs text-slate-500">{resident.email}</dd> : null}
                  {resident ? <dd className="text-xs text-slate-500">{roomLabel(resident.roomId)}</dd> : null}
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-slate-400">{t('ops.category')}</dt>
                  <dd className="text-slate-800 dark:text-slate-100">{selected.category}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-slate-400">{t('ops.dateRaised')}</dt>
                  <dd className="text-slate-800 dark:text-slate-100">
                    {new Date(`${selected.raisedAt}T00:00:00`).toLocaleDateString(locale, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-slate-400">{t('ops.description')}</dt>
                  <dd className="text-slate-700 dark:text-slate-200">{selected.description}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-slate-400">{t('ops.assignee')}</dt>
                  <dd className="text-slate-800 dark:text-slate-100">{selected.assignee || t('ops.unassigned')}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-slate-400">{t('ops.resolution')}</dt>
                  <dd className="text-slate-700 dark:text-slate-200">{selected.resolution || t('ops.noResolution')}</dd>
                </div>
              </dl>

              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                {t('ops.assignTeam')}
                <select
                  value={assignee || selected.assignee || ''}
                  onChange={(event) => setAssignee(event.target.value)}
                  className="field"
                >
                  <option value="">{t('ops.unassigned')}</option>
                  {COMPLAINT_TEAMS.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </label>
              <DashBtn
                variant="outline"
                onClick={() => {
                  updateComplaint(selected.id, { assignee: assignee || selected.assignee, status: selected.status === 'raised' ? 'pending' : selected.status })
                  setFlash(t('ops.complaintUpdated'))
                }}
              >
                {t('ops.saveAssignee')}
              </DashBtn>

              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                {t('ops.resolutionNotes')}
                <textarea
                  value={resolution}
                  onChange={(event) => setResolution(event.target.value)}
                  rows={3}
                  className="field"
                  placeholder={t('ops.resolutionPlaceholder')}
                />
              </label>

              <div className="flex flex-wrap gap-2">
                <DashBtn variant="outline" onClick={() => setStatusOf('pending')}>
                  {t('ops.markPending')}
                </DashBtn>
                <DashBtn
                  onClick={() =>
                    setStatusOf('resolved', {
                      resolution: resolution.trim() || selected.resolution || t('ops.markedResolved'),
                      assignee: assignee || selected.assignee,
                    })
                  }
                >
                  {t('ops.markResolved')}
                </DashBtn>
                <DashBtn
                  variant="danger"
                  onClick={() =>
                    setStatusOf('rejected', {
                      resolution: resolution.trim() || selected.resolution || t('ops.markedRejected'),
                      assignee: assignee || selected.assignee,
                    })
                  }
                >
                  {t('ops.markRejected')}
                </DashBtn>
              </div>
            </div>
          )}
        </section>
      </div>
      <RaiseComplaintModal open={raiseOpen} onClose={() => setRaiseOpen(false)} />
    </div>
  )
}

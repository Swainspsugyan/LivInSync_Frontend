import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getBlock, getRoom, placementOf, roomLabel, useCommunity } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import StatusBanner from './StatusBanner.jsx'

function placementBadge(place, t) {
  const map = {
    active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    upcoming: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
    past: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
  }
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${map[place]}`}>
      {t(`ops.placement.${place}`)}
    </span>
  )
}

export default function DirectoryView({ onNavigate }) {
  const { t } = useI18n()
  const location = useLocation()
  const state = useCommunity()
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('active')
  const flash = location.state?.flash

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.residents
      .map((resident) => ({ resident, place: placementOf(resident) }))
      .filter(({ place }) => (tab === 'upcoming' ? place === 'upcoming' : place === 'active'))
      .filter(({ resident }) => {
        if (!q) return true
        const room = getRoom(resident.roomId)
        const block = room ? getBlock(room.blockId) : null
        return [resident.name, resident.phone, resident.email, room?.number, block?.name]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q)
      })
  }, [query, state.residents, tab])

  const actions = [
    { id: 'directory-bulk-change', label: t('ops.bulkRoomChange') },
    { id: 'directory-bulk-upload', label: t('ops.bulkUpload') },
    { id: 'directory-new', label: t('ops.addResident'), primary: true },
    { id: 'directory-past', label: t('ops.pastResidents') },
    { id: 'directory-requests', label: t('ops.roomChangeRequests') },
  ]

  return (
    <div className="space-y-4">
      <section className="dash-card rounded-2xl p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{t('ops.directoryTitle')}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('ops.directoryHint')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {actions.map((action) => (
              <DashBtn key={action.id} variant={action.primary ? 'primary' : 'outline'} onClick={() => onNavigate(action.id)}>
                {action.label}
              </DashBtn>
            ))}
          </div>
        </div>
      </section>

      {flash ? <StatusBanner tone="success">{flash}</StatusBanner> : null}

      <section className="dash-card overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {[
              { id: 'active', label: t('ops.activeResidents') },
              { id: 'upcoming', label: t('ops.prebookings') },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  tab === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('ops.searchResidents')}
            className="w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        {rows.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">{t('ops.noResidents')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500 dark:bg-white/5">
                <tr>
                  <th className="px-4 py-2 font-semibold">{t('ops.resident')}</th>
                  <th className="px-4 py-2 font-semibold">{t('ops.contact')}</th>
                  <th className="px-4 py-2 font-semibold">{t('ops.room')}</th>
                  <th className="px-4 py-2 font-semibold">{t('ops.dates')}</th>
                  <th className="px-4 py-2 font-semibold">{t('ops.statusLabel')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {rows.map(({ resident, place }) => {
                  const room = getRoom(resident.roomId)
                  return (
                    <tr key={resident.id}>
                      <td className="px-4 py-2.5 font-medium text-slate-900 dark:text-white">{resident.name}</td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">
                        <div>{resident.phone}</div>
                        <div className="text-xs text-slate-400">{resident.email}</div>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">
                        {roomLabel(resident.roomId)}
                        {room ? <div className="text-xs text-slate-400">{t(room.typeKey)}</div> : null}
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">
                        {resident.startDate}
                        {resident.endUndecided ? ` → ${t('ops.openEnded')}` : resident.endDate ? ` → ${resident.endDate}` : ''}
                      </td>
                      <td className="px-4 py-2.5">{placementBadge(place, t)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}


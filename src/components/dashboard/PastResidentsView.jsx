import { useMemo, useState } from 'react'
import { getRoom, placementOf, roomLabel, useCommunity } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'

export default function PastResidentsView({ onBack }) {
  const { t } = useI18n()
  const state = useCommunity()
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.residents
      .filter((resident) => placementOf(resident) === 'past')
      .filter((resident) => {
        if (!q) return true
        const room = getRoom(resident.roomId)
        return [resident.name, resident.phone, resident.email, room?.number]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q)
      })
  }, [query, state.residents])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{t('ops.pastResidents')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('ops.pastHint')}</p>
        </div>
        <DashBtn variant="outline" onClick={onBack}>
          {t('common.back')}
        </DashBtn>
      </div>

      <section className="dash-card overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10">
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('dash.shown', { count: rows.length })}</p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('ops.searchResidents')}
            className="w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        {rows.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">{t('ops.noPastResidents')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500 dark:bg-white/5">
                <tr>
                  <th className="px-4 py-2 font-semibold">{t('ops.resident')}</th>
                  <th className="px-4 py-2 font-semibold">{t('ops.contact')}</th>
                  <th className="px-4 py-2 font-semibold">{t('ops.room')}</th>
                  <th className="px-4 py-2 font-semibold">{t('ops.startDate')}</th>
                  <th className="px-4 py-2 font-semibold">{t('ops.endDate')}</th>
                  <th className="px-4 py-2 font-semibold">{t('ops.statusLabel')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {rows.map((resident) => {
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
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{resident.startDate}</td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{resident.endDate || '—'}</td>
                      <td className="px-4 py-2.5">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-white/10 dark:text-slate-300">
                          {t('ops.placement.past')}
                        </span>
                      </td>
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

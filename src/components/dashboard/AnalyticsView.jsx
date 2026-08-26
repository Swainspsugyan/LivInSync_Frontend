import { ArrowUpRight } from 'lucide-react'
import { BLOCK_SPECS, occupancyCounts, useCommunity, vacantByType } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import BlockOccupancy from './BlockOccupancy.jsx'

export default function AnalyticsView() {
  const { t } = useI18n()
  const state = useCommunity()
  const counts = occupancyCounts(state)
  const types = vacantByType(state)
  const occupancy = counts.total ? Math.round((counts.occupied / counts.total) * 100) : 0

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="dash-card rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('analytics.occupancy')}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">{occupancy}%</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <ArrowUpRight size={14} aria-hidden /> {t('analytics.vsMonth')}
          </p>
        </article>
        <article className="dash-card rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('analytics.occVacant')}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">
            {counts.occupied} / {counts.vacant}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {t('analytics.totalRoomsCount', { count: counts.total, blocks: BLOCK_SPECS.length })}
          </p>
        </article>
        <article className="dash-card rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('analytics.collected')}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">$65,000</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('analytics.collectedHint')}</p>
        </article>
      </div>

      <BlockOccupancy state={state} />

      <section className="dash-card overflow-hidden rounded-2xl" aria-labelledby="type-heading">
        <div className="border-b border-slate-200 px-4 py-3 dark:border-white/10">
          <h2 id="type-heading" className="text-sm font-semibold text-slate-900 dark:text-white">
            {t('analytics.byType')}
          </h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500 dark:bg-white/5">
            <tr>
              <th className="px-4 py-2 font-semibold">{t('analytics.layout')}</th>
              <th className="px-4 py-2 font-semibold">{t('analytics.vacant')}</th>
              <th className="px-4 py-2 font-semibold">{t('analytics.typicalRent')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {types.map((row) => (
              <tr key={row.type}>
                <td className="px-4 py-2.5 font-medium text-slate-800 dark:text-slate-100">{t(row.typeKey)}</td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{row.vacant}</td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">₹{row.rent.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

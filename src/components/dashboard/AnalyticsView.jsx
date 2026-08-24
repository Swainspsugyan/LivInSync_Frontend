import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../../lib/i18n.jsx'

const TOWERS = [
  { nameKey: 'analytics.blockA', rooms: 72, occupied: 61 },
  { nameKey: 'analytics.blockB', rooms: 64, occupied: 50 },
  { nameKey: 'analytics.blockC', rooms: 56, occupied: 41 },
  { nameKey: 'analytics.blockD', rooms: 56, occupied: 44 },
]

const TYPES = [
  { typeKey: 'dash.typeStudio', vacant: 8, rent: '₹8,500' },
  { typeKey: 'dash.type1bhk', vacant: 14, rent: '₹11,500' },
  { typeKey: 'dash.type2bhk', vacant: 21, rent: '₹15,800' },
  { typeKey: 'dash.type3bhk', vacant: 9, rent: '₹22,000' },
]

export default function AnalyticsView() {
  const { t } = useI18n()

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="dash-card rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('analytics.occupancy')}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">75%</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <ArrowUpRight size={14} aria-hidden /> {t('analytics.vsMonth')}
          </p>
        </article>
        <article className="dash-card rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('analytics.occVacant')}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">375 / 125</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('analytics.totalRooms')}</p>
        </article>
        <article className="dash-card rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('analytics.collected')}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">$65,000</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('analytics.collectedHint')}</p>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="dash-card rounded-2xl p-4" aria-labelledby="tower-heading">
          <h2 id="tower-heading" className="text-sm font-semibold text-slate-900 dark:text-white">
            {t('analytics.byTower')}
          </h2>
          <ul className="mt-4 space-y-3">
            {TOWERS.map((tower) => {
              const pct = Math.round((tower.occupied / tower.rooms) * 100)
              return (
                <li key={tower.nameKey}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{t(tower.nameKey)}</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {tower.occupied}/{tower.rooms} · {pct}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

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
              {TYPES.map((row) => (
                <tr key={row.typeKey}>
                  <td className="px-4 py-2.5 font-medium text-slate-800 dark:text-slate-100">{t(row.typeKey)}</td>
                  <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{row.vacant}</td>
                  <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{row.rent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}

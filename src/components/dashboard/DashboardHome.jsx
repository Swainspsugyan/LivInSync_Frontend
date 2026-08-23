import { useNavigate } from 'react-router-dom'
import { METRIC_CARDS } from '../../lib/dashboardMetrics.js'
import DonutMetricCard from './DonutMetricCard.jsx'

const VACANT_UNITS = [
  { id: 'a-402', block: 'Block A, Building 3', room: 'Flat 402', type: '2 BHK', rent: '₹15,000' },
  { id: 'b-108', block: 'Block B, Tower 1', room: 'Flat 108', type: '1 BHK', rent: '₹11,500' },
  { id: 'c-12', block: 'Block C, Building 2', room: 'Studio 12', type: 'Studio', rent: '₹8,500' },
  { id: 'a-705', block: 'Block A, Building 1', room: 'Flat 705', type: '3 BHK', rent: '₹22,000' },
  { id: 'd-219', block: 'Block D, Tower 2', room: 'Flat 219', type: '2 BHK', rent: '₹16,500' },
]

export default function DashboardHome({ onAssign, onViewUnit }) {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {METRIC_CARDS.map((metric, index) => (
          <DonutMetricCard
            key={metric.id}
            metric={metric}
            delay={index * 0.08}
            onOpen={metric.href ? () => navigate(metric.href) : undefined}
          />
        ))}
      </div>

      <section className="dash-card flex min-h-0 flex-col rounded-2xl" aria-labelledby="vacant-heading">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 dark:border-white/10">
          <div>
            <h2 id="vacant-heading" className="text-sm font-semibold text-slate-900 dark:text-white">
              Vacant units
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">125 rooms ready to assign</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            {VACANT_UNITS.length} shown
          </span>
        </div>
        <ul className="divide-y divide-slate-100 overflow-auto dark:divide-white/5">
          {VACANT_UNITS.map((unit) => (
            <li key={unit.id} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{unit.room}</p>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    Vacant
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{unit.block}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {unit.type} · {unit.rent}
                  <span className="text-slate-400"> / month</span>
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => onViewUnit?.(unit)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  View details
                </button>
                <button
                  type="button"
                  onClick={() => onAssign?.(unit)}
                  className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
                >
                  Assign resident
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

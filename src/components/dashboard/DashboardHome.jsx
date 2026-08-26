import { useNavigate } from 'react-router-dom'
import { formatINR, getBlock, getDashboardMetrics, getVacantUnits, occupancyCounts, useCommunity } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import { METRIC_CARDS } from '../../lib/dashboardMetrics.js'
import DonutMetricCard from './DonutMetricCard.jsx'

function liveMetricCards(metrics, t) {
  return METRIC_CARDS.map((card) => {
    if (card.id === 'capacity') {
      return {
        ...card,
        value: String(metrics.capacity),
        summary: t('ops.capacitySummary', {
          total: metrics.capacity,
          occupied: metrics.occupied,
          vacant: metrics.vacant,
        }),
        slices: [
          { nameKey: 'metrics.occupied', value: metrics.occupied, color: '#22d3ee' },
          { nameKey: 'metrics.vacant', value: metrics.vacant, color: '#a855f7' },
        ],
      }
    }
    if (card.id === 'occupied') {
      return {
        ...card,
        value: String(metrics.occupied),
        summary: t('ops.occupiedSummary', {
          occupied: metrics.occupied,
          permanent: Math.max(0, metrics.permanent),
          shortTerm: Math.max(0, metrics.shortTerm),
        }),
        slices: [
          { nameKey: 'metrics.permanent', value: Math.max(0, metrics.permanent), color: '#38bdf8' },
          { nameKey: 'metrics.shortTerm', value: Math.max(0, metrics.shortTerm), color: '#e879f9' },
        ],
      }
    }
    if (card.id === 'vacant') {
      const studios = metrics.vacantByType.find((row) => row.type === 'Studio')?.vacant || 0
      const oneBed = metrics.vacantByType.find((row) => row.type === '1 BHK')?.vacant || 0
      const twoBed = metrics.vacantByType.find((row) => row.type === '2 BHK')?.vacant || 0
      const other = Math.max(0, metrics.vacant - studios - oneBed - twoBed)
      return {
        ...card,
        value: String(metrics.vacant),
        summary: t('ops.vacantSummary', { vacant: metrics.vacant }),
        slices: [
          { nameKey: 'metrics.studios', value: studios, color: '#22d3ee' },
          { nameKey: 'metrics.oneBed', value: oneBed, color: '#60a5fa' },
          { nameKey: 'metrics.twoBed', value: twoBed + other, color: '#c084fc' },
        ],
      }
    }
    return card
  })
}

export default function DashboardHome({ onAssign, onViewUnit }) {
  const navigate = useNavigate()
  const { t } = useI18n()
  const state = useCommunity()
  const metrics = getDashboardMetrics(state)
  const counts = occupancyCounts(state)
  const vacantUnits = getVacantUnits(state, 5)
  const cards = liveMetricCards(metrics, t)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((metric, index) => (
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
              {t('dash.vacantUnits')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('dash.readyAssign', { count: counts.vacant })}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            {t('dash.shown', { count: vacantUnits.length })}
          </span>
        </div>
        {vacantUnits.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">{t('ops.noVacantRooms')}</p>
        ) : (
          <ul className="divide-y divide-slate-100 overflow-auto dark:divide-white/5">
            {vacantUnits.map((unit) => (
              <li key={unit.id} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t('ops.roomN', { n: unit.number })}</p>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                      {t('dash.vacant')}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {t('ops.blockFloor', { block: getBlock(unit.blockId)?.name || unit.blockId, floor: unit.floor })}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {t(unit.typeKey)} · {formatINR(unit.rent)}
                    <span className="text-slate-400">{t('dash.perMonth')}</span>
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onViewUnit?.({
                        room: t('ops.roomN', { n: unit.number }),
                        block: `Block ${unit.blockId.replace('block-', '')}, Floor ${unit.floor}`,
                        type: t(unit.typeKey),
                        rent: formatINR(unit.rent),
                      })
                    }
                    className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    {t('dash.viewDetails')}
                  </button>
                  <button
                    type="button"
                    onClick={() => onAssign?.(unit)}
                    className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
                  >
                    {t('dash.assign')}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

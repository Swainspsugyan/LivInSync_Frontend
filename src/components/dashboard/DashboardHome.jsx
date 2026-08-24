import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../lib/i18n.jsx'
import { METRIC_CARDS, ROOM_CAPACITY_CARDS } from '../../lib/dashboardMetrics.js'
import DonutMetricCard from './DonutMetricCard.jsx'
import RoomCapacityCard from './RoomCapacityCard.jsx'

const VACANT_UNITS = [
  { id: 'a-402', blockKey: 'dash.blockA3', roomKey: 'dash.flat402', typeKey: 'dash.type2bhk', rent: '₹15,000' },
  { id: 'b-108', blockKey: 'dash.blockB1', roomKey: 'dash.flat108', typeKey: 'dash.type1bhk', rent: '₹11,500' },
  { id: 'c-12', blockKey: 'dash.blockC2', roomKey: 'dash.studio12', typeKey: 'dash.typeStudio', rent: '₹8,500' },
  { id: 'a-705', blockKey: 'dash.blockA1', roomKey: 'dash.flat705', typeKey: 'dash.type3bhk', rent: '₹22,000' },
  { id: 'd-219', blockKey: 'dash.blockD2', roomKey: 'dash.flat219', typeKey: 'dash.type2bhk', rent: '₹16,500' },
]

export default function DashboardHome({ onAssign, onViewUnit }) {
  const navigate = useNavigate()
  const { t } = useI18n()

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

      <section aria-labelledby="room-capacity-heading">
        <div className="mb-3">
          <h2 id="room-capacity-heading" className="text-sm font-semibold text-slate-900 dark:text-white">
            {t('rooms.heading')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('rooms.hint')}</p>
        </div>
        <div className="room-capacity-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ROOM_CAPACITY_CARDS.map((room) => (
            <RoomCapacityCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="dash-card flex min-h-0 flex-col rounded-2xl" aria-labelledby="vacant-heading">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 dark:border-white/10">
          <div>
            <h2 id="vacant-heading" className="text-sm font-semibold text-slate-900 dark:text-white">
              {t('dash.vacantUnits')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('dash.readyAssign', { count: 125 })}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            {t('dash.shown', { count: VACANT_UNITS.length })}
          </span>
        </div>
        <ul className="divide-y divide-slate-100 overflow-auto dark:divide-white/5">
          {VACANT_UNITS.map((unit) => (
            <li key={unit.id} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t(unit.roomKey)}</p>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    {t('dash.vacant')}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{t(unit.blockKey)}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {t(unit.typeKey)} · {unit.rent}
                  <span className="text-slate-400">{t('dash.perMonth')}</span>
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onViewUnit?.({
                      ...unit,
                      room: t(unit.roomKey),
                      block: t(unit.blockKey),
                      type: t(unit.typeKey),
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
      </section>
    </div>
  )
}

import { AlertTriangle, ArrowUpDown, Droplets, Sparkles, Users, Zap } from 'lucide-react'
import { openComplaintsByCategory, useCommunity } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashPanel from './DashPanel.jsx'

const CATEGORY_ICONS = {
  Electricity: Zap,
  Water: Droplets,
  Housekeeping: Sparkles,
  Lift: ArrowUpDown,
  'Community Management': Users,
}

export default function SubjectWiseComplaintCard({ onSeeAll, onSelectCategory }) {
  const { t } = useI18n()
  const state = useCommunity()
  const rows = openComplaintsByCategory(state)
  const maxCount = Math.max(1, ...rows.map((row) => row.count))

  return (
    <DashPanel icon={AlertTriangle} title={t('home.subjectWiseTitle')} actionLabel={t('common.seeAll')} onAction={onSeeAll}>
      {rows.every((row) => row.count === 0) ? (
        <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">{t('home.noOpenComplaints')}</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => {
            const Icon = CATEGORY_ICONS[row.name] || AlertTriangle
            const width = Math.round((row.count / maxCount) * 100)
            return (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => onSelectCategory?.(row.name)}
                  className="group flex w-full items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                    <Icon size={15} aria-hidden />
                  </span>
                  <span className="w-[7.5rem] shrink-0 truncate text-[13px] font-medium text-slate-800 dark:text-slate-100 sm:w-36">
                    {row.name}
                  </span>
                  <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                    <span
                      className="block h-full rounded-full bg-sky-500 transition-[width] duration-300"
                      style={{ width: `${width}%` }}
                    />
                  </span>
                  <span className="w-5 shrink-0 text-right text-sm font-semibold text-slate-800 dark:text-white">{row.count}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </DashPanel>
  )
}

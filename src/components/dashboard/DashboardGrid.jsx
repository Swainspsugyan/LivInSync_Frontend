import { Mail, Phone, Ticket, UserRound, Users } from 'lucide-react'
import MetricsCard, { Ring, Sparkline } from './MetricsCard.jsx'

const categories = [
  { label: 'Boarding', count: 4 },
  { label: 'Toilet', count: 3 },
  { label: 'Housekeeping', count: 2 },
  { label: 'Lift', count: 2 },
  { label: 'Community Management', count: 1 },
]

const tasks = [
  { title: 'Watch dogs out', meta: '2025-10-16 · 3 days remaining' },
  { title: 'Lift AMC follow-up', meta: 'Due tomorrow · Maintenance' },
  { title: 'Visitor pass audit', meta: 'Security desk · Today' },
]

export default function DashboardGrid({ onOpenDetail }) {
  const maxCount = Math.max(...categories.map((c) => c.count), 1)
  const open = (title, copy) => onOpenDetail?.({ title, copy })

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3">
        <MetricsCard
          label="Applications"
          value="128"
          hint="Tickets opened this month"
          accent="bg-rose-50 text-rose-500 dark:bg-rose-500/15 dark:text-rose-300"
          icon={Ticket}
          chart={<Sparkline points={[18, 22, 19, 28, 24, 31, 29]} color="#f43f5e" />}
          onClick={() => open('Applications', 'Ticket volume, SLA trend, and tower-wise open complaints for this month.')}
        />
        <MetricsCard
          label="Shortlisted"
          value="46"
          hint="Pre-approved visitors today"
          accent="bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300"
          icon={UserRound}
          chart={<Sparkline points={[8, 12, 9, 16, 14, 18, 17]} color="#d97706" />}
          onClick={() => open('Shortlisted', 'Pre-approved visitor passes waiting at the gate today.')}
        />
        <MetricsCard
          label="Success rate"
          value="76%"
          hint="Ticket SLA this month"
          accent="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300"
          icon={Users}
          chart={
            <div className="mt-2 flex justify-end">
              <Ring value={76} color="#10b981" track="#d1fae5" />
            </div>
          }
          onClick={() => open('Success rate', 'Share of tickets closed within SLA across all towers this month.')}
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <article className="dash-glass rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            Job analysis
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Residents have raised issues quickly with precise tracking and faster resolutions.
          </p>
        </article>
        <article className="dash-glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Due tasks</p>
            <span className="text-xs text-slate-400">View All</span>
          </div>
          <ul className="mt-3 space-y-2">
            {tasks.map((task) => (
              <li
                key={task.title}
                role="button"
                tabIndex={0}
                onClick={() => open(task.title, task.meta)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    open(task.title, task.meta)
                  }
                }}
                className="cursor-pointer rounded-xl bg-white/70 p-3 transition-colors hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-emerald-500/10"
              >
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{task.title}</p>
                <p className="mt-1 text-xs text-slate-400">{task.meta}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <article className="dash-glass rounded-2xl p-4">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Open issue categories</p>
          <ul className="mt-4 space-y-3">
            {categories.map((item) => (
              <li key={item.label} className="flex min-w-0 items-center gap-2 sm:gap-3">
                <span className="w-24 shrink-0 truncate text-xs text-slate-600 dark:text-slate-300 sm:w-40 sm:text-sm">
                  {item.label}
                </span>
                <div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className="h-2 rounded-full bg-emerald-400"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-4 text-right text-xs text-slate-500 dark:text-slate-400">{item.count}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="dash-glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Emergency</p>
            <span className="text-xs text-slate-400">View All</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-white/70 dark:hover:bg-white/5">
              <Phone size={14} className="text-emerald-600" /> WhatsApp alert
            </li>
            <li className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-white/70 dark:hover:bg-white/5">
              <Mail size={14} className="text-sky-600" /> Email
            </li>
            <li className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-white/70 dark:hover:bg-white/5">
              <Phone size={14} /> 1800-511-511 108
            </li>
            <li className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-white/70 dark:hover:bg-white/5">
              <Phone size={14} /> Tower office
            </li>
          </ul>
        </article>
      </div>
    </div>
  )
}

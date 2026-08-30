import { ChevronRight } from 'lucide-react'

export default function DashPanel({ icon: Icon, title, actionLabel, onAction, children, className = '' }) {
  return (
    <section className={`dash-panel-card flex min-h-0 flex-col overflow-hidden ${className}`}>
      <header className="dash-panel-card__head flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {Icon ? (
            <span className="dash-panel-card__icon grid size-8 shrink-0 place-items-center rounded-lg" aria-hidden>
              <Icon size={16} />
            </span>
          ) : null}
          <h2 className="truncate text-sm font-semibold text-slate-900 dark:text-white">{title}</h2>
        </div>
        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold text-sky-700 hover:text-sky-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 dark:text-sky-300"
          >
            {actionLabel}
            <ChevronRight size={14} aria-hidden />
          </button>
        ) : null}
      </header>
      <div className="flex-1 px-4 py-3">{children}</div>
    </section>
  )
}

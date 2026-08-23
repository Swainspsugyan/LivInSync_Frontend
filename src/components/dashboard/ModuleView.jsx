import { MODULE_COPY } from '../../lib/dashboardNav.js'

export default function ModuleView({ viewId, title }) {
  return (
    <section className="dash-card rounded-2xl p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        Module
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {MODULE_COPY[viewId] || 'This workspace is ready for live data once the backend is connected.'}
      </p>
    </section>
  )
}

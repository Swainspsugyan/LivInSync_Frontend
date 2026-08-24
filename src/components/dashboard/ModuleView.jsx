import { useI18n } from '../../lib/i18n.jsx'

export default function ModuleView({ viewId, title }) {
  const { t } = useI18n()
  return (
    <section className="dash-card rounded-2xl p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        {t('common.module')}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {t(`module.${viewId}`) === `module.${viewId}` ? t('dash.workspaceFallback') : t(`module.${viewId}`)}
      </p>
    </section>
  )
}

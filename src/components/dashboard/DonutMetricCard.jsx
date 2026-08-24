import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '../../lib/i18n.jsx'
import IsoDonutChart from './IsoDonutChart.jsx'

export default function DonutMetricCard({ metric, delay = 0, onOpen }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const clickable = Boolean(onOpen || metric.href)

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? onOpen : undefined}
      onKeyDown={
        clickable
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onOpen?.()
              }
            }
          : undefined
      }
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={clickable && !reduce ? { scale: 0.985 } : undefined}
      className={`neon-metric-card group relative overflow-visible rounded-xl border border-slate-200 px-3.5 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:border-slate-700 dark:focus-visible:ring-cyan-400/70 ${
        clickable ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div className="neon-metric-card__wash absolute inset-0" />
        <div className="neon-metric-card__sheen absolute inset-0" />
      </div>
      <div className="relative">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 transition-colors group-hover:text-emerald-800 dark:text-cyan-200/80 dark:group-hover:text-cyan-100">
            {t(metric.titleKey)}
          </p>
          {metric.href ? (
            <span className="text-xs font-semibold text-emerald-700 group-hover:underline dark:text-cyan-300">
              {t('common.insights')}
            </span>
          ) : null}
        </div>
        <p className="mt-1.5 font-display text-3xl font-semibold leading-none text-slate-900 dark:text-white">
          {metric.value}
          <span className="ml-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">{t(metric.unitKey)}</span>
        </p>
        <IsoDonutChart
          slices={metric.slices.map((slice) => ({ ...slice, name: t(slice.nameKey) }))}
          summary={t(metric.summaryKey)}
          delay={delay + 0.12}
        />
      </div>
    </motion.article>
  )
}

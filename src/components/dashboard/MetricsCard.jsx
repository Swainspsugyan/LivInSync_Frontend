export default function MetricsCard({ label, value, hint, accent, icon: Icon, chart, onClick }) {
  return (
    <article
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      className="dash-glass cursor-pointer rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
        </div>
        <span className={`rounded-xl p-2 ${accent}`}>
          <Icon size={18} />
        </span>
      </div>
      {chart}
      {hint ? <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">{hint}</p> : null}
    </article>
  )
}

export function Sparkline({ points, color }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const w = 120
  const h = 36
  const d = points
    .map((n, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((n - min) / (max - min || 1)) * (h - 4) - 2
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-9 w-full" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Ring({ value, color, track }) {
  return (
    <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90" aria-hidden>
      <circle cx="18" cy="18" r="14" fill="none" stroke={track} strokeWidth="5" />
      <circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        stroke={color}
        strokeWidth="5"
        pathLength="100"
        strokeDasharray={`${value} ${100 - value}`}
        strokeLinecap="round"
      />
    </svg>
  )
}

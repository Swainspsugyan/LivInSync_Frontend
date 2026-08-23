import { motion, useReducedMotion } from 'framer-motion'
import { useId, useMemo, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts'
import { useTheme } from '../../lib/theme.jsx'

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function isRightSlice(item) {
  return Math.cos(((item.mid - 90) * Math.PI) / 180) >= 0
}

function buildItems(slices) {
  const total = slices.reduce((sum, item) => sum + item.value, 0) || 1
  let cursor = 90
  return slices.map((slice, index) => {
    const span = (slice.value / total) * 360
    const start = cursor
    const end = cursor - span
    const mid = start - span / 2
    cursor = end
    return {
      ...slice,
      index,
      mid,
      pct: Math.round((slice.value / total) * 100),
      displayValue: slice.value.toLocaleString('en-US'),
    }
  })
}

function ActiveSlice(props) {
  return (
    <Sector
      {...props}
      innerRadius={props.innerRadius - 1}
      outerRadius={props.outerRadius + 7}
      stroke="rgba(255,255,255,0.45)"
      strokeWidth={1.2}
    />
  )
}

const tipClass =
  'rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-800 shadow-xl dark:border-cyan-500/30 dark:bg-slate-900/90 dark:text-white'

function NeonTooltip({ active, payload, summary }) {
  if (!active || !payload?.length) return null
  const slice = payload[0].payload
  const pct = Math.round((payload[0].percent || 0) * 100)
  return (
    <div className={tipClass}>
      <p className="font-semibold text-emerald-700 dark:text-cyan-200">{slice.name}</p>
      <p className="mt-1">
        {slice.displayValue} · {pct}%
      </p>
      {summary ? <p className="mt-1 max-w-[200px] text-[11px] leading-relaxed text-slate-500 dark:text-slate-300">{summary}</p> : null}
    </div>
  )
}

function SliceLabel({ item, hover, align }) {
  const on = hover === item.index
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className="text-[15px] font-bold leading-none text-slate-900 dark:text-white">{item.pct}%</p>
      <p
        className={`mt-1 text-[13px] font-semibold leading-tight ${on ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-200'}`}
        style={{ color: on ? item.color : undefined }}
      >
        {item.name}
      </p>
    </div>
  )
}

export default function IsoDonutChart({ slices, summary, delay = 0 }) {
  const uid = useId().replace(/:/g, '')
  const { isDark } = useTheme()
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(null)
  const items = useMemo(() => buildItems(slices), [slices])
  const chartData = useMemo(
    () => slices.map((slice) => ({ ...slice, displayValue: slice.value.toLocaleString('en-US') })),
    [slices],
  )
  const active = hover != null ? items[hover] : null
  const leftItems = items.filter((item) => !isRightSlice(item))
  const rightItems = items.filter((item) => isRightSlice(item))

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex min-w-[4.75rem] shrink-0 flex-col justify-center gap-3">
        {leftItems.map((item) => (
          <SliceLabel key={item.name} item={item} hover={hover} align="right" />
        ))}
      </div>

      <div className="relative h-[132px] w-[132px] shrink-0 overflow-visible">
        <svg viewBox="0 0 132 132" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {reduce ? null : (
            <>
              <circle
                className="pie-spin-ring"
                cx="66"
                cy="66"
                r="50"
                fill="none"
                stroke={isDark ? 'rgba(34,211,238,0.45)' : 'rgba(13,131,118,0.4)'}
                strokeWidth="1.1"
                strokeDasharray="4 8"
              />
              <circle
                className="pie-spin-ring pie-spin-ring--rev"
                cx="66"
                cy="66"
                r="42"
                fill="none"
                stroke={isDark ? 'rgba(168,85,247,0.35)' : 'rgba(14,165,233,0.32)'}
                strokeWidth="1"
                strokeDasharray="3 7"
              />
            </>
          )}
          {items.map((item) => {
            const rim = polar(66, 66, 48, item.mid)
            const right = isRightSlice(item)
            const labelX = right ? 128 : 4
            const labelY = Math.min(118, Math.max(14, 66 + Math.sin(((item.mid - 90) * Math.PI) / 180) * 36))
            const on = hover === item.index
            return (
              <g key={item.name}>
                <path
                  d={`M ${rim.x} ${rim.y} L ${labelX} ${labelY}`}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={on ? 1.5 : 1}
                  opacity="0.85"
                />
                <circle cx={labelX} cy={labelY} r={on ? 3.2 : 2.6} fill={item.color} />
              </g>
            )
          })}
        </svg>

        <motion.div
          className="iso-donut-scene iso-donut-top absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2"
          animate={
            reduce || hover != null
              ? { scale: 1, filter: 'drop-shadow(0 8px 12px rgba(34,211,238,0.25))' }
              : {
                  scale: [1, 1.06, 1],
                  filter: [
                    'drop-shadow(0 8px 10px rgba(34,211,238,0.2))',
                    'drop-shadow(0 10px 18px rgba(168,85,247,0.4))',
                    'drop-shadow(0 8px 10px rgba(34,211,238,0.2))',
                  ],
                }
          }
          transition={
            reduce || hover != null
              ? { duration: 0.25 }
              : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={47}
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
                isAnimationActive={!reduce}
                animationBegin={Math.round(delay * 1000)}
                animationDuration={1100}
                activeIndex={hover ?? undefined}
                activeShape={ActiveSlice}
                onMouseEnter={(_, index) => setHover(index)}
                onMouseLeave={() => setHover(null)}
                stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.12)'}
                strokeWidth={1}
              >
                {chartData.map((slice, index) => (
                  <Cell
                    key={`${uid}-${slice.name}`}
                    fill={slice.color}
                    style={{
                      cursor: 'pointer',
                      filter: hover === index ? `drop-shadow(0 0 12px ${slice.color})` : 'none',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<NeonTooltip summary={summary} />} wrapperStyle={{ display: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="flex min-w-[4.75rem] flex-1 flex-col justify-center gap-3">
        {rightItems.map((item) => (
          <SliceLabel key={item.name} item={item} hover={hover} align="left" />
        ))}
      </div>

      <div className="w-[96px] shrink-0">
        {active ? (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            className={tipClass}
          >
            <p className="font-semibold text-emerald-700 dark:text-cyan-200">{active.name}</p>
            <p className="mt-1">
              {active.displayValue} · {active.pct}%
            </p>
            {summary ? <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-300">{summary}</p> : null}
          </motion.div>
        ) : (
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">Hover a slice</p>
        )}
      </div>
    </div>
  )
}

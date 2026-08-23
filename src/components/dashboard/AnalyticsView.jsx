import { ArrowUpRight } from 'lucide-react'

const TOWERS = [
  { name: 'Block A', rooms: 72, occupied: 61 },
  { name: 'Block B', rooms: 64, occupied: 50 },
  { name: 'Block C', rooms: 56, occupied: 41 },
  { name: 'Block D', rooms: 56, occupied: 44 },
]

const TYPES = [
  { type: 'Studio', vacant: 8, rent: '₹8,500' },
  { type: '1 BHK', vacant: 14, rent: '₹11,500' },
  { type: '2 BHK', vacant: 21, rent: '₹15,800' },
  { type: '3 BHK', vacant: 9, rent: '₹22,000' },
]

export default function AnalyticsView() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="dash-card rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Occupancy</p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">75%</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <ArrowUpRight size={14} aria-hidden /> +2.4% vs last month
          </p>
        </article>
        <article className="dash-card rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Occupied / vacant</p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">375 / 125</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">500 total rooms across 4 towers</p>
        </article>
        <article className="dash-card rounded-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Collected this month</p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">$65,000</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Rent, amenities, and maintenance this month</p>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="dash-card rounded-2xl p-4" aria-labelledby="tower-heading">
          <h2 id="tower-heading" className="text-sm font-semibold text-slate-900 dark:text-white">
            Occupancy by tower
          </h2>
          <ul className="mt-4 space-y-3">
            {TOWERS.map((tower) => {
              const pct = Math.round((tower.occupied / tower.rooms) * 100)
              return (
                <li key={tower.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{tower.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {tower.occupied}/{tower.rooms} · {pct}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="dash-card overflow-hidden rounded-2xl" aria-labelledby="type-heading">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-white/10">
            <h2 id="type-heading" className="text-sm font-semibold text-slate-900 dark:text-white">
              Vacant by room type
            </h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500 dark:bg-white/5">
              <tr>
                <th className="px-4 py-2 font-semibold">Layout</th>
                <th className="px-4 py-2 font-semibold">Vacant</th>
                <th className="px-4 py-2 font-semibold">Typical rent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {TYPES.map((row) => (
                <tr key={row.type}>
                  <td className="px-4 py-2.5 font-medium text-slate-800 dark:text-slate-100">{row.type}</td>
                  <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{row.vacant}</td>
                  <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{row.rent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}

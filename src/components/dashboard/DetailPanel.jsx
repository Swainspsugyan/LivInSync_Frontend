import { ArrowLeft } from 'lucide-react'

export default function DetailPanel({ title, copy, onBack }) {
  return (
    <div className="dash-card rounded-2xl p-6 sm:p-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-300"
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <h2 className="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">{copy}</p>
    </div>
  )
}

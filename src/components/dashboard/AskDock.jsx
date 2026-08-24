import { ArrowUp, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '../../lib/i18n.jsx'
import ComponentWrapper from './ComponentWrapper.jsx'

export default function AskDock() {
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const [reply, setReply] = useState('')

  return (
    <div className="pointer-events-auto w-full max-w-md">
      <ComponentWrapper show={Boolean(reply)} itemKey={reply}>
        <p className="dash-card mb-2 rounded-2xl px-3 py-2 text-sm text-slate-700 dark:text-slate-100">
          {reply}
        </p>
      </ComponentWrapper>
      <form
        className="dash-card rounded-2xl p-2 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault()
          const text = q.trim()
          if (!text) return
          setReply(t('dash.askReply', { text }))
          setQ('')
        }}
      >
        <label className="flex items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <Sparkles size={16} />
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('dash.askPlaceholder')}
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100"
          />
          <button
            type="submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            aria-label={t('common.send')}
          >
            <ArrowUp size={16} />
          </button>
        </label>
      </form>
    </div>
  )
}

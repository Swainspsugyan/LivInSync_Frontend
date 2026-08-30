import { useEffect, useId, useRef, useState } from 'react'
import { Megaphone, MessageSquarePlus, Plus, Star, UserPlus } from 'lucide-react'
import { useI18n } from '../../lib/i18n.jsx'

export default function QuickActions({ onRaise, onAddNotice, onAddFavourite, onAddResident }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const menuId = useId()

  const actions = [
    { id: 'raise', label: t('home.raiseComplaint'), icon: MessageSquarePlus, run: onRaise },
    { id: 'notice', label: t('home.addNotice'), icon: Megaphone, run: onAddNotice },
    { id: 'resident', label: t('ops.addResident'), icon: UserPlus, run: onAddResident },
    { id: 'favourite', label: t('home.addFavourite'), icon: Star, run: onAddFavourite },
  ].filter((item) => typeof item.run === 'function')

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <section className="dash-panel-card flex h-full flex-col items-center justify-center gap-3 p-4">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{t('home.quickActions')}</h2>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          aria-label={t('home.quickActions')}
          aria-expanded={open}
          aria-controls={menuId}
          title={t('home.quickActions')}
          onClick={() => setOpen((prev) => !prev)}
          className="grid size-14 place-items-center rounded-full bg-sky-600 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        >
          <Plus size={26} aria-hidden />
        </button>
        {open ? (
          <ul
            id={menuId}
            role="menu"
            className="absolute left-1/2 z-30 mt-3 w-56 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-[#10233a]"
          >
            {actions.map((action) => (
              <li key={action.id} role="none">
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 dark:text-slate-100 dark:hover:bg-white/5"
                  onClick={() => {
                    setOpen(false)
                    action.run()
                  }}
                >
                  <action.icon size={16} aria-hidden />
                  {action.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

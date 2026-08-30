import { ChevronDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DASH_NAV, groupForView, navItemIsActive } from '../../lib/dashboardNav.js'
import { useI18n } from '../../lib/i18n.jsx'
import BrandMark from '../BrandMark.jsx'

function parentClass(active) {
  return `flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition-colors ${
    active
      ? 'bg-emerald-50 text-emerald-700 shadow-[inset_3px_0_0_#10b981] dark:bg-emerald-500/15 dark:text-emerald-300'
      : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-100 dark:hover:bg-white/5 dark:hover:text-white'
  }`
}

function childClass(active) {
  return `flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
    active
      ? 'bg-emerald-50 font-semibold text-emerald-700 shadow-[inset_3px_0_0_#10b981] dark:bg-emerald-500/15 dark:text-emerald-300'
      : 'font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
  }`
}

export default function Sidebar({ active, onSelect, open, onClose }) {
  const { t } = useI18n()
  const [openGroups, setOpenGroups] = useState(() => {
    const group = groupForView(active)
    return group ? { [group]: true } : {}
  })

  useEffect(() => {
    const group = groupForView(active)
    if (group) setOpenGroups((prev) => ({ ...prev, [group]: true }))
  }, [active])

  const toggleGroup = (id) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex w-[248px] flex-col border-r border-white/25 bg-transparent pt-4 backdrop-blur-[2px] transition-[color,background-color,border-color,transform] duration-300 dark:border-white/10 dark:bg-[#0b1b2b] lg:static lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-4 pb-4">
        <BrandMark
          compact
          className="min-w-0"
          titleClass="text-slate-900 dark:text-white"
          subtitleClass="text-slate-500 dark:text-white/55"
        />
        <button
          type="button"
          className="shrink-0 rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:text-white/70 dark:hover:bg-white/10 lg:hidden"
          onClick={onClose}
          aria-label={t('common.closeMenu')}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6" aria-label={t('nav.admin')}>
        {DASH_NAV.map((item) => {
          if (!item.children) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={navItemIsActive(item.id, active) ? 'page' : undefined}
                className={`mb-1 ${parentClass(navItemIsActive(item.id, active))}`}
              >
                <span className="w-5 shrink-0 text-center text-sm leading-none" aria-hidden>
                  {item.emoji || <item.icon size={16} />}
                </span>
                {t(`nav.${item.id}`)}
              </button>
            )
          }

          const expanded = Boolean(openGroups[item.id])
          const childActive = item.children.some((child) => navItemIsActive(child.id, active))

          return (
            <div key={item.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggleGroup(item.id)}
                aria-expanded={expanded}
                aria-controls={`${item.id}-submenu`}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition-colors ${
                  childActive
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-100 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                <span className="w-5 shrink-0 text-center text-sm leading-none" aria-hidden>
                  {item.emoji || <item.icon size={16} />}
                </span>
                <span className="min-w-0 flex-1">{t(`nav.${item.id}`)}</span>
                <ChevronDown
                  size={14}
                  className={`shrink-0 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {expanded && (
                <ul id={`${item.id}-submenu`} className="mt-0.5 space-y-0.5 border-l-2 border-slate-200 pl-3 ml-[1.15rem] dark:border-white/15">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(child.id)}
                        aria-current={navItemIsActive(child.id, active) ? 'page' : undefined}
                        className={childClass(navItemIsActive(child.id, active))}
                      >
                        {t(`nav.${child.id}`)}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

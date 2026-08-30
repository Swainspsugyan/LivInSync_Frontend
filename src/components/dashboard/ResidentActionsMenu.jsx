import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Eye, FileText, Megaphone, MoreVertical, Pencil, Receipt, Trash2 } from 'lucide-react'
import { useI18n } from '../../lib/i18n.jsx'

const MENU_WIDTH = 208
const MENU_HEIGHT = 280

export default function ResidentActionsMenu({ resident, onAction }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)
  const menuId = useId()

  const place = () => {
    const node = buttonRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    let left = rect.right - MENU_WIDTH
    left = Math.min(Math.max(8, left), window.innerWidth - MENU_WIDTH - 8)
    const openUp = rect.bottom + MENU_HEIGHT > window.innerHeight - 8 && rect.top > MENU_HEIGHT
    setCoords(
      openUp
        ? { left, bottom: window.innerHeight - rect.top + 4 }
        : { left, top: rect.bottom + 4 },
    )
  }

  useLayoutEffect(() => {
    if (open) place()
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (event) => {
      if (buttonRef.current?.contains(event.target) || menuRef.current?.contains(event.target)) return
      setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onMove = () => setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onMove)
    window.addEventListener('scroll', onMove, true)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onMove)
      window.removeEventListener('scroll', onMove, true)
    }
  }, [open])

  const run = (type) => {
    setOpen(false)
    onAction(type, resident)
  }

  const items = [
    { id: 'details', label: t('ops.viewDetails'), icon: Eye },
    { id: 'edit', label: t('ops.editResident'), icon: Pencil },
    { id: 'notice', label: t('ops.sendNotice'), icon: Megaphone },
    { id: 'complaints', label: t('ops.viewComplaints'), icon: FileText },
    { id: 'bills', label: t('ops.viewPayments'), icon: Receipt },
  ]

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={t('ops.manageResident', { name: resident.name })}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <MoreVertical size={16} aria-hidden />
      </button>
      {open && coords
        ? createPortal(
            <ul
              ref={menuRef}
              id={menuId}
              role="menu"
              style={{ position: 'fixed', left: coords.left, top: coords.top, bottom: coords.bottom, width: MENU_WIDTH }}
              className="z-50 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-[#10233a]"
            >
              {items.map((item) => (
                <li key={item.id} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-white/5"
                    onClick={() => run(item.id)}
                  >
                    <item.icon size={15} aria-hidden />
                    {item.label}
                  </button>
                </li>
              ))}
              <li role="separator" className="my-1 border-t border-slate-200 dark:border-white/10" />
              <li role="none">
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
                  onClick={() => run('delete')}
                >
                  <Trash2 size={15} aria-hidden />
                  {t('ops.deleteResident')}
                </button>
              </li>
            </ul>,
            document.body,
          )
        : null}
    </>
  )
}

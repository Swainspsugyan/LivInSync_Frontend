import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useI18n } from '../../lib/i18n.jsx'

export default function DashModal({ open, titleId, title, onClose, children, wide = false }) {
  const { t } = useI18n()
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/30 p-4 sm:items-center">
      <button type="button" className="absolute inset-0 cursor-default" aria-label={t('common.close')} onClick={onClose} />
      <div
        className={`dash-panel-card relative z-10 w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto p-4 sm:p-5`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="flex items-start justify-between gap-3">
          {title ? (
            <h3 id={titleId} className="pr-2 text-sm font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
          ) : (
            <span id={titleId} className="sr-only">
              {t('common.close')}
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="-mr-1 -mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={18} strokeWidth={2.25} aria-hidden />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

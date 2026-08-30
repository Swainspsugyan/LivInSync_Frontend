import { Plus, Star, X } from 'lucide-react'
import { flattenFavouriteTargets, useFavourites } from '../../lib/favourites.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashPanel from './DashPanel.jsx'

export default function FavouritesBar({ onNavigate, pickerOpen, onPickerOpen, onPickerClose }) {
  const { t } = useI18n()
  const { items, add, remove, has } = useFavourites()
  const options = flattenFavouriteTargets()

  return (
    <DashPanel icon={Star} title={t('home.favourites')}>
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <button
              type="button"
              onClick={() => onNavigate(item.id)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
            >
              <item.icon size={14} aria-hidden />
              {t(`nav.${item.id}`)}
            </button>
            <button
              type="button"
              className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-slate-700 text-white hover:bg-rose-600"
              aria-label={t('home.removeFavourite', { name: t(`nav.${item.id}`) })}
              onClick={() => remove(item.id)}
            >
              <X size={10} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onPickerOpen}
          className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500 hover:border-sky-400 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 dark:border-white/20 dark:text-slate-300"
        >
          <Plus size={14} aria-hidden />
          {t('home.addFavourite')}
        </button>
      </div>

      {pickerOpen ? (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/30 p-4 sm:items-center"
          role="presentation"
          onClick={onPickerClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="fav-picker-title"
            className="dash-panel-card w-full max-w-md p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 id="fav-picker-title" className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('home.chooseFavourite')}
              </h3>
              <button type="button" className="rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10" onClick={onPickerClose}>
                <X size={16} />
              </button>
            </div>
            <ul className="max-h-72 space-y-1 overflow-auto">
              {options.map((option) => {
                const added = has(option.id)
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      disabled={added}
                      onClick={() => {
                        add(option.id)
                        onPickerClose()
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100 dark:hover:bg-white/5"
                    >
                      <span className="inline-flex items-center gap-2">
                        <option.icon size={15} aria-hidden />
                        {t(`nav.${option.id}`)}
                      </span>
                      {added ? <span className="text-[11px] text-slate-400">{t('home.alreadyFavourite')}</span> : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </DashPanel>
  )
}

import { Megaphone, Pin } from 'lucide-react'
import { getResident, isRecentNotice, latestNotices, useCommunity } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashPanel from './DashPanel.jsx'

export default function NoticeBoardCard({ onSeeAll, limit = 4 }) {
  const { t, locale } = useI18n()
  const state = useCommunity()
  const notices = latestNotices(state, limit)

  return (
    <DashPanel icon={Pin} title={t('home.noticeBoard')} actionLabel={t('common.seeAll')} onAction={onSeeAll}>
      {notices.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">{t('home.noNotices')}</p>
      ) : (
        <ul className="space-y-3">
          {notices.map((notice) => (
            <li key={notice.id} className="flex gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                <Megaphone size={14} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-[13px] font-semibold text-slate-800 dark:text-white">{notice.title}</p>
                  {isRecentNotice(notice) ? (
                    <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                      {t('home.newBadge')}
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{notice.description}</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  {new Date(`${notice.createdAt}T00:00:00`).toLocaleDateString(locale, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {notice.residentId
                    ? ` · ${t('ops.noticeTo', { name: getResident(state, notice.residentId)?.name || t('ops.unknownResident') })}`
                    : ''}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashPanel>
  )
}

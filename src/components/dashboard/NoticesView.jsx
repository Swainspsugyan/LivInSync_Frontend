import { useState } from 'react'
import { getResident, isRecentNotice, useCommunity } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import AddNoticeModal from './AddNoticeModal.jsx'
import DashBtn from './DashBtn.jsx'

export default function NoticesView() {
  const { t, locale } = useI18n()
  const state = useCommunity()
  const [open, setOpen] = useState(false)
  const notices = [...(state.notices || [])].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{t('home.noticeBoard')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.noticeBoardHint')}</p>
        </div>
        <DashBtn onClick={() => setOpen(true)}>{t('home.addNotice')}</DashBtn>
      </div>
      <section className="dash-card overflow-hidden rounded-2xl">
        {notices.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500">{t('home.noNotices')}</p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-white/5">
            {notices.map((notice) => (
              <li key={notice.id} className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{notice.title}</p>
                  {isRecentNotice(notice) ? (
                    <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                      {t('home.newBadge')}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{notice.description}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(`${notice.createdAt}T00:00:00`).toLocaleDateString(locale, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {' · '}
                  {notice.residentId
                    ? t('ops.noticeTo', { name: getResident(state, notice.residentId)?.name || t('ops.unknownResident') })
                    : t('ops.noticeAll')}
                  {notice.priority === 'urgent' ? ` · ${t('ops.priority.urgent')}` : ''}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <AddNoticeModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

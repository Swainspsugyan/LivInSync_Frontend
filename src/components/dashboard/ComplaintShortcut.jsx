import { MessageSquarePlus } from 'lucide-react'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'

export default function ComplaintShortcut({ onRaise }) {
  const { t } = useI18n()
  return (
    <section className="dash-panel-card flex h-full flex-col justify-between p-4">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
          <MessageSquarePlus size={22} aria-hidden />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{t('home.complaintBox')}</h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{t('home.reportIssue')}</p>
        </div>
      </div>
      <DashBtn className="mt-4 w-full sm:w-auto" onClick={onRaise}>
        {t('home.raiseComplaint')}
      </DashBtn>
    </section>
  )
}

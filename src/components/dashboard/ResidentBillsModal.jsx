import { formatINR, useCommunity } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashModal from './DashModal.jsx'

export default function ResidentBillsModal({ resident, open, onClose }) {
  const { t } = useI18n()
  const state = useCommunity()
  if (!resident) return null

  const bills = (state.bills || []).filter((bill) => bill.residentId === resident.id)

  return (
    <DashModal open={open} titleId="resident-bills-title" title={t('ops.billsTitle')} onClose={onClose}>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{resident.name}</p>
      {bills.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{t('ops.noBills')}</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100 dark:divide-white/5">
          {bills.map((bill) => (
            <li key={bill.id} className="py-2.5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{formatINR(bill.amount)}</p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-600 dark:bg-white/10 dark:text-slate-300">
                  {bill.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {bill.notes || t('ops.monthlyRent')} · {t('ops.billDue')} {bill.dueDate}
              </p>
            </li>
          ))}
        </ul>
      )}
    </DashModal>
  )
}

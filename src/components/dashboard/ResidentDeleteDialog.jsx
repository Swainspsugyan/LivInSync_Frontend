import { useState } from 'react'
import { deleteResident } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import DashModal from './DashModal.jsx'
import StatusBanner from './StatusBanner.jsx'

export default function ResidentDeleteDialog({ resident, open, onClose, onDeleted }) {
  const { t } = useI18n()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (!resident) return null

  const confirm = () => {
    setBusy(true)
    setError('')
    try {
      deleteResident(resident.id)
      onDeleted(resident)
    } catch {
      setError(t('ops.deleteFailed'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <DashModal open={open} titleId="resident-delete-title" title={t('ops.deleteResidentTitle')} onClose={onClose}>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t('ops.deleteResidentCopy', { name: resident.name })}</p>
      {error ? <div className="mt-3"><StatusBanner tone="error">{error}</StatusBanner></div> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <DashBtn variant="danger" disabled={busy} onClick={confirm}>
          {busy ? t('ops.deleting') : t('ops.deleteResident')}
        </DashBtn>
        <DashBtn variant="outline" onClick={onClose}>
          {t('ops.cancel')}
        </DashBtn>
      </div>
    </DashModal>
  )
}

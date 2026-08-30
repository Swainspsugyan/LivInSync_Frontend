import { useEffect, useState } from 'react'
import { addNotice, todayISO } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import DashModal from './DashModal.jsx'
import StatusBanner from './StatusBanner.jsx'

const empty = () => ({
  title: '',
  description: '',
  priority: 'normal',
  sendNow: true,
  createdAt: todayISO(),
})

export default function ResidentNoticeModal({ resident, open, onClose, onSent }) {
  const { t } = useI18n()
  const [values, setValues] = useState(empty)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (open) {
      setValues(empty())
      setError('')
      setBusy(false)
    }
  }, [open, resident?.id])

  if (!resident) return null

  const setField = (key, value) => setValues((prev) => ({ ...prev, [key]: value }))

  const submit = (event) => {
    event.preventDefault()
    if (!values.title.trim() || !values.description.trim()) {
      setError(t('ops.fixForm'))
      return
    }
    if (!values.sendNow && !values.createdAt) {
      setError(t('ops.fixForm'))
      return
    }
    setBusy(true)
    setError('')
    try {
      const created = addNotice({
        title: values.title,
        description: values.description,
        priority: values.priority,
        createdAt: values.sendNow ? todayISO() : values.createdAt,
        residentId: resident.id,
      })
      onSent(created)
    } catch {
      setError(t('ops.noticeFailed'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <DashModal open={open} titleId="resident-notice-title" title={t('ops.sendNoticeTitle')} onClose={onClose}>
      <form onSubmit={submit} className="mt-4 space-y-3">
        {error ? <StatusBanner tone="error">{error}</StatusBanner> : null}
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-800 dark:text-white">{t('ops.noticeResident')}: </span>
          {resident.name}
        </p>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          {t('home.noticeTitle')}
          <input className="field" value={values.title} onChange={(event) => setField('title', event.target.value)} />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          {t('ops.description')}
          <textarea className="field" rows={4} value={values.description} onChange={(event) => setField('description', event.target.value)} />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          {t('ops.noticePriority')}
          <select className="field" value={values.priority} onChange={(event) => setField('priority', event.target.value)}>
            <option value="normal">{t('ops.priority.normal')}</option>
            <option value="urgent">{t('ops.priority.urgent')}</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={values.sendNow}
            onChange={(event) => setField('sendNow', event.target.checked)}
            className="size-4 rounded border-slate-300 text-emerald-600"
          />
          {t('ops.sendNow')}
        </label>
        {!values.sendNow ? (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.noticeDate')}
            <input className="field" type="date" value={values.createdAt} onChange={(event) => setField('createdAt', event.target.value)} />
          </label>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <DashBtn type="submit" disabled={busy}>
            {busy ? t('ops.sending') : t('ops.sendNotice')}
          </DashBtn>
        </div>
      </form>
    </DashModal>
  )
}

import { useState } from 'react'
import { addComplaint, COMPLAINT_CATEGORIES, holdsRoom, useCommunity } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import StatusBanner from './StatusBanner.jsx'

export default function RaiseComplaintModal({ open, onClose, onCreated }) {
  const { t } = useI18n()
  const state = useCommunity()
  const residents = state.residents.filter((resident) => holdsRoom(resident))
  const [values, setValues] = useState({ title: '', category: 'Electricity', description: '', residentId: residents[0]?.id || '' })
  const [error, setError] = useState('')

  if (!open) return null

  const submit = (event) => {
    event.preventDefault()
    if (!values.title.trim() || !values.description.trim()) {
      setError(t('ops.fixForm'))
      return
    }
    const created = addComplaint(values)
    setValues({ title: '', category: 'Electricity', description: '', residentId: residents[0]?.id || '' })
    setError('')
    onCreated?.(created)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/30 p-4 sm:items-center">
      <form onSubmit={submit} className="dash-panel-card w-full max-w-lg p-4 sm:p-5" role="dialog" aria-modal="true" aria-labelledby="raise-title">
        <h3 id="raise-title" className="text-sm font-semibold text-slate-900 dark:text-white">
          {t('home.raiseComplaint')}
        </h3>
        {error ? <div className="mt-3"><StatusBanner tone="error">{error}</StatusBanner></div> : null}
        <div className="mt-4 grid gap-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.complaintTitle')}
            <input className="field" value={values.title} onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))} />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.category')}
            <select className="field" value={values.category} onChange={(event) => setValues((prev) => ({ ...prev, category: event.target.value }))}>
              {COMPLAINT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.resident')}
            <select className="field" value={values.residentId} onChange={(event) => setValues((prev) => ({ ...prev, residentId: event.target.value }))}>
              <option value="">{t('ops.unknownResident')}</option>
              {residents.map((resident) => (
                <option key={resident.id} value={resident.id}>
                  {resident.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.description')}
            <textarea className="field" rows={3} value={values.description} onChange={(event) => setValues((prev) => ({ ...prev, description: event.target.value }))} />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <DashBtn type="submit">{t('home.submitComplaint')}</DashBtn>
          <DashBtn variant="outline" onClick={onClose}>
            {t('common.close')}
          </DashBtn>
        </div>
      </form>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import {
  BLOCK_SPECS,
  formatINR,
  getAvailableRooms,
  getFloors,
  getRoom,
  placementOf,
  updateResident,
  useCommunity,
  validateResidentForm,
} from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import DashModal from './DashModal.jsx'
import StatusBanner from './StatusBanner.jsx'

function FieldError({ message, t }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">{t(message)}</p>
}

function valuesFromResident(resident) {
  const room = getRoom(resident.roomId)
  return {
    id: resident.id,
    name: resident.name,
    phone: resident.phone,
    email: resident.email,
    startDate: resident.startDate,
    endDate: resident.endDate || '',
    endUndecided: Boolean(resident.endUndecided),
    blockId: room?.blockId || '',
    floor: room?.floor || '',
    roomId: resident.roomId || '',
  }
}

export default function ResidentEditModal({ resident, open, onClose, onSaved }) {
  const { t } = useI18n()
  const state = useCommunity()
  const [values, setValues] = useState(() => (resident ? valuesFromResident(resident) : null))
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (open && resident) {
      setValues(valuesFromResident(resident))
      setErrors({})
      setFormError('')
      setBusy(false)
    }
  }, [open, resident])

  const floors = values?.blockId ? getFloors(values.blockId) : []
  const rooms =
    values?.blockId && values.floor ? getAvailableRooms(state, values.blockId, values.floor, resident?.id) : []
  const selectedRoom = values?.roomId ? getRoom(values.roomId) : null
  const preview = placementOf({
    startDate: values?.startDate,
    endDate: values?.endUndecided ? '' : values?.endDate,
    endUndecided: values?.endUndecided,
  })

  const setField = (key, value) => {
    setValues((prev) => {
      if (!prev) return prev
      const next = { ...prev, [key]: value }
      if (key === 'blockId') {
        next.floor = ''
        next.roomId = ''
      }
      if (key === 'floor') next.roomId = ''
      if (key === 'endUndecided' && value) next.endDate = ''
      return next
    })
    setErrors((prev) => ({ ...prev, [key]: undefined, roomNo: key === 'roomId' ? undefined : prev.roomNo }))
  }

  const placementHint = useMemo(() => {
    if (preview === 'past') return t('ops.willBePast')
    if (preview === 'upcoming') return t('ops.willBeUpcoming')
    return t('ops.willBeActive')
  }, [preview, t])

  const onSubmit = (event) => {
    event.preventDefault()
    if (!values || !resident) return
    const nextErrors = validateResidentForm(values, state, { ignoreResidentId: resident.id })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setFormError(t('ops.fixForm'))
      return
    }
    setBusy(true)
    setFormError('')
    try {
      const saved = updateResident(resident.id, values)
      onSaved(saved)
    } catch {
      setFormError(t('ops.updateFailed'))
    } finally {
      setBusy(false)
    }
  }

  if (!resident || !values) return null

  return (
    <DashModal open={open} titleId="resident-edit-title" title={t('ops.editResident')} onClose={onClose} wide>
      <form onSubmit={onSubmit} className="mt-4 space-y-4" noValidate>
        {formError ? <StatusBanner tone="error">{formError}</StatusBanner> : null}
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
            {t('ops.fullName')} *
            <input className="field" value={values.name} onChange={(event) => setField('name', event.target.value)} />
            <FieldError message={errors.name} t={t} />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.phone')} *
            <input className="field" value={values.phone} onChange={(event) => setField('phone', event.target.value)} />
            <FieldError message={errors.phone} t={t} />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.email')} *
            <input className="field" value={values.email} onChange={(event) => setField('email', event.target.value)} />
            <FieldError message={errors.email} t={t} />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.startDate')} *
            <input className="field" type="date" value={values.startDate} onChange={(event) => setField('startDate', event.target.value)} />
            <FieldError message={errors.startDate} t={t} />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.endDate')}
            <input
              className="field disabled:opacity-50"
              type="date"
              value={values.endDate}
              disabled={values.endUndecided}
              onChange={(event) => setField('endDate', event.target.value)}
            />
            <FieldError message={errors.endDate} t={t} />
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
            <input
              type="checkbox"
              checked={values.endUndecided}
              onChange={(event) => setField('endUndecided', event.target.checked)}
              className="size-4 rounded border-slate-300 text-emerald-600"
            />
            {t('ops.endUndecided')}
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.selectBlock')}
            <select className="field" value={values.blockId} onChange={(event) => setField('blockId', event.target.value)}>
              <option value="">{t('ops.choose')}</option>
              {BLOCK_SPECS.map((block) => (
                <option key={block.id} value={block.id}>
                  {block.name}
                </option>
              ))}
            </select>
            <FieldError message={errors.blockId} t={t} />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.selectFloor')}
            <select className="field" value={values.floor} disabled={!values.blockId} onChange={(event) => setField('floor', event.target.value)}>
              <option value="">{t('ops.choose')}</option>
              {floors.map((floor) => (
                <option key={floor} value={floor}>
                  {t('ops.floorN', { n: floor })}
                </option>
              ))}
            </select>
            <FieldError message={errors.floor} t={t} />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.selectRoom')}
            <select className="field" value={values.roomId} disabled={!values.floor} onChange={(event) => setField('roomId', event.target.value)}>
              <option value="">{rooms.length ? t('ops.choose') : t('ops.noVacantRooms')}</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.number} · {t(room.typeKey)} · {formatINR(room.rent)}
                </option>
              ))}
            </select>
            <FieldError message={errors.roomNo} t={t} />
          </label>
        </div>
        {selectedRoom ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('ops.selectedRoom', {
              room: selectedRoom.number,
              type: t(selectedRoom.typeKey),
              rent: formatINR(selectedRoom.rent),
            })}
          </p>
        ) : null}
        <StatusBanner tone="info">{placementHint}</StatusBanner>
        <div className="flex flex-wrap gap-2">
          <DashBtn type="submit" disabled={busy}>
            {busy ? t('ops.saving') : t('ops.saveResident')}
          </DashBtn>
        </div>
      </form>
    </DashModal>
  )
}

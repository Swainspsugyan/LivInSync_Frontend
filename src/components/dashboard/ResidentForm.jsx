import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  BLOCK_SPECS,
  addResident,
  createBill,
  formatINR,
  getAvailableRooms,
  getFloors,
  getRoom,
  placementOf,
  todayISO,
  useCommunity,
  validateResidentForm,
} from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import StatusBanner from './StatusBanner.jsx'

function FieldError({ message, t }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">{t(message)}</p>
}

export default function ResidentForm() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const state = useCommunity()
  const presetRoom = getRoom(location.state?.roomId)

  const [values, setValues] = useState(() => ({
    name: '',
    phone: '',
    email: '',
    startDate: todayISO(),
    endDate: '',
    endUndecided: true,
    blockId: presetRoom?.blockId || '',
    floor: presetRoom?.floor || '',
    roomId: presetRoom?.id || '',
    createBill: false,
    billAmount: presetRoom ? String(presetRoom.rent) : '',
    billDueDate: '',
    billNotes: t('ops.monthlyRent'),
  }))
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState('')

  const floors = values.blockId ? getFloors(values.blockId) : []
  const rooms = values.blockId && values.floor ? getAvailableRooms(state, values.blockId, values.floor) : []
  const selectedRoom = getRoom(values.roomId)
  const preview = placementOf({
    startDate: values.startDate,
    endDate: values.endUndecided ? '' : values.endDate,
    endUndecided: values.endUndecided,
  })

  const setField = (key, value) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'blockId') {
        next.floor = ''
        next.roomId = ''
        next.billAmount = ''
      }
      if (key === 'floor') {
        next.roomId = ''
        next.billAmount = ''
      }
      if (key === 'roomId') {
        const room = getRoom(value)
        if (room && !prev.billAmount) next.billAmount = String(room.rent)
        if (room) next.billAmount = prev.billAmount || String(room.rent)
      }
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
    const nextErrors = validateResidentForm(values, state)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setFormError(t('ops.fixForm'))
      return
    }
    setBusy(true)
    setFormError('')
    try {
      const resident = addResident(values)
      if (values.createBill) {
        createBill({
          residentId: resident.id,
          amount: values.billAmount,
          dueDate: values.billDueDate,
          notes: values.billNotes,
        })
      }
      const place = placementOf(resident)
      const flash =
        place === 'upcoming' ? t('ops.createdUpcoming', { name: resident.name }) : place === 'past' ? t('ops.createdPast', { name: resident.name }) : t('ops.createdActive', { name: resident.name })
      navigate(place === 'past' ? '/dashboard/directory/past' : '/dashboard/directory', { state: { flash } })
    } catch {
      setFormError(t('ops.saveFailed'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{t('ops.addResident')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('ops.addResidentHint')}</p>
        </div>
        <DashBtn variant="outline" onClick={() => navigate('/dashboard/directory')}>
          {t('common.back')}
        </DashBtn>
      </div>

      {formError ? <StatusBanner tone="error">{formError}</StatusBanner> : null}

      <section className="dash-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t('ops.basicDetails')}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
            {t('ops.fullName')} *
            <input className="field" value={values.name} onChange={(event) => setField('name', event.target.value)} autoComplete="name" />
            <FieldError message={errors.name} t={t} />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.phone')} *
            <input className="field" value={values.phone} onChange={(event) => setField('phone', event.target.value)} inputMode="tel" autoComplete="tel" />
            <FieldError message={errors.phone} t={t} />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('ops.email')} *
            <input className="field" value={values.email} onChange={(event) => setField('email', event.target.value)} type="email" autoComplete="email" />
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
      </section>

      <section className="dash-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t('ops.roomAssignment')}</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('ops.roomAssignmentHint')}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
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
            <select
              className="field"
              value={values.floor}
              disabled={!values.blockId}
              onChange={(event) => setField('floor', event.target.value)}
            >
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
            <select
              className="field"
              value={values.roomId}
              disabled={!values.floor}
              onChange={(event) => setField('roomId', event.target.value)}
            >
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
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            {t('ops.selectedRoom', {
              room: selectedRoom.number,
              type: t(selectedRoom.typeKey),
              rent: formatINR(selectedRoom.rent),
            })}
          </p>
        ) : null}
      </section>

      <section className="dash-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t('ops.afterSubmit')}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('ops.placementIntro')}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 p-3 dark:border-white/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">{t('ops.placement.active')}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('ops.activeRule')}</p>
          </article>
          <article className="rounded-xl border border-slate-200 p-3 dark:border-white/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">{t('ops.placement.upcoming')}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('ops.upcomingRule')}</p>
          </article>
        </div>
        <StatusBanner tone="info">{placementHint}</StatusBanner>
      </section>

      <section className="dash-card rounded-2xl p-4 sm:p-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <input
            type="checkbox"
            checked={values.createBill}
            onChange={(event) => setField('createBill', event.target.checked)}
            className="size-4 rounded border-slate-300 text-emerald-600"
          />
          {t('ops.createBill')}
        </label>
        {values.createBill ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {t('ops.billAmount')}
              <input className="field" type="number" min="1" value={values.billAmount} onChange={(event) => setField('billAmount', event.target.value)} />
              <FieldError message={errors.billAmount} t={t} />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {t('ops.billDue')}
              <input className="field" type="date" value={values.billDueDate} onChange={(event) => setField('billDueDate', event.target.value)} />
              <FieldError message={errors.billDueDate} t={t} />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-3">
              {t('ops.billNotes')}
              <input className="field" value={values.billNotes} onChange={(event) => setField('billNotes', event.target.value)} />
            </label>
          </div>
        ) : null}
      </section>

      <div className="flex flex-wrap gap-2">
        <DashBtn type="submit" disabled={busy}>
          {busy ? t('ops.saving') : t('ops.submitResident')}
        </DashBtn>
        <DashBtn variant="outline" onClick={() => navigate('/dashboard/directory')}>
          {t('common.close')}
        </DashBtn>
      </div>
    </form>
  )
}

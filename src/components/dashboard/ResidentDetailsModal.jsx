import { getBlock, getRoom, placementOf, roomLabel } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import DashModal from './DashModal.jsx'

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-100">{value || '—'}</dd>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 p-3 dark:border-white/10">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</h4>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">{children}</dl>
    </section>
  )
}

export default function ResidentDetailsModal({ resident, open, onClose, onEdit }) {
  const { t } = useI18n()
  if (!resident) return null

  const room = getRoom(resident.roomId)
  const block = room ? getBlock(room.blockId) : null
  const place = placementOf(resident)

  return (
    <DashModal open={open} titleId="resident-details-title" title={t('ops.viewDetails')} onClose={onClose} wide>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{resident.name}</p>
      <div className="mt-4 space-y-3">
        <Section title={t('ops.residentInfo')}>
          <Field label={t('ops.fullName')} value={resident.name} />
          <Field label={t('ops.residentId')} value={resident.id} />
          <Field label={t('ops.joiningDate')} value={resident.startDate} />
          <Field label={t('ops.currentStatus')} value={t(`ops.placement.${place}`)} />
        </Section>
        <Section title={t('ops.contactInfo')}>
          <Field label={t('ops.phone')} value={resident.phone} />
          <Field label={t('ops.email')} value={resident.email} />
        </Section>
        <Section title={t('ops.propertyInfo')}>
          <Field label={t('ops.building')} value={block?.name} />
          <Field label={t('ops.unit')} value={room?.number} />
          <Field label={t('ops.roomType')} value={room ? t(room.typeKey) : ''} />
          <Field label={t('ops.room')} value={roomLabel(resident.roomId)} />
          <Field
            label={t('ops.endDate')}
            value={resident.endUndecided ? t('ops.openEnded') : resident.endDate}
          />
        </Section>
      </div>
      <div className="mt-4">
        <DashBtn onClick={() => onEdit(resident)}>{t('ops.editResident')}</DashBtn>
      </div>
    </DashModal>
  )
}

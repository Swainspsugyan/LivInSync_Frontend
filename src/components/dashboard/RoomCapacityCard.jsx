import { useI18n } from '../../lib/i18n.jsx'

export default function RoomCapacityCard({ room }) {
  const { t } = useI18n()
  const remaining = Math.max(0, room.capacity - room.occupied)
  const label = t('rooms.label', { id: room.id })
  const summary = `${label}. ${t('rooms.total', { n: room.capacity })}. ${t('rooms.occupied', { n: room.occupied })}. ${t('rooms.remaining', { n: remaining })}.`

  return (
    <article className="card" tabIndex={0} aria-label={summary}>
      <div className="face face1">
        <div className="content">
          <p className="room-card-title">{label}</p>
          <dl>
            <div>
              <dt className="sr-only">{t('rooms.totalLabel')}</dt>
              <dd>{t('rooms.total', { n: room.capacity })}</dd>
            </div>
            <div>
              <dt className="sr-only">{t('rooms.occupiedLabel')}</dt>
              <dd>{t('rooms.occupied', { n: room.occupied })}</dd>
            </div>
            <div>
              <dt className="sr-only">{t('rooms.remainingLabel')}</dt>
              <dd>{t('rooms.remaining', { n: remaining })}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="face face2" style={{ background: room.color }}>
        <h2>{room.shortId}</h2>
      </div>
    </article>
  )
}

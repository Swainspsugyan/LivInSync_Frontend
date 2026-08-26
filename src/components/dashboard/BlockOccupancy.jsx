import { formatINR, getBlockStats } from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'

export default function BlockOccupancy({ state }) {
  const { t } = useI18n()
  const blocks = getBlockStats(state)

  return (
    <section aria-labelledby="block-occupancy-heading">
      <div className="mb-3">
        <h2 id="block-occupancy-heading" className="text-sm font-semibold text-slate-900 dark:text-white">
          {t('ops.blockOccupancy')}
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('ops.blockOccupancyHint')}</p>
      </div>
      <div className="room-capacity-grid block-occupancy-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {blocks.map((block) => {
          const summary = `${block.name}. ${t('ops.totalRooms')}: ${block.totalRooms}. ${t('ops.occupiedRooms')}: ${block.occupied}. ${t('ops.vacantRooms')}: ${block.vacant}. ${t('ops.occupancyPct')}: ${block.occupancy}%.`

          return (
            <article key={block.id} className="card" tabIndex={0} aria-label={summary}>
              <div className="face face1">
                <div className="content">
                  <p className="room-card-title">{block.name}</p>
                  <dl>
                    <div>
                      <dt className="sr-only">{t('ops.totalRooms')}</dt>
                      <dd>
                        {t('ops.totalRooms')}: {block.totalRooms}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">{t('ops.occupiedRooms')}</dt>
                      <dd>
                        {t('ops.occupiedRooms')}: {block.occupied}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">{t('ops.vacantRooms')}</dt>
                      <dd>
                        {t('ops.vacantRooms')}: {block.vacant}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">{t('ops.occupancyPct')}</dt>
                      <dd>
                        {t('ops.occupancyPct')}: {block.occupancy}%
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">{t('ops.occupiedBeds')}</dt>
                      <dd>
                        {t('ops.occupiedBeds')}: {block.occupiedBeds}/{block.beds}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">{t('ops.estRent')}</dt>
                      <dd>
                        {t('ops.estRent')}: {formatINR(block.monthlyRent)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="face face2" style={{ background: block.color }}>
                <h2>{block.name}</h2>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

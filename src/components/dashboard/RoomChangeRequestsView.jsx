import { useState } from 'react'
import {
  BLOCK_SPECS,
  decideRoomChange,
  getAvailableRooms,
  getFloors,
  getResident,
  roomLabel,
  useCommunity,
} from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import StatusBanner from './StatusBanner.jsx'

export default function RoomChangeRequestsView({ onBack }) {
  const { t } = useI18n()
  const state = useCommunity()
  const [flash, setFlash] = useState('')
  const [error, setError] = useState('')
  const [drafts, setDrafts] = useState({})

  const setDraft = (id, patch) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  const approve = (item) => {
    const draft = drafts[item.id] || {}
    const roomId = draft.roomId || item.toRoomId
    if (!roomId) {
      setError(t('ops.pickTargetRoom'))
      return
    }
    if (state.residents.some((resident) => resident.roomId === roomId && resident.id !== item.residentId)) {
      /* occupancy also includes seed; decideRoomChange checks via claim */
    }
    const result = decideRoomChange(item.id, 'approved', roomId)
    if (!result.ok) {
      setFlash('')
      setError(result.error === 'occupied' ? t('ops.roomOccupied') : t('ops.pickTargetRoom'))
      return
    }
    setError('')
    setFlash(t('ops.requestApproved'))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{t('ops.roomChangeRequests')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('ops.requestsHint')}</p>
        </div>
        <DashBtn variant="outline" onClick={onBack}>
          {t('common.back')}
        </DashBtn>
      </div>
      {flash ? <StatusBanner tone="success">{flash}</StatusBanner> : null}
      {error ? <StatusBanner tone="error">{error}</StatusBanner> : null}

      <section className="dash-card overflow-hidden rounded-2xl">
        {state.roomChanges.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">{t('ops.noRequests')}</p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-white/5">
            {state.roomChanges.map((item) => {
              const resident = getResident(state, item.residentId)
              const draft = drafts[item.id] || { blockId: item.toBlockId || '', floor: item.toFloor || '', roomId: item.toRoomId || '' }
              const rooms = draft.blockId && draft.floor ? getAvailableRooms(state, draft.blockId, draft.floor, item.residentId) : []
              return (
                <li key={item.id} className="space-y-3 px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{resident?.name || t('ops.unknownResident')}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t('ops.fromRoom')}: {roomLabel(item.fromRoomId)} · {item.requestedAt}
                      </p>
                      {item.reason ? <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.reason}</p> : null}
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-white/10 dark:text-slate-300">
                      {t(`ops.requestStatus.${item.status}`)}
                    </span>
                  </div>
                  {item.status === 'pending' ? (
                    <div className="grid gap-3 sm:grid-cols-3">
                      <select
                        className="field"
                        value={draft.blockId}
                        onChange={(event) => setDraft(item.id, { blockId: event.target.value, floor: '', roomId: '' })}
                      >
                        <option value="">{t('ops.selectBlock')}</option>
                        {BLOCK_SPECS.map((block) => (
                          <option key={block.id} value={block.id}>
                            {block.name}
                          </option>
                        ))}
                      </select>
                      <select
                        className="field"
                        value={draft.floor}
                        disabled={!draft.blockId}
                        onChange={(event) => setDraft(item.id, { floor: event.target.value, roomId: '' })}
                      >
                        <option value="">{t('ops.selectFloor')}</option>
                        {getFloors(draft.blockId).map((floor) => (
                          <option key={floor} value={floor}>
                            {t('ops.floorN', { n: floor })}
                          </option>
                        ))}
                      </select>
                      <select
                        className="field"
                        value={draft.roomId}
                        disabled={!draft.floor}
                        onChange={(event) => setDraft(item.id, { roomId: event.target.value })}
                      >
                        <option value="">{t('ops.selectRoom')}</option>
                        {rooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.number}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-wrap gap-2 sm:col-span-3">
                        <DashBtn onClick={() => approve(item)}>{t('ops.approve')}</DashBtn>
                        <DashBtn
                          variant="danger"
                          onClick={() => {
                            decideRoomChange(item.id, 'rejected')
                            setFlash(t('ops.requestRejected'))
                          }}
                        >
                          {t('ops.reject')}
                        </DashBtn>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">{item.toRoomId ? roomLabel(item.toRoomId) : '—'}</p>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}

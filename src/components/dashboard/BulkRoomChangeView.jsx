import { useMemo, useState } from 'react'
import {
  BLOCK_SPECS,
  bulkChangeRooms,
  getAvailableRooms,
  getFloors,
  holdsRoom,
  placementOf,
  roomLabel,
  useCommunity,
} from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import StatusBanner from './StatusBanner.jsx'

export default function BulkRoomChangeView({ onBack }) {
  const { t } = useI18n()
  const state = useCommunity()
  const [selected, setSelected] = useState([])
  const [blockId, setBlockId] = useState('')
  const [floor, setFloor] = useState('')
  const [roomId, setRoomId] = useState('')
  const [flash, setFlash] = useState('')
  const [error, setError] = useState('')

  const current = useMemo(
    () => state.residents.filter((resident) => holdsRoom(resident)),
    [state.residents],
  )
  const rooms = blockId && floor ? getAvailableRooms(state, blockId, floor) : []

  const toggle = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const submit = () => {
    if (selected.length !== 1) {
      setError(t('ops.bulkChangeOne'))
      return
    }
    if (!roomId) {
      setError(t('ops.selectRoom'))
      return
    }
    const result = bulkChangeRooms([{ residentId: selected[0], roomId }])
    if (result.errors.length) {
      setError(result.errors[0].message)
      setFlash('')
      return
    }
    setError('')
    setFlash(t('ops.bulkChangeDone'))
    setSelected([])
    setRoomId('')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{t('ops.bulkRoomChange')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('ops.bulkChangeHint')}</p>
        </div>
        <DashBtn variant="outline" onClick={onBack}>
          {t('common.back')}
        </DashBtn>
      </div>
      {flash ? <StatusBanner tone="success">{flash}</StatusBanner> : null}
      {error ? <StatusBanner tone="error">{error}</StatusBanner> : null}

      <section className="dash-card overflow-hidden rounded-2xl">
        <div className="max-h-[360px] overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500 dark:bg-[#10233a]">
              <tr>
                <th className="px-4 py-2 font-semibold">{t('ops.select')}</th>
                <th className="px-4 py-2 font-semibold">{t('ops.resident')}</th>
                <th className="px-4 py-2 font-semibold">{t('ops.room')}</th>
                <th className="px-4 py-2 font-semibold">{t('ops.statusLabel')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {current.map((resident) => (
                <tr key={resident.id}>
                  <td className="px-4 py-2">
                    <input type="checkbox" checked={selected.includes(resident.id)} onChange={() => toggle(resident.id)} />
                  </td>
                  <td className="px-4 py-2 font-medium text-slate-900 dark:text-white">{resident.name}</td>
                  <td className="px-4 py-2 text-slate-600 dark:text-slate-300">{roomLabel(resident.roomId)}</td>
                  <td className="px-4 py-2 text-xs uppercase text-slate-500">{placementOf(resident)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dash-card rounded-2xl p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <select
            className="field"
            value={blockId}
            onChange={(event) => {
              setBlockId(event.target.value)
              setFloor('')
              setRoomId('')
            }}
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
            value={floor}
            disabled={!blockId}
            onChange={(event) => {
              setFloor(event.target.value)
              setRoomId('')
            }}
          >
            <option value="">{t('ops.selectFloor')}</option>
            {getFloors(blockId).map((item) => (
              <option key={item} value={item}>
                {t('ops.floorN', { n: item })}
              </option>
            ))}
          </select>
          <select className="field" value={roomId} disabled={!floor} onChange={(event) => setRoomId(event.target.value)}>
            <option value="">{t('ops.selectRoom')}</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.number}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <DashBtn onClick={submit}>{t('ops.applyRoomChange')}</DashBtn>
        </div>
      </section>
    </div>
  )
}

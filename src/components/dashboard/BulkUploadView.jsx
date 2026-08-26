import { useState } from 'react'
import {
  BLOCK_SPECS,
  blockIdFromName,
  findRoomByParts,
  importResidents,
} from '../../lib/communityStore.js'
import { useI18n } from '../../lib/i18n.jsx'
import DashBtn from './DashBtn.jsx'
import StatusBanner from './StatusBanner.jsx'

function parseCsv(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  if (!lines.length) return []
  const headers = lines[0].split(',').map((item) => item.trim().toLowerCase())
  return lines.slice(1).map((line) => {
    const cols = line.split(',').map((item) => item.trim())
    const row = {}
    headers.forEach((header, index) => {
      row[header] = cols[index] || ''
    })
    return row
  })
}

export default function BulkUploadView({ onBack }) {
  const { t } = useI18n()
  const [busy, setBusy] = useState(false)
  const [flash, setFlash] = useState('')
  const [error, setError] = useState('')

  const onFile = async (file) => {
    if (!file) return
    setBusy(true)
    setError('')
    setFlash('')
    try {
      const text = await file.text()
      const rows = parseCsv(text)
      if (!rows.length) {
        setError(t('ops.csvEmpty'))
        return
      }
      const mapped = rows.map((row) => {
        const blockId = blockIdFromName(row.block || row.blockid)
        const floor = row.floor
        const number = row.room || row.roomno || row.roomnumber
        const room = findRoomByParts(blockId, floor, number)
        return {
          name: row.name || row.fullname,
          phone: row.phone || row.mobile,
          email: row.email,
          startDate: row.startdate || row.start,
          endDate: row.enddate || row.end,
          endUndecided: String(row.endundecided || '').toLowerCase() === 'true' || !(row.enddate || row.end),
          roomId: room?.id || '',
        }
      })
      const result = importResidents(mapped)
      if (result.created.length) {
        setFlash(t('ops.csvImported', { count: result.created.length, errors: result.errors.length }))
      }
      if (result.errors.length && !result.created.length) {
        setError(t('ops.csvFailed', { count: result.errors.length }))
      } else if (result.errors.length) {
        setError(t('ops.csvPartial', { count: result.errors.length }))
      }
    } catch {
      setError(t('ops.csvReadError'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{t('ops.bulkUpload')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('ops.bulkUploadHint')}</p>
        </div>
        <DashBtn variant="outline" onClick={onBack}>
          {t('common.back')}
        </DashBtn>
      </div>
      {flash ? <StatusBanner tone="success">{flash}</StatusBanner> : null}
      {error ? <StatusBanner tone="error">{error}</StatusBanner> : null}

      <section className="dash-card rounded-2xl p-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          {t('ops.csvFile')}
          <input
            type="file"
            accept=".csv,text/csv"
            disabled={busy}
            className="field"
            onChange={(event) => onFile(event.target.files?.[0])}
          />
        </label>
        {busy ? <p className="mt-3 text-sm text-slate-500">{t('ops.saving')}</p> : null}
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{t('ops.csvFormat')}</p>
        <p className="mt-2 text-xs text-slate-400">
          {BLOCK_SPECS.map((block) => block.name).join(', ')}
        </p>
      </section>
    </div>
  )
}

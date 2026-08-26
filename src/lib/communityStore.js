import { useEffect, useState } from 'react'

export const STORAGE_KEY = 'resiq-community-v1'
export const STORE_VERSION = 2
export const TARGET_OCCUPIED = 375

export const BLOCK_SPECS = [
  { id: 'block-1', name: 'Block 1', floors: 10, roomsPerFloor: 10, color: '#0d8376' },
  { id: 'block-2', name: 'Block 2', floors: 10, roomsPerFloor: 10, color: '#0b666a' },
  { id: 'block-3', name: 'Block 3', floors: 10, roomsPerFloor: 10, color: '#aa4b6b' },
  { id: 'block-4', name: 'Block 4', floors: 10, roomsPerFloor: 10, color: '#6b6b83' },
  { id: 'block-5', name: 'Block 5', floors: 10, roomsPerFloor: 10, color: '#3b8d99' },
]

export const ROOM_TYPES = [
  { type: 'Studio', typeKey: 'dash.typeStudio', rent: 8500, beds: 2 },
  { type: '1 BHK', typeKey: 'dash.type1bhk', rent: 11500, beds: 2 },
  { type: '2 BHK', typeKey: 'dash.type2bhk', rent: 15800, beds: 4 },
  { type: '3 BHK', typeKey: 'dash.type3bhk', rent: 22000, beds: 6 },
]

export const COMPLAINT_CATEGORIES = ['Plumbing', 'Electrical', 'Housekeeping', 'Security', 'Noise', 'Other']
export const COMPLAINT_TEAMS = ['Maintenance', 'Housekeeping', 'Security', 'Admin']

const listeners = new Set()

function hashId(value) {
  let hash = 2166136261
  const text = String(value)
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function todayISO() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export function addDays(iso, days) {
  const date = new Date(`${iso}T00:00:00`)
  date.setDate(date.getDate() + days)
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function formatINR(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`
}

export function buildInventory() {
  const rooms = []
  for (const block of BLOCK_SPECS) {
    for (let floor = 1; floor <= block.floors; floor += 1) {
      for (let slot = 1; slot <= block.roomsPerFloor; slot += 1) {
        const number = `${floor}${String(slot).padStart(2, '0')}`
        const kind = ROOM_TYPES[(slot - 1) % ROOM_TYPES.length]
        rooms.push({
          id: `${block.id}-f${floor}-r${number}`,
          blockId: block.id,
          floor,
          number,
          type: kind.type,
          typeKey: kind.typeKey,
          rent: kind.rent,
          beds: kind.beds,
        })
      }
    }
  }
  return rooms
}

export const ALL_ROOMS = buildInventory()

export function getBlock(blockId) {
  return BLOCK_SPECS.find((block) => block.id === blockId) || null
}

export function getRoom(roomId) {
  return ALL_ROOMS.find((room) => room.id === roomId) || null
}

export function placementOf(resident, today = todayISO()) {
  if (!resident) return 'active'
  if (!resident.endUndecided && resident.endDate && resident.endDate < today) return 'past'
  if (resident.startDate && resident.startDate > today) return 'upcoming'
  return 'active'
}

export function holdsRoom(resident, today = todayISO()) {
  const place = placementOf(resident, today)
  return place === 'active' || place === 'upcoming'
}

function roomsHeldBy(residents, today = todayISO()) {
  const held = new Set()
  for (const resident of residents) {
    if (resident.roomId && holdsRoom(resident, today)) held.add(resident.roomId)
  }
  return held
}

export function isRoomOccupied(state, roomId, ignoreResidentId) {
  if (!roomId || !state) return false
  const holder = occupantOf(state, roomId)
  if (holder) return holder.id !== ignoreResidentId
  return (state.seedOccupied || []).includes(roomId)
}

export function occupantOf(state, roomId) {
  return state.residents.find((resident) => resident.roomId === roomId && holdsRoom(resident)) || null
}

export function getFloors(blockId) {
  const block = getBlock(blockId)
  if (!block) return []
  return Array.from({ length: block.floors }, (_, index) => index + 1)
}

export function roomsOnFloor(blockId, floor) {
  return ALL_ROOMS.filter((room) => room.blockId === blockId && room.floor === Number(floor))
}

export function getAvailableRooms(state, blockId, floor, ignoreResidentId) {
  return roomsOnFloor(blockId, floor).filter((room) => !isRoomOccupied(state, room.id, ignoreResidentId))
}

function pickSeedOccupied(reservedIds) {
  const reserved = new Set(reservedIds)
  const available = ALL_ROOMS.filter((room) => !reserved.has(room.id))
  const occupied = []
  const target = Math.max(0, TARGET_OCCUPIED - reserved.size)
  for (const room of available) {
    if (occupied.length >= target) break
    if (hashId(room.id) % 4 !== 0) occupied.push(room.id)
  }
  for (const room of available) {
    if (occupied.length >= target) break
    if (!occupied.includes(room.id)) occupied.push(room.id)
  }
  return occupied
}

function seedState() {
  const today = todayISO()
  const namedRooms = [
    ALL_ROOMS[12],
    ALL_ROOMS[40],
    ALL_ROOMS[88],
    ALL_ROOMS[120],
    ALL_ROOMS[180],
    ALL_ROOMS[220],
    ALL_ROOMS[260],
    ALL_ROOMS[310],
    ALL_ROOMS[360],
    ALL_ROOMS[410],
    ALL_ROOMS[18],
    ALL_ROOMS[95],
    ALL_ROOMS[5],
    ALL_ROOMS[70],
    ALL_ROOMS[140],
    ALL_ROOMS[200],
  ]

  const residents = [
    {
      id: 'res-anita',
      name: 'Anita Mishra',
      phone: '9876501001',
      email: 'anita.mishra@email.com',
      startDate: addDays(today, -220),
      endDate: '',
      endUndecided: true,
      roomId: namedRooms[0].id,
    },
    {
      id: 'res-rahul',
      name: 'Rahul Das',
      phone: '9876501002',
      email: 'rahul.das@email.com',
      startDate: addDays(today, -410),
      endDate: addDays(today, 180),
      endUndecided: false,
      roomId: namedRooms[1].id,
    },
    {
      id: 'res-priya',
      name: 'Priya Nayak',
      phone: '9876501003',
      email: 'priya.nayak@email.com',
      startDate: addDays(today, -90),
      endDate: '',
      endUndecided: true,
      roomId: namedRooms[2].id,
    },
    {
      id: 'res-suresh',
      name: 'Suresh Patel',
      phone: '9876501004',
      email: 'suresh.patel@email.com',
      startDate: addDays(today, -60),
      endDate: addDays(today, 300),
      endUndecided: false,
      roomId: namedRooms[3].id,
    },
    {
      id: 'res-meera',
      name: 'Meera Sahoo',
      phone: '9876501005',
      email: 'meera.sahoo@email.com',
      startDate: addDays(today, -15),
      endDate: '',
      endUndecided: true,
      roomId: namedRooms[4].id,
    },
    {
      id: 'res-arjun',
      name: 'Arjun Sen',
      phone: '9876501006',
      email: 'arjun.sen@email.com',
      startDate: addDays(today, -300),
      endDate: '',
      endUndecided: true,
      roomId: namedRooms[5].id,
    },
    {
      id: 'res-kavya',
      name: 'Kavya Reddy',
      phone: '9876501007',
      email: 'kavya.reddy@email.com',
      startDate: addDays(today, -8),
      endDate: addDays(today, 120),
      endUndecided: false,
      roomId: namedRooms[6].id,
    },
    {
      id: 'res-vikram',
      name: 'Vikram Joshi',
      phone: '9876501008',
      email: 'vikram.joshi@email.com',
      startDate: addDays(today, -500),
      endDate: '',
      endUndecided: true,
      roomId: namedRooms[7].id,
    },
    {
      id: 'res-neha',
      name: 'Neha Kapoor',
      phone: '9876501009',
      email: 'neha.kapoor@email.com',
      startDate: addDays(today, 12),
      endDate: '',
      endUndecided: true,
      roomId: namedRooms[8].id,
    },
    {
      id: 'res-amit',
      name: 'Amit Behera',
      phone: '9876501010',
      email: 'amit.behera@email.com',
      startDate: addDays(today, 28),
      endDate: addDays(today, 210),
      endUndecided: false,
      roomId: namedRooms[9].id,
    },
    {
      id: 'res-leena',
      name: 'Leena Mohanty',
      phone: '9876501011',
      email: 'leena.mohanty@email.com',
      startDate: addDays(today, -800),
      endDate: addDays(today, -40),
      endUndecided: false,
      roomId: namedRooms[10].id,
    },
    {
      id: 'res-farhan',
      name: 'Farhan Ali',
      phone: '9876501012',
      email: 'farhan.ali@email.com',
      startDate: addDays(today, -640),
      endDate: addDays(today, -12),
      endUndecided: false,
      roomId: namedRooms[11].id,
    },
    {
      id: 'res-divya',
      name: 'Divya Rao',
      phone: '9876501013',
      email: 'divya.rao@email.com',
      startDate: addDays(today, -900),
      endDate: addDays(today, -120),
      endUndecided: false,
      roomId: namedRooms[12].id,
    },
    {
      id: 'res-gopal',
      name: 'Gopal Swain',
      phone: '9876501014',
      email: 'gopal.swain@email.com',
      startDate: addDays(today, -430),
      endDate: addDays(today, -7),
      endUndecided: false,
      roomId: namedRooms[13].id,
    },
  ]

  const holdingIds = [...roomsHeldBy(residents)]
  const seedOccupied = pickSeedOccupied(holdingIds)

  const complaints = [
    {
      id: 'cmp-1',
      title: 'Kitchen tap leaking',
      category: 'Plumbing',
      description: 'Continuous drip under the kitchen sink since last night. Water pooling near the cabinet.',
      raisedAt: addDays(today, -2),
      status: 'pending',
      residentId: 'res-anita',
      assignee: 'Maintenance',
      resolution: '',
    },
    {
      id: 'cmp-2',
      title: 'Corridor light not working',
      category: 'Electrical',
      description: 'Floor corridor light flickers and went out after 9 PM.',
      raisedAt: addDays(today, -6),
      status: 'resolved',
      residentId: 'res-rahul',
      assignee: 'Maintenance',
      resolution: 'Replaced the LED driver and checked the circuit.',
    },
    {
      id: 'cmp-3',
      title: 'Housekeeping missed lobby',
      category: 'Housekeeping',
      description: 'Ground-floor lobby was not cleaned during the morning slot.',
      raisedAt: addDays(today, -1),
      status: 'raised',
      residentId: 'res-priya',
      assignee: '',
      resolution: '',
    },
    {
      id: 'cmp-4',
      title: 'Unknown visitor at gate',
      category: 'Security',
      description: 'A visitor insisted on entering without a host confirmation.',
      raisedAt: addDays(today, -4),
      status: 'rejected',
      residentId: 'res-suresh',
      assignee: 'Security',
      resolution: 'Reviewed CCTV. Visitor was a courier already logged in the guest book.',
    },
    {
      id: 'cmp-5',
      title: 'Late-night noise',
      category: 'Noise',
      description: 'Music from a neighbouring unit after 11:30 PM.',
      raisedAt: addDays(today, -3),
      status: 'pending',
      residentId: 'res-meera',
      assignee: 'Admin',
      resolution: '',
    },
    {
      id: 'cmp-6',
      title: 'AC drain overflow',
      category: 'Plumbing',
      description: 'Bedroom AC is dripping onto the floor.',
      raisedAt: addDays(today, -9),
      status: 'resolved',
      residentId: 'res-arjun',
      assignee: 'Maintenance',
      resolution: 'Cleared the drain pipe and added a service note.',
    },
    {
      id: 'cmp-7',
      title: 'Parking light out',
      category: 'Electrical',
      description: 'Basement parking bay light is dark near the ramp.',
      raisedAt: today,
      status: 'raised',
      residentId: 'res-kavya',
      assignee: '',
      resolution: '',
    },
    {
      id: 'cmp-8',
      title: 'Garbage not collected',
      category: 'Housekeeping',
      description: 'Dry waste was left in the chute room yesterday evening.',
      raisedAt: addDays(today, -5),
      status: 'pending',
      residentId: 'res-vikram',
      assignee: 'Housekeeping',
      resolution: '',
    },
  ]

  const bills = [
    {
      id: 'bill-anita',
      residentId: 'res-anita',
      amount: namedRooms[0].rent,
      dueDate: addDays(today, 8),
      period: today.slice(0, 7),
      status: 'issued',
      notes: 'Monthly rent',
      createdAt: today,
    },
  ]

  const roomChanges = [
    {
      id: 'rc-1',
      residentId: 'res-rahul',
      fromRoomId: namedRooms[1].id,
      toBlockId: 'block-2',
      toFloor: 3,
      toRoomId: '',
      reason: 'Needs a quieter floor closer to the lift.',
      status: 'pending',
      requestedAt: addDays(today, -1),
    },
  ]

  return {
    version: STORE_VERSION,
    residents,
    complaints,
    bills,
    roomChanges,
    seedOccupied,
  }
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function loadState() {
  if (!canUseStorage()) return seedState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedState()
    const parsed = JSON.parse(raw)
    if (parsed?.version !== STORE_VERSION || !Array.isArray(parsed.residents)) return seedState()
    return {
      version: STORE_VERSION,
      residents: parsed.residents || [],
      complaints: parsed.complaints || [],
      bills: parsed.bills || [],
      roomChanges: parsed.roomChanges || [],
      seedOccupied: Array.isArray(parsed.seedOccupied) ? parsed.seedOccupied : pickSeedOccupied([]),
    }
  } catch {
    return seedState()
  }
}

function persist(next) {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* ignore quota */
  }
}

let state = loadState()
if (canUseStorage() && !window.localStorage.getItem(STORAGE_KEY)) persist(state)

function emit(next) {
  state = next
  persist(state)
  listeners.forEach((listener) => listener(state))
}

function update(mutator) {
  emit(mutator({ ...state, residents: [...state.residents], complaints: [...state.complaints], bills: [...state.bills], roomChanges: [...state.roomChanges], seedOccupied: [...state.seedOccupied] }))
}

export function getCommunityState() {
  return state
}

export function useCommunity() {
  const [snap, setSnap] = useState(state)
  useEffect(() => {
    listeners.add(setSnap)
    setSnap(state)
    return () => listeners.delete(setSnap)
  }, [])
  return snap
}

export function getResident(stateRef, residentId) {
  return (stateRef || state).residents.find((resident) => resident.id === residentId) || null
}

export function roomLabel(roomId) {
  const room = getRoom(roomId)
  if (!room) return '—'
  const block = getBlock(room.blockId)
  return `${block?.name || 'Block'} · Floor ${room.floor} · ${room.number}`
}

export function occupancyCounts(stateRef = state) {
  const held = roomsHeldBy(stateRef.residents)
  const seed = (stateRef.seedOccupied || []).filter((roomId) => !held.has(roomId))
  const occupied = held.size + seed.length
  const total = ALL_ROOMS.length
  return {
    total,
    occupied,
    vacant: Math.max(0, total - occupied),
    namedOccupied: held.size,
    seedOccupied: seed.length,
  }
}

export function getBlockStats(stateRef = state) {
  const held = roomsHeldBy(stateRef.residents)
  const seed = new Set((stateRef.seedOccupied || []).filter((roomId) => !held.has(roomId)))
  return BLOCK_SPECS.map((block) => {
    const rooms = ALL_ROOMS.filter((room) => room.blockId === block.id)
    let occupied = 0
    let beds = 0
    let occupiedBeds = 0
    let monthlyRent = 0
    const byType = {}
    for (const room of rooms) {
      beds += room.beds
      const taken = held.has(room.id) || seed.has(room.id)
      if (taken) {
        occupied += 1
        occupiedBeds += room.beds
        monthlyRent += room.rent
      }
      byType[room.type] = byType[room.type] || { total: 0, occupied: 0 }
      byType[room.type].total += 1
      if (taken) byType[room.type].occupied += 1
    }
    const vacant = rooms.length - occupied
    const occupancy = rooms.length ? Math.round((occupied / rooms.length) * 100) : 0
    return {
      ...block,
      totalRooms: rooms.length,
      occupied,
      vacant,
      occupancy,
      beds,
      occupiedBeds,
      vacantBeds: beds - occupiedBeds,
      monthlyRent,
      byType,
    }
  })
}

export function vacantByType(stateRef = state) {
  const held = roomsHeldBy(stateRef.residents)
  const seed = new Set((stateRef.seedOccupied || []).filter((roomId) => !held.has(roomId)))
  return ROOM_TYPES.map((kind) => {
    const rooms = ALL_ROOMS.filter((room) => room.type === kind.type)
    const vacant = rooms.filter((room) => !held.has(room.id) && !seed.has(room.id)).length
    return { ...kind, vacant, total: rooms.length }
  })
}

export function getVacantUnits(stateRef = state, limit = 5) {
  const held = roomsHeldBy(stateRef.residents)
  const seed = new Set((stateRef.seedOccupied || []).filter((roomId) => !held.has(roomId)))
  return ALL_ROOMS.filter((room) => !held.has(room.id) && !seed.has(room.id)).slice(0, limit)
}

export function complaintSummary(stateRef = state) {
  const list = stateRef.complaints || []
  return {
    raised: list.length,
    resolved: list.filter((item) => item.status === 'resolved').length,
    pending: list.filter((item) => item.status === 'pending' || item.status === 'raised').length,
    rejected: list.filter((item) => item.status === 'rejected').length,
  }
}

export function getDashboardMetrics(stateRef = state) {
  const counts = occupancyCounts(stateRef)
  const holding = stateRef.residents.filter((resident) => holdsRoom(resident))
  const permanent = holding.filter((resident) => resident.endUndecided).length
  const shortTerm = Math.max(0, holding.length - permanent)
  const billed = (stateRef.bills || []).reduce((sum, bill) => sum + Number(bill.amount || 0), 0)
  const revenue = 65000 + billed
  const typeVacant = vacantByType(stateRef)
  return {
    capacity: counts.total,
    occupied: counts.occupied,
    vacant: counts.vacant,
    permanent: counts.occupied - shortTerm,
    shortTerm,
    revenue,
    vacantByType: typeVacant,
  }
}

function claimRoom(seedOccupied, roomId) {
  return seedOccupied.filter((id) => id !== roomId)
}

export function addResident(input) {
  const resident = {
    id: uid('res'),
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    startDate: input.startDate,
    endDate: input.endUndecided ? '' : input.endDate || '',
    endUndecided: Boolean(input.endUndecided),
    roomId: input.roomId,
  }

  update((draft) => {
    draft.residents.push(resident)
    if (holdsRoom(resident) && resident.roomId) {
      draft.seedOccupied = claimRoom(draft.seedOccupied, resident.roomId)
    }
    return draft
  })
  return resident
}

export function createBill(input) {
  const bill = {
    id: uid('bill'),
    residentId: input.residentId,
    amount: Number(input.amount) || 0,
    dueDate: input.dueDate,
    period: input.period || todayISO().slice(0, 7),
    status: input.status || 'issued',
    notes: input.notes || '',
    createdAt: todayISO(),
  }
  update((draft) => {
    draft.bills.push(bill)
    return draft
  })
  return bill
}

export function updateComplaint(id, patch) {
  update((draft) => {
    draft.complaints = draft.complaints.map((item) => (item.id === id ? { ...item, ...patch } : item))
    return draft
  })
}

export function addRoomChangeRequest(input) {
  const request = {
    id: uid('rc'),
    residentId: input.residentId,
    fromRoomId: input.fromRoomId,
    toBlockId: input.toBlockId || '',
    toFloor: input.toFloor ? Number(input.toFloor) : '',
    toRoomId: input.toRoomId || '',
    reason: input.reason || '',
    status: 'pending',
    requestedAt: todayISO(),
  }
  update((draft) => {
    draft.roomChanges.push(request)
    return draft
  })
  return request
}

export function decideRoomChange(id, decision, toRoomId) {
  const item = state.roomChanges.find((row) => row.id === id)
  if (!item) return { ok: false, error: 'missing' }
  if (decision === 'approved') {
    const nextRoom = toRoomId || item.toRoomId
    if (!nextRoom) return { ok: false, error: 'room' }
    if (isRoomOccupied(state, nextRoom, item.residentId)) return { ok: false, error: 'occupied' }
  }

  update((draft) => {
    draft.roomChanges = draft.roomChanges.map((row) => {
      if (row.id !== id) return row
      if (decision === 'approved') {
        const resident = draft.residents.find((entry) => entry.id === row.residentId)
        const nextRoom = toRoomId || row.toRoomId
        if (resident && nextRoom) {
          resident.roomId = nextRoom
          draft.seedOccupied = claimRoom(draft.seedOccupied, nextRoom)
        }
        return { ...row, status: 'approved', toRoomId: nextRoom }
      }
      return { ...row, status: 'rejected' }
    })
    return draft
  })
  return { ok: true }
}

export function bulkChangeRooms(assignments) {
  const moved = []
  const errors = []
  update((draft) => {
    for (const row of assignments) {
      const resident = draft.residents.find((item) => item.id === row.residentId)
      if (!resident) {
        errors.push({ residentId: row.residentId, message: 'Resident not found' })
        continue
      }
      if (!row.roomId) {
        errors.push({ residentId: row.residentId, message: 'Room is required' })
        continue
      }
      const taken = isRoomOccupied({ ...draft, residents: draft.residents }, row.roomId, resident.id)
      if (taken) {
        errors.push({ residentId: row.residentId, name: resident.name, message: 'Room is occupied' })
        continue
      }
      resident.roomId = row.roomId
      draft.seedOccupied = claimRoom(draft.seedOccupied, row.roomId)
      moved.push(resident.id)
    }
    return draft
  })
  return { moved, errors }
}

export function importResidents(rows) {
  const created = []
  const errors = []
  update((draft) => {
    rows.forEach((row, index) => {
      const line = index + 1
      const name = String(row.name || '').trim()
      const phone = String(row.phone || '').trim()
      const email = String(row.email || '').trim()
      const startDate = String(row.startDate || '').trim()
      const roomId = String(row.roomId || '').trim()
      if (!name || !phone || !email || !startDate || !roomId) {
        errors.push({ line, message: 'Missing required fields' })
        return
      }
      if (isRoomOccupied(draft, roomId)) {
        errors.push({ line, name, message: 'Room is occupied' })
        return
      }
      const resident = {
        id: uid('res'),
        name,
        phone,
        email,
        startDate,
        endDate: row.endUndecided ? '' : String(row.endDate || '').trim(),
        endUndecided: Boolean(row.endUndecided) || !row.endDate,
        roomId,
      }
      draft.residents.push(resident)
      if (holdsRoom(resident)) draft.seedOccupied = claimRoom(draft.seedOccupied, roomId)
      created.push(resident)
    })
    return draft
  })
  return { created, errors }
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_RE = /^(\+91[\s-]?)?[6-9]\d{9}$/

export function validateResidentForm(values, stateRef = state) {
  const errors = {}
  if (!values.name?.trim()) errors.name = 'ops.errName'
  if (!values.phone?.trim()) errors.phone = 'ops.errPhone'
  else if (!PHONE_RE.test(values.phone.trim())) errors.phone = 'ops.errPhoneInvalid'
  if (!values.email?.trim()) errors.email = 'ops.errEmail'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'ops.errEmailInvalid'
  if (!values.startDate) errors.startDate = 'ops.errStart'
  if (!values.endUndecided) {
    if (!values.endDate) errors.endDate = 'ops.errEnd'
    else if (values.startDate && values.endDate < values.startDate) errors.endDate = 'ops.errEndBefore'
  }
  if (!values.blockId) errors.blockId = 'ops.errBlock'
  if (!values.floor) errors.floor = 'ops.errFloor'
  if (!values.roomId) errors.roomNo = 'ops.errRoom'
  else if (isRoomOccupied(stateRef, values.roomId)) errors.roomNo = 'ops.errRoomOccupied'
  if (values.createBill) {
    if (!values.billAmount || Number(values.billAmount) <= 0) errors.billAmount = 'ops.errBillAmount'
    if (!values.billDueDate) errors.billDueDate = 'ops.errBillDue'
  }
  return errors
}

export function findRoomByParts(blockId, floor, number) {
  return ALL_ROOMS.find(
    (room) => room.blockId === blockId && room.floor === Number(floor) && String(room.number) === String(number),
  )
}

export function blockIdFromName(name) {
  const normalized = String(name || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
  const match = BLOCK_SPECS.find(
    (block) => block.name.toLowerCase() === normalized || block.id === normalized || block.name.toLowerCase() === `block ${normalized}`,
  )
  return match?.id || ''
}

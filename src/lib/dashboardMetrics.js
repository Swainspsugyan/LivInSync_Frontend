export const ROOM_CAPACITY_CARDS = [
  { id: '101', shortId: '01', capacity: 4, occupied: 3, color: '#aa4b6b' },
  { id: '102', shortId: '02', capacity: 4, occupied: 4, color: '#6b6b83' },
  { id: '201', shortId: '03', capacity: 2, occupied: 1, color: '#3b8d99' },
  { id: '305', shortId: '04', capacity: 6, occupied: 4, color: '#aa4b6b' },
]

export const METRIC_CARDS = [
  {
    id: 'capacity',
    titleKey: 'metrics.capacity',
    value: '500',
    unitKey: 'metrics.units',
    summaryKey: 'metrics.sumCapacity',
    href: '/analytics',
    slices: [
      { nameKey: 'metrics.occupied', value: 375, color: '#22d3ee' },
      { nameKey: 'metrics.vacant', value: 125, color: '#a855f7' },
    ],
  },
  {
    id: 'occupied',
    titleKey: 'metrics.occupiedUnits',
    value: '375',
    unitKey: 'metrics.units',
    summaryKey: 'metrics.sumOccupied',
    slices: [
      { nameKey: 'metrics.permanent', value: 300, color: '#38bdf8' },
      { nameKey: 'metrics.shortTerm', value: 75, color: '#e879f9' },
    ],
  },
  {
    id: 'revenue',
    titleKey: 'metrics.revenue',
    value: '$65,000',
    unitKey: 'metrics.perMonth',
    summaryKey: 'metrics.sumRevenue',
    slices: [
      { nameKey: 'metrics.baseRent', value: 42250, color: '#22d3ee' },
      { nameKey: 'metrics.amenities', value: 13000, color: '#818cf8' },
      { nameKey: 'metrics.maintenance', value: 9750, color: '#f472b6' },
    ],
  },
  {
    id: 'vacant',
    titleKey: 'metrics.vacantUnits',
    value: '125',
    unitKey: 'metrics.units',
    summaryKey: 'metrics.sumVacant',
    slices: [
      { nameKey: 'metrics.studios', value: 63, color: '#22d3ee' },
      { nameKey: 'metrics.oneBed', value: 37, color: '#60a5fa' },
      { nameKey: 'metrics.twoBed', value: 25, color: '#c084fc' },
    ],
  },
]

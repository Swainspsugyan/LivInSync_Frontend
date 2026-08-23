export const METRIC_CARDS = [
  {
    id: 'capacity',
    title: 'Total Room Capacity',
    value: '500',
    unit: 'Units',
    hint: '375 occupied · 125 vacant',
    summary: 'Total Capacity: 500 Units (375 Occupied, 125 Vacant)',
    href: '/analytics',
    slices: [
      { name: 'Occupied', value: 375, color: '#22d3ee' },
      { name: 'Vacant', value: 125, color: '#a855f7' },
    ],
  },
  {
    id: 'occupied',
    title: 'Occupied Units',
    value: '375',
    unit: 'Units',
    hint: '300 permanent · 75 short-term',
    summary: 'Occupied: 375 Units (300 Permanent, 75 Short-Term)',
    slices: [
      { name: 'Permanent', value: 300, color: '#38bdf8' },
      { name: 'Short-Term', value: 75, color: '#e879f9' },
    ],
  },
  {
    id: 'revenue',
    title: 'Monthly Revenue',
    value: '$65,000',
    unit: '/ month',
    hint: 'Rent · amenities · services',
    summary: 'Total Revenue: $65,000 / month',
    slices: [
      { name: 'Base Rent', value: 42250, color: '#22d3ee' },
      { name: 'Amenities', value: 13000, color: '#818cf8' },
      { name: 'Maintenance Fees', value: 9750, color: '#f472b6' },
    ],
  },
  {
    id: 'vacant',
    title: 'Vacant Units',
    value: '125',
    unit: 'Units',
    hint: 'By room type',
    summary: 'Total Vacant: 125 Units',
    slices: [
      { name: 'Studios', value: 63, color: '#22d3ee' },
      { name: '1-Bedroom', value: 37, color: '#60a5fa' },
      { name: '2-Bedroom', value: 25, color: '#c084fc' },
    ],
  },
]

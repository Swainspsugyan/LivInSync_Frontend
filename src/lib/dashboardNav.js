import {
  BarChart3,
  Building2,
  Home,
  Pin,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'

export const DASH_NAV = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  {
    id: 'community',
    label: 'Community',
    icon: Users,
    children: [
      { id: 'directory', label: 'Directory' },
      { id: 'identity', label: 'Identity Verification' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      { id: 'team-roles', label: 'Team & Roles' },
      { id: 'policies', label: 'Policies' },
      { id: 'resources', label: 'Resources' },
      { id: 'events', label: 'Events' },
    ],
  },
  {
    id: 'facilities',
    label: 'Facilities',
    icon: Building2,
    children: [
      { id: 'towers-blocks', label: 'Towers & Blocks' },
      { id: 'units', label: 'Units' },
    ],
  },
  { id: 'notice-board', label: 'Notice Board', icon: Pin },
  {
    id: 'visitor-gate',
    label: 'Visitor & Gate',
    icon: ShieldCheck,
    children: [
      { id: 'guest-log', label: 'Guest Log' },
      { id: 'security-gate', label: 'Security Gate' },
      { id: 'entry-pass', label: 'Entry Pass' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: TrendingUp,
    children: [
      { id: 'daily-summary', label: 'Daily Summary' },
      { id: 'monthly-audit', label: 'Monthly Audit' },
    ],
  },
]

export const MODULE_COPY = {
  insights: 'Occupancy, revenue, and gate activity broken down by tower and room type.',
  directory: 'Directory of every household, owner, and tenant across the community.',
  identity: 'Verify identity documents and approval status for incoming residents.',
  'team-roles': 'Manage admin roles, staff access, and committee permissions.',
  policies: 'Publish and version society policies, bylaws, and house rules.',
  resources: 'Shared files, forms, and useful links for residents and staff.',
  events: 'Plan community events, bookings, and attendance.',
  'towers-blocks': 'Towers, blocks, and common-area inventory.',
  units: 'Flats, villas, and unit records with occupancy status.',
  'notice-board': 'Broadcast notices, circulars, and emergency alerts.',
  'guest-log': 'Live visitor log with host, purpose, and entry time.',
  'security-gate': 'Gate staff roster, booth status, and incident notes.',
  'entry-pass': 'Pre-approved QR passes waiting at the gate.',
  'daily-summary': 'Today’s collections, complaints, and gate summary.',
  'monthly-audit': 'Month-to-date occupancy, revenue, and SLA trends.',
}

export function groupForView(viewId) {
  return DASH_NAV.find((item) => item.children?.some((child) => child.id === viewId))?.id
}

export const DEFAULT_VIEW = 'overview'

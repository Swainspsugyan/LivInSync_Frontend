import {
  BarChart3,
  Building2,
  Home,
  MessageSquare,
  Pin,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'

export const DASH_NAV = [
  { id: 'overview', label: 'Home', emoji: '🏠', icon: Home },
  { id: 'insights', label: 'Dashboard', emoji: '📊', icon: BarChart3 },
  { id: 'complaints', label: 'Complaints', emoji: '💬', icon: MessageSquare },
  {
    id: 'community',
    label: 'Residents',
    emoji: '👥',
    icon: Users,
    children: [
      { id: 'directory', label: 'Resident Directory' },
      { id: 'identity', label: 'ID Verification' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    emoji: '⚙️',
    icon: Settings,
    children: [
      { id: 'team-roles', label: 'Staff & Roles' },
      { id: 'policies', label: 'Rules & Policies' },
      { id: 'resources', label: 'Documents' },
      { id: 'events', label: 'Community Events' },
    ],
  },
  {
    id: 'facilities',
    label: 'Property',
    emoji: '🏢',
    icon: Building2,
    children: [
      { id: 'towers-blocks', label: 'Buildings' },
      { id: 'units', label: 'Apartments' },
    ],
  },
  { id: 'notice-board', label: 'Announcements', emoji: '📌', icon: Pin },
  {
    id: 'visitor-gate',
    label: 'Visitors & Security',
    emoji: '🛡️',
    icon: ShieldCheck,
    children: [
      { id: 'guest-log', label: 'Visitor Log' },
      { id: 'security-gate', label: 'Gate Security' },
      { id: 'entry-pass', label: 'Visitor Passes' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    emoji: '📈',
    icon: TrendingUp,
    children: [
      { id: 'daily-summary', label: 'Daily Report' },
      { id: 'monthly-audit', label: 'Monthly Report' },
    ],
  },
]

export const MODULE_COPY = {
  insights: 'Occupancy, revenue, and gate activity broken down by tower and room type.',
  complaints: 'Track, assign, and resolve resident complaints from a single workspace.',
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

const DIRECTORY_PANELS = {
  new: 'directory-new',
  past: 'directory-past',
  requests: 'directory-requests',
  'bulk-change': 'directory-bulk-change',
  'bulk-upload': 'directory-bulk-upload',
}

export function pathForView(id) {
  if (id === 'overview') return '/dashboard'
  if (id === 'insights') return '/analytics'
  if (id === 'directory') return '/dashboard/directory'
  if (id === 'directory-new') return '/dashboard/directory/new'
  if (id === 'directory-past') return '/dashboard/directory/past'
  if (id === 'directory-requests') return '/dashboard/directory/requests'
  if (id === 'directory-bulk-change') return '/dashboard/directory/bulk-change'
  if (id === 'directory-bulk-upload') return '/dashboard/directory/bulk-upload'
  return `/dashboard/${id}`
}

export function viewFromPath(pathname) {
  if (pathname === '/analytics') return 'insights'
  if (pathname === '/dashboard' || pathname === '/dashboard/') return 'overview'
  if (pathname.startsWith('/dashboard/directory/')) {
    const panel = pathname.slice('/dashboard/directory/'.length).replace(/\/$/, '')
    return DIRECTORY_PANELS[panel] || 'directory'
  }
  if (pathname === '/dashboard/directory' || pathname === '/dashboard/directory/') return 'directory'
  const rest = pathname.replace(/^\/dashboard\/?/, '').replace(/\/$/, '')
  return rest || 'overview'
}

export function isDirectoryView(viewId) {
  return viewId === 'directory' || String(viewId).startsWith('directory-')
}

export function groupForView(viewId) {
  if (isDirectoryView(viewId)) return 'community'
  return DASH_NAV.find((item) => item.children?.some((child) => child.id === viewId))?.id
}

export function navItemIsActive(itemId, active) {
  if (itemId === 'directory') return isDirectoryView(active)
  return active === itemId
}

export const DEFAULT_VIEW = 'overview'

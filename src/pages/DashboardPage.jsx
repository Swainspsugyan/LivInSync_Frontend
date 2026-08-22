import {
  Activity,
  Bell,
  CalendarDays,
  ChevronDown,
  FileBarChart,
  FileText,
  Headphones,
  Home,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Shield,
  Ticket,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { asset } from '../lib/asset.js'
import { getSession, logout } from '../lib/auth.js'
import BrandMark, { LOGO } from '../components/BrandMark.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'

const navItems = [
  { icon: Home, label: 'Dashboard' },
  { icon: Activity, label: 'My Activity' },
  { icon: Users, label: 'Residents' },
  { icon: Ticket, label: 'Tickets' },
  { icon: UserRound, label: 'Visitors' },
  { icon: MessageSquare, label: 'Communication' },
  { icon: Headphones, label: 'Student Support' },
  { icon: FileText, label: 'Bills Management' },
  { icon: FileBarChart, label: 'Reports' },
  { icon: Shield, label: 'Student Tracking' },
]

const categories = [
  { label: 'Boarding', count: 4 },
  { label: 'Toilet', count: 3 },
  { label: 'Housekeeping', count: 2 },
  { label: 'Lift', count: 2 },
  { label: 'Community Management', count: 1 },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

function todayLabel() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function DashboardPage() {
  const session = getSession()
  const navigate = useNavigate()
  const [menu, setMenu] = useState(false)
  const [profile, setProfile] = useState(false)
  const [active, setActive] = useState('Dashboard')
  const maxCount = useMemo(
    () => Math.max(...categories.map((c) => c.count), 1),
    [],
  )

  if (!session) return <Navigate to="/login" replace />

  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="theme-surface dash min-h-dvh overflow-x-hidden">
      <div className="flex min-h-dvh">
        <aside
          className={`theme-chrome fixed inset-y-0 left-0 z-30 w-[240px] border-r pt-3 transition-transform lg:static lg:translate-x-0 ${
            menu ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between gap-2 px-3 pb-4">
            <BrandMark compact className="min-w-0" />
            <button
              type="button"
              className="theme-heading shrink-0 lg:hidden"
              onClick={() => setMenu(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="px-2">
            {navItems.map((item) => {
              const on = active === item.label
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setActive(item.label)
                    setMenu(false)
                  }}
                  className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] ${
                    on
                      ? 'bg-emerald-500/10 font-semibold text-emerald-600 shadow-[inset_3px_0_0_#10b981]'
                      : 'theme-muted font-medium hover:bg-[color:color-mix(in_srgb,var(--resiq-fg)_6%,transparent)]'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {menu && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-black/20 lg:hidden"
            onClick={() => setMenu(false)}
            aria-label="Close sidebar"
          />
        )}

        <div className="min-w-0 flex-1">
          <header className="theme-chrome sticky top-0 z-10 flex min-w-0 items-center gap-2 border-b px-3 py-2.5 shadow-sm backdrop-blur-md sm:gap-3 sm:px-6">
            <button
              type="button"
              className="theme-heading shrink-0 lg:hidden"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <BrandMark compact className="min-w-0 flex-1 lg:hidden" />
            <label className="relative hidden min-w-0 flex-1 lg:block">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search here..."
                className="theme-heading w-full max-w-md rounded-full border border-[color:var(--resiq-line)] bg-[color:color-mix(in_srgb,var(--resiq-fg)_6%,transparent)] py-2 pl-9 pr-3 text-sm outline-none placeholder:opacity-50 focus:border-emerald-400/50"
              />
            </label>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                className="theme-heading hidden rounded-lg border border-[color:var(--resiq-line)] bg-[color:color-mix(in_srgb,var(--resiq-fg)_6%,transparent)] px-3 py-1.5 text-xs font-semibold sm:inline"
              >
                Export
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-400"
              >
                <Plus size={14} />
                Create
              </button>
              <button
                type="button"
                className="theme-heading relative rounded-full bg-[color:color-mix(in_srgb,var(--resiq-fg)_8%,transparent)] p-2"
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfile((v) => !v)}
                  className="theme-heading flex items-center gap-2 rounded-full bg-[color:color-mix(in_srgb,var(--resiq-fg)_8%,transparent)] py-1 pl-1 pr-2"
                >
                  <img src={asset(LOGO)} alt="" className="h-7 w-7 rounded-md object-cover ring-1 ring-[#d4af37]/70" />
                  <span className="hidden text-xs font-semibold sm:inline">{session.name}</span>
                  <ChevronDown size={14} className="text-slate-300" />
                </button>
                {profile && (
                  <div className="theme-chrome absolute right-0 mt-2 w-44 rounded-xl border p-1 shadow-lg">
                    <button
                      type="button"
                      onClick={signOut}
                      className="theme-heading flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-[color:color-mix(in_srgb,var(--resiq-fg)_8%,transparent)]"
                    >
                      <LogOut size={14} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="px-4 py-5 sm:px-6">
            {active === 'Dashboard' ? (
              <>
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h1 className="font-display text-xl font-semibold break-words text-[#e8913a] sm:text-2xl">
                      {greeting()}, {session.name}!
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa3b2]">{todayLabel()}</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg border border-[#e6eaf1] bg-white px-3 py-1.5 text-xs font-semibold text-[#4b5563] dark:border-[#1e3344] dark:bg-[#10202c] dark:text-slate-200"
                  >
                    <CalendarDays size={14} />
                    Schedule
                  </button>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <article className="rounded-2xl bg-[#fde8ee] p-4">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-[#c45b73]">Total Ticket Capacity</p>
                    <div className="mt-3 flex items-end justify-between">
                      <p className="font-display text-3xl font-semibold text-[#c45b73] sm:text-4xl">2909</p>
                      <span className="rounded-lg bg-white/70 p-2 text-[#c45b73]">
                        <Ticket size={18} />
                      </span>
                    </div>
                    <p className="mt-3 text-[11px] text-[#c45b73]/80">Compared to previous month</p>
                  </article>
                  <article className="rounded-2xl bg-[#fbf3d0] p-4">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-[#b8860b]">Staff Leave Capacity</p>
                    <div className="mt-3 flex items-end justify-between">
                      <p className="font-display text-3xl font-semibold text-[#b8860b] sm:text-4xl">2200</p>
                      <span className="rounded-lg bg-white/70 p-2 text-[#b8860b]">
                        <Users size={18} />
                      </span>
                    </div>
                    <p className="mt-3 text-[11px] text-[#b8860b]/80">Compared to previous month</p>
                  </article>
                  <article className="rounded-2xl bg-[#d8f3e4] p-4">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-[#2f9d6a]">Occupancy Rate</p>
                    <div className="mt-3 flex items-end justify-between">
                      <p className="font-display text-3xl font-semibold text-[#2f9d6a] sm:text-4xl">76%</p>
                      <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#bbecd2" strokeWidth="5" />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="#2f9d6a"
                          strokeWidth="5"
                          pathLength="100"
                          strokeDasharray="76 24"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p className="mt-3 text-[11px] text-[#2f9d6a]/80">Compared to previous month</p>
                  </article>
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                  <article className="rounded-2xl bg-[#fde8ee] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#c45b73]">Complaints</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#8a4a58]">
                      Residents have raised issues quickly with precise tracking and faster resolutions.
                    </p>
                  </article>
                  <article className="rounded-2xl border border-[#e6eaf1] bg-white p-4 dark:border-[#1e3344] dark:bg-[#10202c]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Due tasks</p>
                      <span className="text-xs text-[#9aa3b2]">View All</span>
                    </div>
                    <div className="mt-3 rounded-xl bg-[#f7f8fb] p-3">
                      <p className="text-sm font-medium">Watch dogs out</p>
                      <p className="mt-1 text-xs text-[#9aa3b2]">2025-10-16 00:00 · 3 days remaining</p>
                    </div>
                  </article>
                </div>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <label className="relative min-w-0 flex-1">
                    <input
                      placeholder="Log New Complaint"
                      className="w-full rounded-xl border border-[#e6eaf1] bg-white py-2.5 pl-4 pr-10 text-sm dark:border-[#1e3344] dark:bg-[#10202c] dark:text-slate-100"
                    />
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]" />
                  </label>
                  <label className="relative min-w-0 flex-1">
                    <input
                      placeholder="Create New Bill/Voucher"
                      className="w-full rounded-xl border border-[#e6eaf1] bg-white py-2.5 pl-4 pr-10 text-sm dark:border-[#1e3344] dark:bg-[#10202c] dark:text-slate-100"
                    />
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]" />
                  </label>
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                  <article className="rounded-2xl border border-[#e6eaf1] bg-white p-4 dark:border-[#1e3344] dark:bg-[#10202c]">
                    <p className="text-sm font-semibold">Open Subject / Issue Categories</p>
                    <ul className="mt-4 space-y-3">
                      {categories.map((item) => (
                        <li key={item.label} className="flex min-w-0 items-center gap-2 sm:gap-3">
                          <span className="w-24 shrink-0 truncate text-xs text-[#4b5563] sm:w-40 sm:text-sm">{item.label}</span>
                          <div className="h-2 flex-1 rounded-full bg-[#eef1f6]">
                            <div
                              className="h-2 rounded-full bg-[#93c5fd]"
                              style={{ width: `${(item.count / maxCount) * 100}%` }}
                            />
                          </div>
                          <span className="w-4 text-right text-xs text-[#6b7280]">{item.count}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                  <article className="rounded-2xl border border-[#e6eaf1] bg-white p-4 dark:border-[#1e3344] dark:bg-[#10202c]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Notes</p>
                      <span className="text-xs text-[#9aa3b2]">View All</span>
                    </div>
                    <p className="mt-8 text-center text-sm text-[#9aa3b2]">No notes in last 7 days.</p>
                  </article>
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  <article className="rounded-2xl border border-[#e6eaf1] bg-white p-4 dark:border-[#1e3344] dark:bg-[#10202c]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Emergency</p>
                      <span className="text-xs text-[#9aa3b2]">View All</span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-[#4b5563]">
                      <li className="flex items-center gap-2">
                        <Phone size={14} className="text-[#2f9d6a]" /> WhatsApp alert
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail size={14} className="text-[#3b82f6]" /> Email
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone size={14} /> 1800-511-511 108
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone size={14} /> Tower office
                      </li>
                    </ul>
                  </article>
                  <article className="rounded-2xl border border-[#e6eaf1] bg-white p-4 dark:border-[#1e3344] dark:bg-[#10202c]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Suggestions</p>
                      <span className="text-xs text-[#9aa3b2]">View All</span>
                    </div>
                    <p className="mt-8 text-center text-sm text-[#9aa3b2]">No suggestions in last 7 days.</p>
                  </article>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-[#e6eaf1] bg-white p-8 text-center dark:border-[#1e3344] dark:bg-[#10202c]">
                <h2 className="font-display text-xl font-semibold text-navy">{active}</h2>
                <p className="mt-2 text-sm text-[#6b7280]">This module is ready for data once the backend is connected.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

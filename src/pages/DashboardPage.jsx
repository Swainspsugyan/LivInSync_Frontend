import { CalendarDays } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AskDock from '../components/dashboard/AskDock.jsx'
import DashboardGrid from '../components/dashboard/DashboardGrid.jsx'
import DetailPanel from '../components/dashboard/DetailPanel.jsx'
import Header from '../components/dashboard/Header.jsx'
import PageWrapper from '../components/dashboard/PageWrapper.jsx'
import Sidebar from '../components/dashboard/Sidebar.jsx'
import { getSession, logout } from '../lib/auth.js'

export default function DashboardPage() {
  const session = getSession()
  const navigate = useNavigate()
  const [menu, setMenu] = useState(false)
  const [profile, setProfile] = useState(false)
  const [active, setActive] = useState('Dashboard')
  const [detail, setDetail] = useState(null)

  if (!session) return <Navigate to="/login" replace />

  const hour = new Date().getHours()
  const hello = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="dash-shell min-h-dvh overflow-x-hidden">
      <div className="flex min-h-dvh">
        <Sidebar
          active={active}
          open={menu}
          onClose={() => setMenu(false)}
          onSelect={(label) => {
            setActive(label)
            setDetail(null)
            setMenu(false)
          }}
        />

        {menu && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-black/25 lg:hidden"
            onClick={() => setMenu(false)}
            aria-label="Close sidebar"
          />
        )}

        <div className="relative flex min-w-0 flex-1 flex-col">
          <Header
            session={session}
            onMenu={() => setMenu(true)}
            onSignOut={signOut}
            profile={profile}
            setProfile={setProfile}
          />
          <div className="flex flex-col gap-3 px-4 pb-6 pt-1 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {hello}, {session.name}!
              </h1>
              <p className="mt-1 text-sm text-white/80">{today}</p>
            </div>
            <button
              type="button"
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25"
            >
              <CalendarDays size={14} />
              Schedule
            </button>
          </div>

          <div className="relative z-10 flex-1 px-4 pb-28 sm:px-6">
            <PageWrapper viewKey={detail ? `detail-${detail.title}` : active}>
              {detail ? (
                <DetailPanel title={detail.title} copy={detail.copy} onBack={() => setDetail(null)} />
              ) : active === 'Dashboard' ? (
                <DashboardGrid onOpenDetail={setDetail} />
              ) : (
                <div className="dash-glass rounded-2xl p-8 text-center">
                  <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{active}</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    This module is ready for data once the backend is connected.
                  </p>
                </div>
              )}
            </PageWrapper>
          </div>

          <div className="pointer-events-none absolute bottom-4 right-4 z-20 sm:bottom-6 sm:right-6">
            <AskDock />
          </div>
        </div>
      </div>
    </div>
  )
}

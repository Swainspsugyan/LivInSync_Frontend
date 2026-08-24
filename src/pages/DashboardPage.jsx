import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AnalyticsView from '../components/dashboard/AnalyticsView.jsx'
import AskDock from '../components/dashboard/AskDock.jsx'
import DashboardHome from '../components/dashboard/DashboardHome.jsx'
import DetailPanel from '../components/dashboard/DetailPanel.jsx'
import Header from '../components/dashboard/Header.jsx'
import ModuleView from '../components/dashboard/ModuleView.jsx'
import PageWrapper from '../components/dashboard/PageWrapper.jsx'
import Sidebar from '../components/dashboard/Sidebar.jsx'
import { DEFAULT_VIEW } from '../lib/dashboardNav.js'
import { useI18n } from '../lib/i18n.jsx'
import { getSession, logout } from '../lib/auth.js'

function labelFor(viewId, t) {
  const key = `nav.${viewId}`
  const value = t(key)
  return value === key ? viewId : value
}

function formatStamp(date, locale) {
  return {
    date: date.toLocaleDateString(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}

export default function DashboardPage() {
  const session = getSession()
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const [menu, setMenu] = useState(false)
  const [profile, setProfile] = useState(false)
  const [active, setActive] = useState(location.pathname === '/analytics' ? 'insights' : DEFAULT_VIEW)
  const [detail, setDetail] = useState(null)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(tick)
  }, [])

  useEffect(() => {
    if (location.pathname === '/analytics') {
      setActive('insights')
      setDetail(null)
    }
  }, [location.pathname])

  const stamp = useMemo(() => formatStamp(now, locale), [now, locale])

  if (!session) return <Navigate to="/login" replace />

  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const goTo = (id) => {
    setDetail(null)
    setMenu(false)
    if (id === 'insights') {
      navigate('/analytics')
      setActive('insights')
      return
    }
    if (location.pathname !== '/dashboard') navigate('/dashboard')
    setActive(id)
  }

  return (
    <div className="dash-shell min-h-dvh overflow-x-hidden">
      <div className="flex min-h-dvh">
        <Sidebar active={active} open={menu} onClose={() => setMenu(false)} onSelect={goTo} />

        {menu && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-slate-900/30 lg:hidden"
            onClick={() => setMenu(false)}
            aria-label={t('common.closeSidebar')}
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

          <div className="flex flex-col gap-1 px-4 pb-4 pt-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
            <div>
              <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
                {t('dash.welcome', { name: session.name.split(' ')[0] })}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('dash.welcomeSub')}</p>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-right">
              <span className="block font-medium text-slate-700 dark:text-slate-200">{stamp.date}</span>
              <time dateTime={now.toISOString()}>{stamp.time}</time>
            </p>
          </div>

          <div className="relative z-10 flex-1 px-4 pb-28 sm:px-6">
            <PageWrapper viewKey={detail ? `detail-${detail.title}` : active}>
              {detail ? (
                <DetailPanel title={detail.title} copy={detail.copy} onBack={() => setDetail(null)} />
              ) : active === 'overview' ? (
                <DashboardHome
                  onAssign={(unit) => goTo('directory')}
                  onViewUnit={(unit) =>
                    setDetail({
                      title: `${unit.room} · ${unit.block}`,
                      copy: t('dash.unitDetail', { type: unit.type, rent: unit.rent }),
                    })
                  }
                />
              ) : active === 'insights' ? (
                <AnalyticsView />
              ) : (
                <ModuleView viewId={active} title={labelFor(active, t)} />
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

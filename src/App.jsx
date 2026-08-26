import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AuthModal from './components/AuthModal.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import PageWrapper from './components/dashboard/PageWrapper.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PricingPage from './pages/PricingPage.jsx'

export default function App() {
  const [auth, setAuth] = useState(null)
  const location = useLocation()
  const hideChrome =
    location.pathname === '/login' ||
    location.pathname === '/analytics' ||
    location.pathname.startsWith('/dashboard')

  useEffect(() => {
    document.documentElement.classList.remove('tabs-lock')
  }, [])

  return (
    <div
      className={`relative w-full min-h-dvh ${
        hideChrome ? 'overflow-x-clip' : 'overflow-x-hidden'
      }`}
    >
      <div className="page-canvas pointer-events-none fixed inset-0 z-0" aria-hidden />
      {!hideChrome && <Navbar onSignup={() => setAuth('signup')} />}
      <main className="relative z-10 w-full">
        <PageWrapper viewKey={location.pathname}>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Home
                  onDemo={() => setAuth('signup')}
                  onRegister={() => setAuth('signup')}
                />
              }
            />
            <Route path="/pricing" element={<PricingPage onSelect={() => setAuth('signup')} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/*" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<DashboardPage />} />
          </Routes>
        </PageWrapper>
      </main>
      {!hideChrome && <Footer />}
      <AuthModal mode={auth} onClose={() => setAuth(null)} onSwitch={setAuth} />
    </div>
  )
}

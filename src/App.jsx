import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AuthModal from './components/AuthModal.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PricingPage from './pages/PricingPage.jsx'

export default function App() {
  const [auth, setAuth] = useState(null)
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <div className="relative min-h-screen bg-white text-ink">
      {!isLogin && (
        <Navbar onSignup={() => setAuth('signup')} />
      )}
      <main className="relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onDemo={() => setAuth('signup')}
                onRegister={() => setAuth('signup')}
              />
            }
          />
          <Route
            path="/pricing"
            element={<PricingPage onSelect={() => setAuth('signup')} />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      {!isLogin && <Footer />}
      <AuthModal mode={auth} onClose={() => setAuth(null)} onSwitch={setAuth} />
    </div>
  )
}

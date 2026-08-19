import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', hash: 'home', label: 'Home' },
  { to: '/', hash: 'about', label: 'About Us' },
  { to: '/', hash: 'features', label: 'Features / Solutions' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/', hash: 'contact', label: 'Contact Us' },
]

function hrefFor(link) {
  return link.hash ? `${link.to}#${link.hash}` : link.to
}

export default function Navbar({ onSignup }) {
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState('home')
  const location = useLocation()
  const onPricing = location.pathname === '/pricing'

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      if (location.pathname !== '/') return
      const ids = ['home', 'about', 'features', 'contact']
      let current = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 140) current = id
      }
      setSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const isActive = (link) => {
    if (link.to === '/pricing') return onPricing
    if (onPricing) return false
    return section === link.hash
  }

  return (
    <header className="nav-shell fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex items-center justify-between py-5">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
            <img
              src="/image_0.png"
              alt="LivinSync logo"
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-navy/20 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
            />
            <span className="font-ui truncate text-xl font-semibold tracking-wide text-navy sm:text-2xl lg:text-3xl">
              LivinSync
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={hrefFor(link)}
                  className={`rounded-full px-4 py-2.5 font-ui text-[15px] font-medium ${
                    isActive(link)
                      ? 'bg-navy text-white'
                      : 'text-navy/80 hover:bg-white/50 hover:text-navy'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/login"
              className="btn-outline rounded-lg px-5 py-2.5 font-ui text-base"
            >
              Admin Login
            </Link>
            <button
              type="button"
              onClick={onSignup}
              className="btn-gold rounded-lg px-5 py-2.5 font-ui text-base"
            >
              Sign Up / Get Started
            </button>
          </div>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-xl text-navy lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="border-t border-navy/10 bg-pale px-4 pb-4 lg:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={hrefFor(link)}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-ui text-sm text-navy hover:bg-white/60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="btn-outline rounded-lg px-4 py-2.5 font-ui text-sm text-center"
            >
              Admin Login
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onSignup()
              }}
              className="btn-gold rounded-lg px-4 py-2.5 font-ui text-sm"
            >
              Sign Up / Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

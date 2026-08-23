import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { tabHref, viewFromLocation } from '../lib/homeView.js'
import BrandMark from './BrandMark.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { tab: 'features', label: 'Features' },
  { tab: 'modules', label: 'Modules' },
  { tab: 'solutions', label: 'Solutions' },
  { tab: 'about', label: 'About Us' },
]

export default function Navbar({ onSignup }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'
  const [section, setSection] = useState(() => (onHome ? viewFromLocation(location) : ''))
  const solidNav = open || !onHome || section !== 'home' || scrolled

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      if (location.pathname !== '/') return
      const ids = ['home', 'features', 'modules', 'solutions', 'about']
      let current = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 96) current = id
      }
      setSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname, location.search])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 w-full transition-[background-color,color,box-shadow] duration-[400ms] ease ${
        solidNav ? 'theme-nav shadow-sm' : 'bg-transparent theme-heading'
      }`}
    >
      <nav className="flex w-full min-h-16 items-center gap-1.5 px-2 py-2 sm:min-h-[4.25rem] sm:gap-3 sm:px-4 lg:px-8 xl:px-12">
        <button
          type="button"
          className="theme-heading flex h-10 w-10 shrink-0 items-center justify-center rounded-lg lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <BrandMark
          to="/"
          onClick={() => setOpen(false)}
          className="min-w-0 flex-1 lg:flex-none"
          titleClass="theme-heading"
          subtitleClass="theme-muted"
        />

        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={tabHref(link.tab)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 font-ui text-sm font-medium xl:px-4 xl:text-base ${
                  section === link.tab ? 'text-emerald-600' : 'theme-muted hover:opacity-100'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative z-[80] ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Link
            to="/login"
            className="theme-heading rounded-lg px-2 py-1.5 font-ui text-xs font-semibold hover:text-emerald-600 sm:px-3 sm:text-sm lg:text-base"
          >
            Login
          </Link>
          <button
            type="button"
            onClick={onSignup}
            className="rounded-lg bg-emerald-500 px-2.5 py-1.5 font-ui text-xs font-semibold text-white hover:bg-emerald-400 sm:px-4 sm:py-2 sm:text-sm lg:px-5 lg:text-base"
          >
            <span className="sm:hidden">Demo</span>
            <span className="hidden sm:inline">Book a Demo</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="theme-nav max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[color:var(--resiq-line)] px-3 pb-4 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={tabHref(link.tab)}
                  className="theme-heading block rounded-xl px-3 py-3 font-ui text-base hover:bg-[color:color-mix(in_srgb,var(--resiq-fg)_8%,transparent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

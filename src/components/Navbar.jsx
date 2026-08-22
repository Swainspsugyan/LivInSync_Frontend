import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { to: '/', hash: 'features', label: 'Features' },
  { to: '/', hash: 'modules', label: 'Modules' },
  { to: '/', hash: 'solutions', label: 'Solutions' },
  { to: '/', hash: 'about', label: 'About Us' },
]

function hrefFor(link) {
  return link.hash ? `${link.to}#${link.hash}` : link.to
}

export default function Navbar({ onSignup }) {
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

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
  }, [location.pathname])

  const isActive = (link) => section === link.hash

  const goHome = () => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 w-full transition-[background-color,color,box-shadow] duration-[400ms] ease ${
        open || !onHome || scrolled ? 'theme-nav shadow-sm' : 'bg-transparent theme-heading'
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
          onClick={goHome}
          className="min-w-0 flex-1 lg:flex-none"
          titleClass="theme-heading"
          subtitleClass="theme-muted"
        />

        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={hrefFor(link)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 font-ui text-sm font-medium xl:px-4 xl:text-base ${
                  isActive(link) ? 'text-emerald-600' : 'theme-muted hover:opacity-100'
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
                  to={hrefFor(link)}
                  onClick={() => setOpen(false)}
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

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'

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
      className={`fixed left-0 right-0 top-0 z-40 w-full transition-colors duration-300 ${
        open || !onHome || scrolled
          ? 'bg-[#05111a]/95 shadow-[0_8px_24px_rgba(5,17,26,0.35)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="flex w-full min-h-16 items-center gap-1.5 px-2 py-2 sm:min-h-[4.25rem] sm:gap-3 sm:px-4 lg:px-8 xl:px-12">
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <BrandMark to="/" onClick={goHome} className="min-w-0 flex-1 lg:flex-none" />

        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={hrefFor(link)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 font-ui text-sm font-medium xl:px-4 xl:text-base ${
                  isActive(link) ? 'text-emerald-400' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            to="/login"
            className="rounded-lg px-2 py-1.5 font-ui text-xs font-semibold text-white hover:text-emerald-400 sm:px-3 sm:text-sm lg:text-base"
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
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#05111a]/95 px-3 pb-4 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={hrefFor(link)}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-ui text-base text-white hover:bg-white/10"
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

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

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

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 w-full transition-colors duration-300 ${
        open
          ? 'bg-[#05111a]/95 backdrop-blur-md'
          : onHome && !scrolled
            ? 'bg-transparent'
            : 'bg-[#05111a]/85 backdrop-blur-md'
      }`}
    >
      <nav className="flex w-full min-h-[4.5rem] items-center gap-3 px-4 py-3 sm:px-6 lg:px-10 xl:px-16">
        <Link
          to="/"
          onClick={() => {
            setOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
        >
          <img
            src="/image_0.png"
            alt="LivinSync logo"
            className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
          />
          <span className="min-w-0">
            <span className="block truncate font-ui text-xl font-bold leading-none text-white sm:text-2xl">
              LivinSync
            </span>
            <span className="mt-1 hidden truncate text-xs font-medium tracking-wide text-slate-300 sm:block">
              Society Management System
            </span>
          </span>
        </Link>

        <ul className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={hrefFor(link)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 font-ui text-base font-medium xl:px-4 xl:text-lg ${
                  isActive(link) ? 'text-emerald-400' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto mr-32 flex shrink-0 items-center gap-2 sm:mr-48 sm:gap-3 lg:mr-64 xl:mr-80">
          <Link
            to="/login"
            className="font-ui text-base font-semibold text-white hover:text-emerald-400"
          >
            Login
          </Link>
          <button
            type="button"
            onClick={onSignup}
            className="rounded-lg bg-emerald-500 px-4 py-2.5 font-ui text-base font-semibold text-white hover:bg-emerald-400 sm:px-5"
          >
            Book a Demo
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#05111a]/95 px-4 pb-4 backdrop-blur-md lg:hidden">
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

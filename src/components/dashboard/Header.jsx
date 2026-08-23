import { Bell, ChevronDown, LogOut, Menu, Plus, Search } from 'lucide-react'
import { asset } from '../../lib/asset.js'
import { LOGO } from '../BrandMark.jsx'
import ThemeToggle from '../ThemeToggle.jsx'

export default function Header({ session, onMenu, onSignOut, profile, setProfile }) {
  return (
    <header className="flex min-w-0 items-center gap-2 px-3 py-3 sm:gap-3 sm:px-6">
      <button type="button" className="shrink-0 text-white lg:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <label className="relative min-w-0 flex-1">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
        <input
          placeholder="Search here..."
          className="w-full max-w-md rounded-full border border-white/20 bg-white/15 py-2 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/60 focus:border-white/50"
        />
      </label>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50"
        >
          <Plus size={14} />
          Add new
        </button>
        <button type="button" className="relative rounded-full bg-white/15 p-2 text-white hover:bg-white/25" aria-label="Notifications">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-300" />
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfile((v) => !v)}
            className="flex items-center gap-2 rounded-full bg-white/15 py-1 pl-1 pr-2 text-white hover:bg-white/25"
          >
            <img src={asset(LOGO)} alt="" className="h-7 w-7 rounded-full object-cover ring-1 ring-white/40" />
            <span className="hidden text-xs font-semibold sm:inline">{session.name}</span>
            <ChevronDown size={14} className="text-white/80" />
          </button>
          {profile && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#0b1b2b] p-1 shadow-lg">
              <button
                type="button"
                onClick={onSignOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

import { Bell, ChevronDown, LogOut, Menu, Search } from 'lucide-react'
import { asset } from '../../lib/asset.js'
import { LOGO } from '../BrandMark.jsx'
import ThemeToggle from '../ThemeToggle.jsx'

export default function Header({ session, onMenu, onSignOut, profile, setProfile }) {
  return (
    <header className="sticky top-0 z-20 flex min-w-0 items-center gap-2 border-b border-slate-200 bg-white/95 px-3 py-3 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-[#0b1b2b]/90 sm:gap-3 sm:px-6">
      <button
        type="button"
        className="shrink-0 rounded-md p-1.5 text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-white/10 lg:hidden"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
      <label className="relative min-w-0 flex-1">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search residents, units, or tickets..."
          className="w-full max-w-md rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/50"
        />
      </label>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          className="relative rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfile((v) => !v)}
            aria-expanded={profile}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white py-1 pl-1 pr-2 text-slate-800 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            <img src={asset(LOGO)} alt="" className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-200" />
            <span className="hidden text-xs font-semibold sm:inline">{session.name}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          {profile && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-[#0b1b2b]">
              <button
                type="button"
                onClick={onSignOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-white/90 dark:hover:bg-white/10"
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

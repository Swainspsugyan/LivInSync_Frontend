import {
  Activity,
  FileBarChart,
  FileText,
  Headphones,
  Home,
  MessageSquare,
  Shield,
  Ticket,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import BrandMark from '../BrandMark.jsx'

export const NAV_ITEMS = [
  { icon: Home, label: 'Dashboard' },
  { icon: Activity, label: 'Analytics' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: Users, label: 'Residents' },
  { icon: Ticket, label: 'Tickets' },
  { icon: UserRound, label: 'Visitors' },
  { icon: Headphones, label: 'Support' },
  { icon: FileText, label: 'Bills' },
  { icon: FileBarChart, label: 'Reports' },
  { icon: Shield, label: 'Settings' },
]

export default function Sidebar({ active, onSelect, open, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex w-[232px] flex-col bg-[#0b1b2b] pt-4 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-4 pb-5">
        <BrandMark compact className="min-w-0" titleClass="text-white" subtitleClass="text-white/55" />
        <button type="button" className="shrink-0 text-white/70 lg:hidden" onClick={onClose} aria-label="Close menu">
          <X size={18} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3">
        {NAV_ITEMS.map((item) => {
          const on = active === item.label
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelect(item.label)}
              className={`mb-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] transition-colors ${
                on
                  ? 'bg-white/10 font-semibold text-emerald-300 shadow-[inset_3px_0_0_#10b981]'
                  : 'font-medium text-white/65 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

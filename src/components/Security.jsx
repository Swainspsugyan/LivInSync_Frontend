import { Fingerprint, FileSearch, Lock, ShieldCheck, Smartphone, UserCog, Wifi } from 'lucide-react'
import { wipeSide } from '../lib/motion.js'
import Wipe from './Wipe.jsx'

const items = [
  { icon: UserCog, label: 'Role-Based Access' },
  { icon: Fingerprint, label: 'Secure Authentication' },
  { icon: ShieldCheck, label: 'Data Protection' },
  { icon: Lock, label: 'Encrypted Communication' },
  { icon: FileSearch, label: 'Audit Logs' },
  { icon: Smartphone, label: 'Device Controls' },
  { icon: Wifi, label: 'Always-On Monitoring' },
]

export default function Security() {
  return (
    <section className="section-pad">
      <div className="mx-auto w-full text-center">
        <Wipe side="header">
          <p className="eyebrow">Security you can trust</p>
          <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
            Security Built Into Every Interaction
          </h2>
        </Wipe>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:mt-12 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
          {items.map((item, i) => (
            <Wipe
              key={item.label}
              side={wipeSide(i, 2)}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--resiq-line)] bg-white/40 text-primary dark:bg-white/5">
                <item.icon size={20} />
              </div>
              <p className="theme-heading font-ui text-xs font-medium">{item.label}</p>
            </Wipe>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Fingerprint, FileSearch, Lock, ShieldCheck, Smartphone, UserCog, Wifi } from 'lucide-react'
import Reveal from './Reveal.jsx'

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
    <section className="bg-navy px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto w-full text-center">
        <Reveal>
          <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300 sm:text-[11px] sm:tracking-[0.22em]">
            Security you can trust
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Security Built Into Every Interaction
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:mt-12 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
          {items.map((item, i) => (
            <Reveal key={item.label} variant="scale" className="flex flex-col items-center gap-3 text-center" delay={i * 70}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-teal-300">
                <item.icon size={20} />
              </div>
              <p className="font-ui text-xs font-medium text-white/85">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

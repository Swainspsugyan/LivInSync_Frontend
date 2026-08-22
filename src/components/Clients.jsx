import { asset } from '../lib/asset.js'
import Reveal from './Reveal.jsx'

const clients = [
  {
    name: 'Panchamukhi Greens',
    logo: asset('panchamukhi-greens.png'),
  },
]

export default function Clients() {
  return (
    <section className="theme-surface section-pad">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Partners</p>
        <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
          Trusted by Our Clients
        </h2>
      </Reveal>
      <div className="mx-auto mt-8 flex w-full flex-wrap items-center justify-center gap-4 sm:mt-10">
        {clients.map((client, i) => (
          <Reveal
            key={client.name}
            delay={i * 80}
            className="flex items-center gap-3 rounded-2xl border border-line bg-pale px-5 py-4 shadow-sm dark:border-[#1e3344] dark:bg-[#10202c] sm:gap-4 sm:px-6"
          >
            <img
              src={client.logo}
              alt={`${client.name} logo`}
              className="h-12 w-12 rounded-full object-cover ring-1 ring-primary/20 sm:h-14 sm:w-14"
            />
            <p className="theme-heading font-ui text-lg font-semibold sm:text-xl">{client.name}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

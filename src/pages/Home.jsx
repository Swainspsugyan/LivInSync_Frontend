import { useLocation } from 'react-router-dom'
import About from '../components/About.jsx'
import Clients from '../components/Clients.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Features from '../components/Features.jsx'
import Hero from '../components/Hero.jsx'
import SectionSwitch from '../components/SectionSwitch.jsx'
import Security from '../components/Security.jsx'
import Showcase from '../components/Showcase.jsx'
import Solutions from '../components/Solutions.jsx'
import Team from '../components/Team.jsx'
import Trust from '../components/Trust.jsx'
import { viewFromLocation } from '../lib/homeView.js'

export default function Home({ onDemo, onRegister }) {
  const location = useLocation()
  const tab = viewFromLocation(location)

  return (
    <SectionSwitch targetId={tab}>
      <Hero onDemo={onDemo} onRegister={onRegister} />
      <Features />
      <Showcase />
      <Solutions />
      <Security />
      <Clients />
      <Trust />
      <About />
      <Team />
      <CtaBanner onDemo={onDemo} onRegister={onRegister} />
    </SectionSwitch>
  )
}

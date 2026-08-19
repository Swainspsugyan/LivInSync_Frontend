import About from '../components/About.jsx'
import Clients from '../components/Clients.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Features from '../components/Features.jsx'
import Hero from '../components/Hero.jsx'
import Security from '../components/Security.jsx'
import Showcase from '../components/Showcase.jsx'
import Solutions from '../components/Solutions.jsx'
import Trust from '../components/Trust.jsx'

export default function Home({ onDemo, onRegister }) {
  return (
    <>
      <Hero onDemo={onDemo} onRegister={onRegister} />
      <Features />
      <Showcase />
      <Solutions />
      <Security />
      <Clients />
      <Trust />
      <About />
      <CtaBanner onDemo={onDemo} onRegister={onRegister} />
    </>
  )
}

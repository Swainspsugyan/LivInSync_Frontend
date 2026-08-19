import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import Features from '../components/Features.jsx'
import Hero from '../components/Hero.jsx'
import Trust from '../components/Trust.jsx'

export default function Home({ onDemo, onRegister }) {
  return (
    <>
      <Hero onDemo={onDemo} onRegister={onRegister} />
      <Features />
      <About />
      <Trust />
      <Contact />
    </>
  )
}

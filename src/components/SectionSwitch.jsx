import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { panelVariants } from '../lib/motion.js'

function placeAt(id) {
  if (!id || id === 'home') {
    window.scrollTo(0, 0)
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo(0, Math.max(0, y))
}

export default function SectionSwitch({ targetId = 'home', children }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('animate')
  const pending = useRef(targetId)
  const boot = useRef(true)

  useLayoutEffect(() => {
    placeAt(targetId)
    pending.current = targetId
  }, [])

  useEffect(() => {
    if (boot.current) {
      boot.current = false
      return
    }
    if (targetId === pending.current) return
    if (reduce) {
      placeAt(targetId)
      pending.current = targetId
      return
    }

    setPhase('exit')
    const showNext = window.setTimeout(() => {
      placeAt(targetId)
      pending.current = targetId
      setPhase('animate')
    }, 450)

    return () => window.clearTimeout(showNext)
  }, [targetId, reduce])

  if (reduce) {
    return <div className="relative w-full">{children}</div>
  }

  return (
    <div className="relative w-full overflow-x-hidden">
      <motion.div
        variants={panelVariants}
        initial={false}
        animate={phase}
        className="relative w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

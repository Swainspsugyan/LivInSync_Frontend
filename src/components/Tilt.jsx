import { useRef } from 'react'

export default function Tilt({ children, className = '', max = 16 }) {
  const ref = useRef(null)
  const glareRef = useRef(null)
  const frame = useRef(0)

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.55s ease, box-shadow 0.55s ease'
    el.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)'
    el.style.boxShadow = ''
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1)
    const py = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1)
    const rx = (0.5 - py) * max
    const ry = (px - 0.5) * max
    const shadowX = (px - 0.5) * -24
    const shadowY = (py - 0.5) * -18

    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear'
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(18px)`
      el.style.boxShadow = `${shadowX}px ${shadowY + 18}px 36px rgba(11, 30, 51, 0.18)`
      if (glareRef.current) {
        glareRef.current.style.opacity = '0.85'
        glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.55), transparent 55%)`
      }
    })
  }

  return (
    <div className="h-full [perspective:900px] [transform-style:preserve-3d]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={`relative h-full transform-gpu [transform-style:preserve-3d] ${className}`}
        style={{ transform: 'rotateX(0deg) rotateY(0deg)' }}
      >
        {children}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light"
        />
      </div>
    </div>
  )
}

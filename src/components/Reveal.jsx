import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  variant = 'up',
  delay = 0,
  style,
  ...props
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        setShown(entry.isIntersecting)
      },
      { threshold: 0.16, rootMargin: '0px 0px -12% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant}${shown ? ' is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': shown ? `${delay}ms` : '0ms', ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}

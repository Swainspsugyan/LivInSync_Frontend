import { motion, useReducedMotion } from 'framer-motion'
import { itemVariants, transitionConfig, viewVariants } from '../lib/motion.js'

const variantsByName = {
  up: itemVariants,
  left: {
    initial: { opacity: 0, x: -32, filter: 'blur(6px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 30, filter: 'blur(6px)' },
  },
  right: {
    initial: { opacity: 0, x: 32, filter: 'blur(6px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 30, filter: 'blur(6px)' },
  },
  scale: viewVariants,
  fade: {
    initial: { opacity: 0, filter: 'blur(6px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(6px)' },
  },
}

export default function Reveal({
  as = 'div',
  children,
  className = '',
  variant = 'up',
  delay = 0,
  style,
  ...props
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} style={style} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      variants={variantsByName[variant] ?? itemVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ ...transitionConfig, delay: delay / 1000 }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

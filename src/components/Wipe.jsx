import { motion, useReducedMotion } from 'framer-motion'
import {
  centerWipeVariants,
  headerWipeVariants,
  leftWipeVariants,
  rightWipeVariants,
} from '../lib/motion.js'

const variantsBySide = {
  left: leftWipeVariants,
  right: rightWipeVariants,
  header: headerWipeVariants,
  center: centerWipeVariants,
}

export default function Wipe({
  side = 'center',
  as = 'div',
  children,
  className = '',
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
      variants={variantsBySide[side] ?? centerWipeVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false, amount: 0.22, margin: '0px 0px -10% 0px' }}
      transition={delay ? { delay: delay / 1000 } : undefined}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

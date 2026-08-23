import { motion } from 'framer-motion'

const inheritVariants = {
  rest: {
    transition: { duration: 0 },
  },
  animate: {
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
  exit: {
    transition: { when: 'afterChildren', duration: 0, staggerChildren: 0.03 },
  },
}

export default function Inherit({ as = 'div', className = '', children, ...props }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag className={className} variants={inheritVariants} {...props}>
      {children}
    </Tag>
  )
}

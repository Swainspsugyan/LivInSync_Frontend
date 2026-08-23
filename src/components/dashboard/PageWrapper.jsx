import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { transitionConfig, viewVariants } from '../../lib/motion.js'

export default function PageWrapper({ viewKey, children }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className="min-w-0">{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewKey}
        variants={viewVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transitionConfig}
        className="min-w-0 will-change-[opacity,transform,filter]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

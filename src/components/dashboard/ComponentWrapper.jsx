import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { itemVariants, transitionConfig } from '../../lib/motion.js'

export default function ComponentWrapper({ show = true, itemKey = 'item', children }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return show ? <div>{children}</div> : null
  }

  return (
    <AnimatePresence mode="wait">
      {show ? (
        <motion.div
          key={itemKey}
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitionConfig}
          className="will-change-[opacity,transform,filter]"
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export const viewVariants = {
  initial: { opacity: 0, scale: 0.96, filter: 'blur(10px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.94, filter: 'blur(12px)', y: 20 },
}

export const itemVariants = {
  initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: 30, filter: 'blur(6px)' },
}

export const transitionConfig = {
  duration: 0.9,
  ease: [0.4, 0, 0.2, 1],
}

export const wipeTransition = {
  duration: 0.9,
  ease: [0.4, 0, 0.2, 1],
}

const wipeEnter = {
  duration: 0.9,
  ease: [0.4, 0, 0.2, 1],
}

const wipeExit = {
  duration: 0.88,
  ease: [0.4, 0, 0.2, 1],
}

export const leftWipeVariants = {
  initial: { x: -150, opacity: 0, filter: 'blur(10px)' },
  animate: { x: 0, opacity: 1, filter: 'blur(0px)', transition: wipeEnter },
  exit: { x: -120, opacity: 0, filter: 'blur(12px)', transition: wipeExit },
}

export const rightWipeVariants = {
  initial: { x: 150, opacity: 0, filter: 'blur(10px)' },
  animate: { x: 0, opacity: 1, filter: 'blur(0px)', transition: wipeEnter },
  exit: { x: 120, opacity: 0, filter: 'blur(12px)', transition: wipeExit },
}

export const headerWipeVariants = {
  initial: { y: -40, opacity: 0, filter: 'blur(8px)' },
  animate: { y: 0, opacity: 1, filter: 'blur(0px)', transition: wipeEnter },
  exit: { y: -40, opacity: 0, filter: 'blur(8px)', transition: wipeExit },
}

export const centerWipeVariants = {
  initial: { y: 40, opacity: 0, filter: 'blur(8px)' },
  animate: { y: 0, opacity: 1, filter: 'blur(0px)', transition: wipeEnter },
  exit: { y: 40, opacity: 0, filter: 'blur(8px)', transition: wipeExit },
}

export const panelVariants = {
  initial: { opacity: 1 },
  rest: {
    opacity: 1,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      duration: 0,
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      when: 'afterChildren',
      duration: 0,
      staggerChildren: 0.03,
    },
  },
}

export function wipeSide(index, columns = 2) {
  const col = index % columns
  if (columns === 3) {
    if (col === 0) return 'left'
    if (col === 2) return 'right'
    return 'center'
  }
  return col < columns / 2 ? 'left' : 'right'
}

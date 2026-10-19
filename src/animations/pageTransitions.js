// Enhanced animations for a more polished SaaS experience
export const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: 'blur(1px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

export const staggerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
  hover: {
    y: -2,
    scale: 1.003,
    boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.99,
    transition: {
      duration: 0.12,
    },
  },
};

export const floatVariants = {
  animate: {
    y: [0, -2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const blobVariants = {
  idle: (i = 0) => ({
    scale: [1, 1.02, 1],
    rotate: [0, i % 2 === 0 ? 0.5 : -0.5, 0],
    x: [0, i % 2 === 0 ? 2 : -2, 0],
    transition: {
      duration: 12 + i * 2,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.5,
    },
  }),
};

// New subtle animations for enhanced UX
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const buttonHoverVariants = {
  hover: {
    scale: 1.004,
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.995,
    transition: {
      duration: 0.1,
    },
  },
};

export const iconFloatVariants = {
  animate: {
    y: [0, -1.5, 0],
    rotate: [0, 0.4, 0],
    transition: {
      duration: 3.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const textRevealVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
};

export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 0.995,
    filter: 'blur(0.5px)',
  },
  in: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    scale: 1.002,
    filter: 'blur(0.35px)',
  },
};

export const pageTransition = {
  type: 'tween',
  ease: [0.22, 0.61, 0.36, 1],
  duration: 0.45,
};

"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const slideUp = {
  initial: {
    y: 0,
  },
  exit: {
    y: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
}

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2 }
  }
}

export function Preloader() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  if (dimension.width === 0) {
    return null;
  }

  return (
    <motion.div 
      variants={slideUp} 
      initial="initial" 
      exit="exit" 
      className="fixed top-0 left-0 w-screen h-screen bg-primary z-50 flex items-center justify-center text-primary-foreground"
    >
      <motion.p variants={opacity} initial="initial" animate="enter" className="text-4xl font-bold">
        Ümit Akdeniz
      </motion.p>
    </motion.div>
  )
}
'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    // Lenis smooth scroll initialize
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    })

    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])
}

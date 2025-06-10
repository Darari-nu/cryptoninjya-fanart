"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  children: string
  className?: string
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className={`relative ${className}`}
      animate={
        isGlitching
          ? {
              x: [0, -2, 2, -1, 1, 0],
              filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"],
            }
          : {}
      }
      transition={{ duration: 0.2 }}
    >
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-red-500 opacity-70 -translate-x-1">{children}</span>
          <span className="absolute top-0 left-0 text-cyan-500 opacity-70 translate-x-1">{children}</span>
        </>
      )}
    </motion.div>
  )
}

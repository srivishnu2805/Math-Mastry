"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MouseTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  useEffect(() => {
    setTrail((prevTrail) => [...prevTrail, mousePosition].slice(-5))
  }, [mousePosition])

  return (
    <>
      {trail.map((position, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-purple-500"
          style={{
            left: position.x - 4,
            top: position.y - 4,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.3,
          }}
        />
      ))}
    </>
  )
}


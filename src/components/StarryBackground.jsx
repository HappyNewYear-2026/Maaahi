"use client"

import { memo, useEffect, useState } from "react"
import { motion } from "framer-motion"

const StarryBackground = memo(function StarryBackground() {
  const [stars, setStars] = useState([])
  const [shootingStars, setShootingStars] = useState([])

  useEffect(() => {
    const starArray = [...Array(140)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.2 + 0.8,
      duration: Math.random() * 3.5 + 2.2,
      delay: Math.random() * 4,
      glow: Math.random() * 10 + 6,
    }))
    setStars(starArray)
  }, [])

  useEffect(() => {
    let nextId = 0

    const spawnShootingStar = () => {
      const star = {
        id: nextId++,
        left: Math.random() * 90,
        top: Math.random() * 45,
        length: Math.random() * 130 + 120,
        angle: Math.random() * 14 + 24,
        duration: Math.random() * 0.7 + 0.9,
        travel: Math.random() * 260 + 260,
      }

      setShootingStars((prev) => [...prev, star])
    }

    spawnShootingStar()
    const interval = setInterval(spawnShootingStar, 1400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% -10%, rgba(40, 46, 92, 0.32) 0%, rgba(3, 5, 18, 0.94) 60%, rgba(2, 3, 12, 1) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute inset-0"
      >
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{ left: `${star.left}%`, top: `${star.top}%` }}
            animate={{ opacity: [0.25, 0.95, 0.25], scale: [0.85, 1.3, 0.85] }}
            initial={{ opacity: 0 }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          >
            <span
              className="block rounded-full bg-white"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: `0 0 ${star.glow}px rgba(255,255,255,0.85)`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute inset-0"
      >
        {shootingStars.map((shootingStar) => (
          <motion.div
            key={`shooting-star-${shootingStar.id}`}
            className="absolute rounded-full"
            style={{
              left: `${shootingStar.left}%`,
              top: `${shootingStar.top}%`,
              width: `${shootingStar.length}px`,
              height: "2px",
              transform: `rotate(${shootingStar.angle}deg)`,
              transformOrigin: "left center",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0) 100%)",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.85))",
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, shootingStar.travel],
              y: [0, shootingStar.travel * 0.62],
            }}
            transition={{ duration: shootingStar.duration, ease: "easeOut" }}
            onAnimationComplete={() => {
              setShootingStars((prev) => prev.filter((item) => item.id !== shootingStar.id))
            }}
          />
        ))}
      </motion.div>
    </div>
  )
})

export default StarryBackground

"use client"

import { memo, useEffect, useState } from "react"
import { motion } from "framer-motion"

const StarryBackground = memo(function StarryBackground() {
  const [stars, setStars] = useState([])
  const [hearts, setHearts] = useState([])
  const [shootingStars, setShootingStars] = useState([])

  useEffect(() => {
    const starArray = [...Array(80)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }))
    setStars(starArray)
  }, [])

  useEffect(() => {
    const heartArray = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      fontSize: Math.random() * 10 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
    setHearts(heartArray)
  }, [])

  useEffect(() => {
    const shootingStarArray = [...Array(10)].map(() => ({
      left: Math.random() * 120 - 20,
      top: Math.random() * 55,
      length: Math.random() * 120 + 80,
      angle: Math.random() * 12 + 28,
      duration: Math.random() * 1.2 + 1,
      delay: Math.random() * 8,
      repeatDelay: Math.random() * 6 + 5,
    }))
    setShootingStars(shootingStarArray)
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
        transition={{ delay: 1 }}
        className="absolute inset-0"
      >
        {stars.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute h-0.5 w-0.5 rounded-full bg-white"
            style={{ left: `${star.left}%`, top: `${star.top}%` }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.5, 1, 0.5] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-0"
      >
        {hearts.map((heart, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-pink-300/50"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              fontSize: `${heart.fontSize}px`,
            }}
            animate={{
              y: [-20, -60],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180],
            }}
            transition={{ duration: heart.duration, repeat: Infinity, delay: heart.delay }}
          >
            {"\u2764"}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute inset-0"
      >
        {shootingStars.map((shootingStar, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${shootingStar.left}%`,
              top: `${shootingStar.top}%`,
              width: `${shootingStar.length}px`,
              height: "2px",
              transform: `rotate(${shootingStar.angle}deg)`,
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)",
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.65))",
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], x: [0, 260], y: [0, 260] }}
            transition={{
              duration: shootingStar.duration,
              ease: "easeOut",
              repeat: Infinity,
              delay: shootingStar.delay,
              repeatDelay: shootingStar.repeatDelay,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
})

export default StarryBackground

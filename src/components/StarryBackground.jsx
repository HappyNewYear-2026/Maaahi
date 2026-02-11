"use client"

import { memo, useEffect, useState } from "react"
import { motion } from "framer-motion"

const StarryBackground = memo(function StarryBackground() {
  const [stars, setStars] = useState([])
  const [hearts, setHearts] = useState([])

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

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
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
    </div>
  )
})

export default StarryBackground

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const BALLOONS = ["🎈", "🎈", "🎈"]

export default function Game({ setCurrentPage }) {
  const [balloons, setBalloons] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      popped: false,
      emoji: BALLOONS[i % BALLOONS.length],
    }))
  )

  const popBalloon = (id) => {
    const updated = balloons.map((b) =>
      b.id === id ? { ...b, popped: true } : b
    )
    setBalloons(updated)

    if (updated.every((b) => b.popped)) {
      setTimeout(() => {
        setCurrentPage("diary")
      }, 900)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center select-none">
      <h1 className="text-3xl md:text-4xl text-pink-300 mb-8">
        Oye Motki....🤭<br />
        Pop all the balloons 🎈
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <AnimatePresence>
          {balloons.map(
            (balloon) =>
              !balloon.popped && (
                <motion.span
                  key={balloon.id}
                  onClick={() => popBalloon(balloon.id)}
                  className="cursor-pointer text-6xl md:text-7xl"
                  initial={{ scale: 0, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{
                    scale: 1.8,
                    opacity: 0,
                    rotate: 20,
                  }}
                  transition={{ duration: 0.35 }}
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.15 }}
                >
                  {balloon.emoji}
                </motion.span>
              )
          )}
        </AnimatePresence>
      </div>

      <p className="mt-10 text-purple-200 text-sm md:text-base">
        Pop every balloon to unlock something special 💖<br />
      </p>
    </div>
  )
}


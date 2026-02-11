"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const COLORS = ["bg-pink-400", "bg-purple-400", "bg-blue-400", "bg-yellow-400", "bg-green-400"]

export default function Game({ setCurrentPage }) {
  const [balloons, setBalloons] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      popped: false,
      color: COLORS[i % COLORS.length],
    }))
  )

  const popBalloon = (id) => {
    const updated = balloons.map((b) =>
      b.id === id ? { ...b, popped: true } : b
    )
    setBalloons(updated)

    const allPopped = updated.every((b) => b.popped)
    if (allPopped) {
      setTimeout(() => {
        setCurrentPage("diary")
      }, 800)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl text-pink-300 mb-8">
        Pop all the balloons 🎈
      </h1>

      <div className="grid grid-cols-3 gap-6 max-w-xs">
        {balloons.map(
          (balloon) =>
            !balloon.popped && (
              <motion.div
                key={balloon.id}
                onClick={() => popBalloon(balloon.id)}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`w-20 h-28 rounded-full cursor-pointer shadow-lg ${balloon.color}`}
              />
            )
        )}
      </div>

      <p className="mt-10 text-purple-200">
        A small game before something special 💖
      </p>
    </div>
  )
}

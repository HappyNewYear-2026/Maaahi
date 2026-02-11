"use client"

import { useEffect, useRef } from "react"

export default function MusicPlayer() {
  const audioRef = useRef(null)

  useEffect(() => {
    // ▶️ Play music (called after user interaction)
    window.playBackgroundMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.6
        audioRef.current.play().catch(() => {})
      }
    }

    // ⏹ Stop music (called on 💌 click)
    window.stopBackgroundMusic = () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  return (
    <audio ref={audioRef} loop preload="auto">
      <source src="/music/birthday.mp3" type="audio/mpeg" />
    </audio>
  )
}

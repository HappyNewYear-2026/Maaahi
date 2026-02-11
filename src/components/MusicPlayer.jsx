"use client"

import { useEffect, useRef } from "react"

export default function MusicPlayer() {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6
      audioRef.current.play().catch(() => {})
    }

    // 🌍 Expose global stop function
    window.stopBackgroundMusic = () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  return (
    <audio ref={audioRef} loop>
      <source src="/music/birthday.mp3" type="audio/mpeg" />
    </audio>
  )
}

"use client"

import { useEffect, useRef } from "react"

export default function StarryBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const stars = []
    const shootingStars = []

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5
        this.alpha = Math.random()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`
        ctx.fill()
      }
    }

    class ShootingStar {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height * 0.4
        this.length = Math.random() * 120 + 50
        this.speed = Math.random() * 15 + 10
        this.opacity = 1
      }
      update() {
        this.x += this.speed
        this.y += this.speed
        this.opacity -= 0.02
      }
      draw() {
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x - this.length, this.y - this.length)
        ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`
        ctx.lineWidth = 2
        ctx.shadowBlur = 20
        ctx.shadowColor = "white"
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    for (let i = 0; i < 300; i++) {
      stars.push(new Star())
    }

    let animationFrameId

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => star.draw())

      if (Math.random() < 0.03) {
        shootingStars.push(new ShootingStar())
      }

      shootingStars.forEach((star, index) => {
        star.update()
        star.draw()
        if (star.opacity <= 0) shootingStars.splice(index, 1)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
    />
  )
}

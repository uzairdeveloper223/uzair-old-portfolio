"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  base: { x: number; y: number }
  color: string
  reset: (rand?: boolean) => void
  step: () => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

export default function ParticleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const mouse = { x: W / 2, y: H / 2, radius: 120, force: 0.8 }
    const particles: Particle[] = []
    const BASE = Math.min(70, Math.floor((W * H) / 24000))

    class ParticleClass implements Particle {
      x = 0
      y = 0
      vx = 0
      vy = 0
      size = 0
      base: { x: number; y: number } = { x: 0, y: 0 }
      color = ""

      constructor() {
        this.reset(true)
      }

      reset(rand?: boolean) {
        this.x = Math.random() * W
        this.y = Math.random() * H
        const a = Math.random() * Math.PI * 2
        const s = Math.random() * 0.6 + 0.2
        this.vx = Math.cos(a) * s
        this.vy = Math.sin(a) * s
        this.size = Math.random() * 2 + 0.8
        this.base = { x: this.x, y: this.y }
        this.color = `rgba(0,255,157,${0.35 + Math.random() * 0.4})`
      }

      step() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const d = Math.hypot(dx, dy) || 1

        if (d < mouse.radius) {
          const f = (1 - d / mouse.radius) * mouse.force
          this.vx += (-dx / d) * f
          this.vy += (-dy / d) * f
        }

        this.vx += (this.base.x - this.x) * 0.0008
        this.vy += (this.base.y - this.y) * 0.0008
        this.vx *= 0.985
        this.vy *= 0.985
        this.x += this.vx
        this.y += this.vy

        if (this.x < -5 || this.x > W + 5 || this.y < -5 || this.y > H + 5) {
          this.reset()
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const spawn = (n: number) => {
      for (let i = 0; i < n; i++) {
        particles.push(new ParticleClass())
      }
    }

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = dx * dx + dy * dy

          if (d < 75 * 75) {
            const alpha = 0.08 * (1 - d / (75 * 75))
            ctx.strokeStyle = `rgba(0,255,157,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.step()
        p.draw(ctx)
      }
      connect()
      requestAnimationFrame(loop)
    }

    const handleResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const burst = (x: number, y: number) => {
      for (let i = 0; i < 18; i++) {
        const p = new ParticleClass()
        p.x = x
        p.y = y
        const a = Math.random() * Math.PI * 2
        const s = Math.random() * 3 + 1.5
        p.vx = Math.cos(a) * s
        p.vy = Math.sin(a) * s
        p.size = Math.random() * 2 + 1.2
        particles.push(p)
      }
      if (particles.length > BASE + 120) {
        particles.splice(0, particles.length - (BASE + 120))
      }
    }

    // Make burst function globally accessible
    ;(window as any).particleBurst = burst

    // Hover burst effect for elements with hover-burst class
    const handleHoverBurst = () => {
      document.querySelectorAll('.hover-burst').forEach((el) => {
        const handleMouseEnter = () => {
          mouse.radius = 170
          mouse.force = 1.2
          burst(mouse.x, mouse.y)
        }
        const handleMouseLeave = () => {
          mouse.radius = 120
          mouse.force = 0.8
        }
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Set up hover burst effects after a short delay to ensure DOM is ready
    setTimeout(handleHoverBurst, 100)

    spawn(BASE)
    loop()

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      delete (window as any).particleBurst
    }
  }, [])

  return <canvas ref={canvasRef} id="particles" />
}

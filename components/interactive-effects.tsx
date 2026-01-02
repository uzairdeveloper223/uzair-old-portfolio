"use client"

import { useEffect, useState } from "react"
import AsteroidHunter from "./asteroid-hunter"

export default function InteractiveEffects() {
  const [showAsteroidHunter, setShowAsteroidHunter] = useState(false)
  useEffect(() => {
    // Intersection Observer for reveal animations
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el))

    // Tilt effect
    document.querySelectorAll(".tilt").forEach((card) => {
      const handleMouseMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6
        ;(card as HTMLElement).style.setProperty("--rx", rx + "deg")
        ;(card as HTMLElement).style.setProperty("--ry", ry + "deg")
      }

      const handleMouseLeave = () => {
        ;(card as HTMLElement).style.setProperty("--rx", "0deg")
        ;(card as HTMLElement).style.setProperty("--ry", "0deg")
      }

      card.addEventListener("mousemove", handleMouseMove)
      card.addEventListener("mouseleave", handleMouseLeave)
    })

    // Matrix effect setup
    const mtx = document.getElementById('matrix') as HTMLCanvasElement
    if (!mtx) return

    const mctx = mtx.getContext('2d')!
    let MOn = false
    let drops: number[] = []

    function resizeM() {
      mtx.width = window.innerWidth
      mtx.height = window.innerHeight
    }
    resizeM()
    window.addEventListener('resize', resizeM)

    function matrixTick() {
      if (!MOn) return requestAnimationFrame(matrixTick)
      
      mctx.fillStyle = 'rgba(0,0,0,0.08)'
      mctx.fillRect(0, 0, mtx.width, mtx.height)
      mctx.fillStyle = '#00ff9d'
      mctx.font = '14px monospace'
      
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30 + Math.floor(Math.random() * 10))
        mctx.fillText(text, i * 14, drops[i] * 14)
        if (drops[i] * 14 > mtx.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      requestAnimationFrame(matrixTick)
    }

    function startMatrix() {
      drops = Array(Math.floor(mtx.width / 28)).fill(1)
      if (!MOn) {
        MOn = true
        matrixTick()
        document.body.classList.add('matrix-on')
      }
    }

    function stopMatrix() {
      MOn = false
      mctx.clearRect(0, 0, mtx.width, mtx.height)
      document.body.classList.remove('matrix-on')
    }

    // Easter eggs
    let buffer = ""
    const KONAMI = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ]
    let kIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      buffer += e.key.toUpperCase()
      if (buffer.length > 12) buffer = buffer.slice(-12)

      if (buffer.includes("UZAIR")) {
        // Launch asteroid hunter game
        setShowAsteroidHunter(true)
        toast("🚀 Asteroid Hunter Activated! 🎮")
        buffer = ""
      }

      if (e.key === KONAMI[kIndex] || e.key.toLowerCase() === KONAMI[kIndex]) {
        kIndex++
        if (kIndex === KONAMI.length) {
          kIndex = 0
          if (MOn) {
            stopMatrix()
            toast('Hacker Mode: OFF')
          } else {
            startMatrix()
            toast('Hacker Mode: ON')
          }
        }
      } else {
        if (e.key !== "Shift") kIndex = 0
      }
    }

    const toast = (msg: string) => {
      const t = document.createElement("div")
      t.textContent = msg
      t.className =
        "fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-panel border border-neon/40 text-neon shadow-neon z-50"
      document.body.appendChild(t)

      setTimeout(() => {
        t.style.transition = "opacity .6s"
        t.style.opacity = "0"
        setTimeout(() => t.remove(), 600)
      }, 1400)
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener('resize', resizeM)
    }
  }, [])

  return (
    <>
      <canvas id="matrix" className="fixed inset-0 pointer-events-none z-[-1] mix-blend-screen" />
      <AsteroidHunter 
        isActive={showAsteroidHunter} 
        onClose={() => setShowAsteroidHunter(false)} 
      />
    </>
  )
}

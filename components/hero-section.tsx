"use client"

import { Github, Rocket, MapPin, Terminal } from "lucide-react"
import { useEffect, useRef } from "react"

export default function HeroSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    let g = 0
    const drawGrid = () => {
      const size = 36
      const dpr = devicePixelRatio || 1
      const w = 460
      const h = 460

      const canvas = document.createElement("canvas")
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = "100%"
      canvas.style.height = "100%"

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = "rgba(0,255,157,.12)"

      for (let x = 0; x < w; x += size) {
        for (let y = 0; y < h; y += size) {
          ctx.strokeRect(x + Math.sin((x + y + g) / 40) * 2, y + Math.cos((x - y + g) / 40) * 2, size, size)
        }
      }

      grid.innerHTML = ""
      grid.appendChild(canvas)
      g += 1
      requestAnimationFrame(drawGrid)
    }

    drawGrid()
  }, [])

  return (
    <section id="home" className="relative pt-20 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div className="reveal">
          <h1
            data-text="UzairDeveloper"
            className="glitch font-display text-4xl md:text-6xl font-bold leading-tight"
          >
            Uzair<span className="text-neon">Developer</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Full-Stack Developer & Blockchain Enthusiast — Azad Jammu and Kashmir (AJK)
          </p>
          <p className="mt-4 text-gray-400 max-w-2xl">
            Passionate Full‑Stack Developer with a love for programming and gaming. I craft UI/UX, scalable backends,
            web/mobile apps, and Ethereum‑based dApps.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://github.com/uzairdeveloper223"
              target="_blank"
              className="hover-burst inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-panel border border-line hover:border-neon hover:shadow-neon transition"
              rel="noreferrer"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="#websites"
              className="hover-burst inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neon/10 border border-neon text-neon hover:text-white hover:bg-neon/20 hover:shadow-neon-strong transition"
            >
              <Rocket className="w-4 h-4" />
              View Projects
            </a>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            Emails: <span className="is-a-dev-email">contact@uzair.is-a.dev</span> ·{" "}
            <span className="link-underline">uzairdeveloper@proton.me</span> ·{" "}
            <span className="link-underline">uzairdeveloper@hotmail.com</span> ·{" "}
            <span className="link-underline">uzairdeveloper@atomicmail.io</span> ·{" "}
            <span className="link-underline">developer.uzair223@gmail.com</span>
          </div>
        </div>

        <div className="reveal md:justify-self-end">
          <div className="tilt relative w-full md:w-[460px] aspect-square rounded-3xl bg-gradient-to-br from-panel to-bg border border-line overflow-hidden">
            <div className="absolute inset-0 opacity-60" ref={gridRef}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-gray-400">Title</div>
                <div className="font-display text-2xl">Full‑Stack & Blockchain</div>
                <div className="mt-4 flex justify-center gap-4 text-gray-400">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    AJK
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Linux
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -inset-1 rounded-3xl ring-1 ring-neon/20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

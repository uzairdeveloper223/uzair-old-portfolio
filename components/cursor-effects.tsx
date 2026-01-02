"use client"

import { useEffect } from "react"

export default function CursorEffects() {
  useEffect(() => {
    const ring = document.getElementById("cursorRing")
    const dot = document.getElementById("cursorDot")

    if (!ring || !dot) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let tx = mx
    let ty = my

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const animateCursor = () => {
      tx += (mx - tx) * 0.18
      ty += (my - ty) * 0.18

      ring.style.left = tx + "px"
      ring.style.top = ty + "px"
      dot.style.left = mx + "px"
      dot.style.top = my + "px"

      requestAnimationFrame(animateCursor)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animateCursor()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <div id="cursorDot" className="cursor-dot"></div>
      <div id="cursorRing" className="cursor-ring"></div>
    </>
  )
}

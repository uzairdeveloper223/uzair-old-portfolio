"use client"

import { useEffect, useRef, useState } from "react"

interface AsteroidHunterProps {
  isActive: boolean
  onClose: () => void
}

interface GameObject {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  rotationSpeed: number
}

interface Asteroid extends GameObject {
  destroyed: boolean
  vertices: { x: number; y: number }[]
  color: string
  glowIntensity: number
}

interface Bullet extends GameObject {
  life: number
  trail: { x: number; y: number; alpha: number }[]
}

interface Player extends GameObject {
  thrust: boolean
  angle: number
  invulnerable: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

export default function AsteroidHunter({ isActive, onClose }: AsteroidHunterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [lives, setLives] = useState(3)
  const [isOpening, setIsOpening] = useState(true)
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
      setIsOpening(true)
    }, 500)
  }

  useEffect(() => {
    if (isActive && isOpening) {
      setTimeout(() => setIsOpening(false), 800)
    }
  }, [isActive, isOpening])

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    let animationId: number
    let gameRunning = true
    let screenShake = { x: 0, y: 0, intensity: 0 }

    // Game objects
    const player: Player = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: 0,
      vy: 0,
      size: 8,
      rotation: 0,
      rotationSpeed: 0,
      thrust: false,
      angle: 0,
      invulnerable: 0,
    }

    const asteroids: Asteroid[] = []
    const bullets: Bullet[] = []
    const particles: Particle[] = []
    const keys: { [key: string]: boolean } = {}

    // Create random asteroid vertices
    const createAsteroidVertices = (size: number) => {
      const vertices: { x: number; y: number }[] = []
      const sides = 8 + Math.floor(Math.random() * 4)
      
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2
        const radius = size * (0.7 + Math.random() * 0.6)
        vertices.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        })
      }
      return vertices
    }

    // Initialize asteroids
    const createAsteroid = (x?: number, y?: number, size?: number) => {
      const asteroidSize = size ?? 20 + Math.random() * 30
      const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"]
      
      const asteroid: Asteroid = {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: asteroidSize,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        destroyed: false,
        vertices: createAsteroidVertices(asteroidSize),
        color: colors[Math.floor(Math.random() * colors.length)],
        glowIntensity: 0.3 + Math.random() * 0.7,
      }
      
      // Ensure asteroid doesn't spawn too close to player
      if (!x && !y) {
        const dx = asteroid.x - player.x
        const dy = asteroid.y - player.y
        if (Math.hypot(dx, dy) < 100) {
          asteroid.x = Math.random() * canvas.width
          asteroid.y = Math.random() * canvas.height
        }
      }
      
      return asteroid
    }

    // Create explosion particles
    const createExplosion = (x: number, y: number, size: number, color: string) => {
      const particleCount = Math.floor(size / 5) + 3
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
        const speed = 2 + Math.random() * 4
        
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30 + Math.random() * 20,
          maxLife: 30 + Math.random() * 20,
          size: 1 + Math.random() * 3,
          color,
        })
      }
      
      // Screen shake (increased intensity)
      screenShake.intensity = Math.min(size / 3, 20)
    }

    // Create initial asteroids
    for (let i = 0; i < 5; i++) {
      asteroids.push(createAsteroid())
    }

    // Create opening particle burst
    const createOpeningBurst = () => {
      const colors = ["#00ff9d", "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"]
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      for (let i = 0; i < 25; i++) {
        const angle = (Math.PI * 2 * i) / 25 + Math.random() * 0.3
        const speed = 3 + Math.random() * 6
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 60 + Math.random() * 40,
          maxLife: 60 + Math.random() * 40,
          size: 2 + Math.random() * 4,
          color,
        })
      }
      
      // Initial screen shake for dramatic effect
      screenShake.intensity = 15
    }

    // Trigger opening burst after a short delay
    setTimeout(createOpeningBurst, 200)

    // Input handling
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true
      if (e.key === " ") {
        e.preventDefault()
        // Shoot bullet
        const bullet: Bullet = {
          x: player.x + Math.cos(player.angle) * player.size,
          y: player.y + Math.sin(player.angle) * player.size,
          vx: Math.cos(player.angle) * 10,
          vy: Math.sin(player.angle) * 10,
          size: 2,
          rotation: 0,
          rotationSpeed: 0,
          life: 80,
          trail: [],
        }
        bullets.push(bullet)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false
    }

    // Collision detection
    const checkCollision = (obj1: GameObject, obj2: GameObject) => {
      const dx = obj1.x - obj2.x
      const dy = obj1.y - obj2.y
      const distance = Math.hypot(dx, dy)
      return distance < obj1.size + obj2.size
    }

    // Wrap around screen
    const wrapPosition = (obj: GameObject) => {
      if (obj.x < 0) obj.x = canvas.width
      if (obj.x > canvas.width) obj.x = 0
      if (obj.y < 0) obj.y = canvas.height
      if (obj.y > canvas.height) obj.y = 0
    }

    // Update screen shake
    const updateScreenShake = () => {
      if (screenShake.intensity > 0) {
        screenShake.x = (Math.random() - 0.5) * screenShake.intensity
        screenShake.y = (Math.random() - 0.5) * screenShake.intensity
        screenShake.intensity *= 0.9
        
        if (screenShake.intensity < 0.1) {
          screenShake.intensity = 0
          screenShake.x = 0
          screenShake.y = 0
        }
      }
    }

    // Game loop
    const gameLoop = () => {
      if (!gameRunning) return

      updateScreenShake()

      // Apply screen shake
      ctx.save()
      ctx.translate(screenShake.x, screenShake.y)

      // Clear canvas with trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Player input
      if (keys["a"] || keys["arrowleft"]) player.angle -= 0.15
      if (keys["d"] || keys["arrowright"]) player.angle += 0.15
      if (keys["w"] || keys["arrowup"]) {
        player.thrust = true
        player.vx += Math.cos(player.angle) * 0.3
        player.vy += Math.sin(player.angle) * 0.3
        
        // Thrust particles
        for (let i = 0; i < 1; i++) {
          particles.push({
            x: player.x - Math.cos(player.angle) * player.size,
            y: player.y - Math.sin(player.angle) * player.size,
            vx: -Math.cos(player.angle) * 3 + (Math.random() - 0.5) * 2,
            vy: -Math.sin(player.angle) * 3 + (Math.random() - 0.5) * 2,
            life: 15,
            maxLife: 15,
            size: 1 + Math.random() * 2,
            color: "#ff6b6b",
          })
        }
      } else {
        player.thrust = false
      }

      // Apply friction
      player.vx *= 0.99
      player.vy *= 0.99

      // Update player position
      player.x += player.vx
      player.y += player.vy
      wrapPosition(player)

      // Update invulnerability
      if (player.invulnerable > 0) player.invulnerable--

      // Draw player with glow
      ctx.save()
      ctx.translate(player.x, player.y)
      ctx.rotate(player.angle)
      
      // Player glow
      ctx.shadowColor = "#00ff9d"
      ctx.shadowBlur = 10
      
      // Flicker when invulnerable
      if (player.invulnerable === 0 || Math.floor(player.invulnerable / 5) % 2 === 0) {
        ctx.strokeStyle = "#00ff9d"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(player.size, 0)
        ctx.lineTo(-player.size, -player.size / 2)
        ctx.lineTo(-player.size / 2, 0)
        ctx.lineTo(-player.size, player.size / 2)
        ctx.closePath()
        ctx.stroke()
      }

      // Draw thrust with glow
      if (player.thrust) {
        ctx.shadowColor = "#ff6b6b"
        ctx.shadowBlur = 15
        ctx.strokeStyle = "#ff6b6b"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(-player.size, -3)
        ctx.lineTo(-player.size * 1.8, 0)
        ctx.lineTo(-player.size, 3)
        ctx.stroke()
      }
      ctx.restore()

      // Update bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i]
        
        // Add to trail
        bullet.trail.push({ x: bullet.x, y: bullet.y, alpha: 1 })
        if (bullet.trail.length > 8) bullet.trail.shift()
        
        // Update trail alpha
        bullet.trail.forEach((point, index) => {
          point.alpha = index / bullet.trail.length
        })
        
        bullet.x += bullet.vx
        bullet.y += bullet.vy
        bullet.life--

        wrapPosition(bullet)

        // Draw bullet trail
        for (let j = 0; j < bullet.trail.length - 1; j++) {
          const current = bullet.trail[j]
          const next = bullet.trail[j + 1]
          
          ctx.strokeStyle = `rgba(0, 255, 157, ${current.alpha * 0.5})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(current.x, current.y)
          ctx.lineTo(next.x, next.y)
          ctx.stroke()
        }

        // Draw bullet with glow
        ctx.save()
        ctx.shadowColor = "#00ff9d"
        ctx.shadowBlur = 8
        ctx.fillStyle = "#00ff9d"
        ctx.beginPath()
        ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Remove old bullets
        if (bullet.life <= 0) {
          bullets.splice(i, 1)
        }
      }

      // Update asteroids
      for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i]
        if (asteroid.destroyed) continue

        asteroid.x += asteroid.vx
        asteroid.y += asteroid.vy
        asteroid.rotation += asteroid.rotationSpeed
        wrapPosition(asteroid)

        // Draw asteroid with glow and improved visuals
        ctx.save()
        ctx.translate(asteroid.x, asteroid.y)
        ctx.rotate(asteroid.rotation)
        
        // Asteroid glow
        ctx.shadowColor = asteroid.color
        ctx.shadowBlur = 15 * asteroid.glowIntensity
        
        // Draw asteroid body
        ctx.strokeStyle = asteroid.color
        ctx.fillStyle = asteroid.color + "20"
        ctx.lineWidth = 2
        ctx.beginPath()
        
        for (let j = 0; j < asteroid.vertices.length; j++) {
          const vertex = asteroid.vertices[j]
          if (j === 0) ctx.moveTo(vertex.x, vertex.y)
          else ctx.lineTo(vertex.x, vertex.y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        
        // Add some surface details
        ctx.strokeStyle = asteroid.color + "60"
        ctx.lineWidth = 1
        for (let j = 0; j < 3; j++) {
          const angle = (j / 3) * Math.PI * 2 + asteroid.rotation
          const startRadius = asteroid.size * 0.3
          const endRadius = asteroid.size * 0.7
          ctx.beginPath()
          ctx.moveTo(Math.cos(angle) * startRadius, Math.sin(angle) * startRadius)
          ctx.lineTo(Math.cos(angle) * endRadius, Math.sin(angle) * endRadius)
          ctx.stroke()
        }
        
        ctx.restore()

        // Check bullet collisions
        for (let j = bullets.length - 1; j >= 0; j--) {
          const bullet = bullets[j]
          if (checkCollision(bullet, asteroid)) {
            // Create explosion
            createExplosion(asteroid.x, asteroid.y, asteroid.size, asteroid.color)
            
            // Destroy asteroid
            asteroid.destroyed = true
            bullets.splice(j, 1)
            setScore(prev => prev + Math.floor(asteroid.size))

            // Split large asteroids
            if (asteroid.size > 15) {
              for (let k = 0; k < 2; k++) {
                asteroids.push(createAsteroid(
                  asteroid.x + (Math.random() - 0.5) * 40,
                  asteroid.y + (Math.random() - 0.5) * 40,
                  asteroid.size * 0.6
                ))
              }
            }
            break
          }
        }

        // Check player collision
        if (player.invulnerable === 0 && checkCollision(player, asteroid)) {
          // Create explosion
          createExplosion(player.x, player.y, 30, "#ff6b6b")
          
          setLives(prev => {
            const newLives = prev - 1
            if (newLives <= 0) {
              setGameOver(true)
              gameRunning = false
            }
            return newLives
          })
          
          // Reset player position and make invulnerable
          player.x = canvas.width / 2
          player.y = canvas.height / 2
          player.vx = 0
          player.vy = 0
          player.invulnerable = 120
          
          // Remove nearby asteroids
          asteroids.forEach(ast => {
            const dx = ast.x - player.x
            const dy = ast.y - player.y
            if (Math.hypot(dx, dy) < 100) {
              ast.destroyed = true
            }
          })
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--
        particle.vx *= 0.98
        particle.vy *= 0.98

        // Draw particle
        const alpha = particle.life / particle.maxLife
        const radius = Math.max(0.1, particle.size * alpha) // Ensure radius is never negative
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 5
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        if (particle.life <= 0) {
          particles.splice(i, 1)
        }
      }

      // Remove destroyed asteroids
      for (let i = asteroids.length - 1; i >= 0; i--) {
        if (asteroids[i].destroyed) {
          asteroids.splice(i, 1)
        }
      }

      // Spawn new asteroids if needed
      if (asteroids.length < 3) {
        asteroids.push(createAsteroid())
      }

      ctx.restore()
      animationId = requestAnimationFrame(gameLoop)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    gameLoop()

    return () => {
      gameRunning = false
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div 
      className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-500 ${
        isOpening ? 'opacity-0 scale-95' : isClosing ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      <div 
        className={`bg-panel border border-neon/40 rounded-2xl p-6 max-w-4xl w-full mx-4 transition-all duration-800 ${
          isOpening ? 'transform rotate-12 scale-75 opacity-0' : isClosing ? 'transform -rotate-12 scale-125 opacity-0' : 'transform rotate-0 scale-100 opacity-100'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-6 text-neon font-display">
            <span className="animate-pulse">Score: {score}</span>
            <span className={`transition-colors ${lives <= 1 ? 'text-red-400 animate-pulse' : ''}`}>
              Lives: {lives}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-xl font-bold hover:rotate-90 transition-all duration-300"
          >
            ×
          </button>
        </div>

        {gameOver ? (
          <div className="text-center py-20 animate-fade-in">
            <h2 className="text-4xl font-display text-neon mb-4 animate-bounce">Game Over!</h2>
            <p className="text-xl text-gray-300 mb-6">Final Score: {score}</p>
            <button
              onClick={() => {
                setScore(0)
                setLives(3)
                setGameOver(false)
              }}
              className="px-6 py-3 bg-neon/20 border border-neon text-neon rounded-xl hover:bg-neon/30 hover:scale-105 transition-all duration-300"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              className="w-full border border-line/40 rounded-xl bg-black shadow-2xl"
              style={{ maxHeight: "60vh" }}
            />
            <div className="mt-4 text-sm text-gray-400 text-center animate-pulse">
              Use WASD or Arrow Keys to move • Spacebar to shoot • Destroy asteroids to score!
            </div>
          </>
        )}
      </div>
    </div>
  )
}
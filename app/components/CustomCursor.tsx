'use client'
import { useEffect, useRef } from 'react'

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number;
  hue: number; sat: number; light: number; glow: number;
}

const lerp = (a: number, b: number, n: number) => a + (b - a) * n

export default function MagicWandCursor() {
  const wandRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const pos = useRef({ x: 0, y: 0 })
  const vel = useRef({ x: 0, y: 0 })
  const particles = useRef<Particle[]>([])
  const pool = useRef<Particle[]>([])
  const rafId = useRef<number | null>(null)

  const palette = [
    { h: 50, s: 100, l: 50, glow: 0.9 },
    { h: 48, s: 95,  l: 75, glow: 0.6 },
    { h: 43, s: 80,  l: 82, glow: 0.5 },
    { h: 0,  s: 0,   l: 100, glow: 1.0 },
  ]

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (prefersReduced || isTouch) return

    document.documentElement.style.cursor = 'none'

    const cvs = canvasRef.current!
    const ctx = cvs.getContext('2d')!

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      cvs.width = Math.floor(w * dpr)
      cvs.height = Math.floor(h * dpr)
      cvs.style.width = `${w}px`
      cvs.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 600; i++) pool.current.push(makeParticle(0, 0))

    let mouseX = 0, mouseY = 0, isMoving = false, lastMoveTime = 0
    let angle = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMoving = true
      lastMoveTime = performance.now()
    }

    const onLeave = () => {
      isMoving = false
    }

    const onDown = () => {
      burst(pos.current.x, pos.current.y, 80)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('mousedown', onDown)

    const tick = () => {
      vel.current.x = mouseX - pos.current.x
      vel.current.y = mouseY - pos.current.y
      
      pos.current.x = lerp(pos.current.x, mouseX, 0.15)
      pos.current.y = lerp(pos.current.y, mouseY, 0.15)

      const speed = Math.hypot(vel.current.x, vel.current.y)

      if (speed > 0.3) {
        angle = Math.atan2(vel.current.y, vel.current.x)
      }

      if (performance.now() - lastMoveTime > 100) {
        isMoving = false
      }

      // Update wand position - star is at the tip
      const wand = wandRef.current
      if (wand) {
        wand.style.left = pos.current.x + 'px'
        wand.style.top = pos.current.y + 'px'
        wand.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`
      }

      // Emit sparkles from tip
      if (isMoving && speed > 0.5) {
        const ux = speed ? vel.current.x / speed : 0
        const uy = speed ? vel.current.y / speed : 0
        const spawnX = pos.current.x - ux * 15
        const spawnY = pos.current.y - uy * 15
        const emission = Math.min(14, 2 + Math.floor(speed * 0.2))
        for (let i = 0; i < emission; i++) {
          emitOne(spawnX, spawnY, vel.current.x * 0.4, vel.current.y * 0.4)
        }
      }

      // Draw particles
      ctx.clearRect(0, 0, cvs.width, cvs.height)
      ctx.globalCompositeOperation = 'lighter'
      
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.vy -= 0.003

        const t = p.life / p.maxLife
        const alpha = (1 - t) * 0.9
        const size = p.size * (1 - t * 0.5)

        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue} ${p.sat}% ${p.light}% / ${alpha})`
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life >= p.maxLife) {
          particles.current.splice(i, 1)
          pool.current.push(p)
        }
      }
      
      ctx.globalCompositeOperation = 'source-over'
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.style.cursor = 'auto'
      if (rafId.current) cancelAnimationFrame(rafId.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('mousedown', onDown)
    }
  }, [])

  const emitOne = (x: number, y: number, vx: number, vy: number) => {
    const p = pool.current.length ? pool.current.pop()! : makeParticle(x, y)
    const c = palette[Math.floor(Math.random() * palette.length)]
    const dir = Math.atan2(vy, vx) + (Math.random() - 0.5) * 0.8
    const spd = 0.5 + Math.random() * 1.5
    
    p.x = x
    p.y = y
    p.vx = Math.cos(dir) * spd
    p.vy = Math.sin(dir) * spd - 0.1
    p.size = 1 + Math.random() * 2.5
    p.life = 0
    p.maxLife = 25 + Math.floor(Math.random() * 25)
    p.hue = c.h
    p.sat = c.s
    p.light = c.l
    p.glow = c.glow
    
    particles.current.push(p)
  }

  const burst = (x: number, y: number, count = 80) => {
    for (let i = 0; i < count; i++) {
      const p = pool.current.length ? pool.current.pop()! : makeParticle(x, y)
      const c = palette[Math.floor(Math.random() * palette.length)]
      const dir = Math.random() * Math.PI * 2
      const spd = 1.5 + Math.random() * 3.5
      
      p.x = x
      p.y = y
      p.vx = Math.cos(dir) * spd
      p.vy = Math.sin(dir) * spd
      p.size = 1.5 + Math.random() * 3
      p.life = 0
      p.maxLife = 20 + Math.floor(Math.random() * 20)
      p.hue = c.h
      p.sat = c.s
      p.light = c.l
      p.glow = 1
      
      particles.current.push(p)
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}
      />
      <div
        ref={wandRef}
        aria-hidden
        style={{
          position: 'fixed',
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <svg width="50" height="110" viewBox="0 0 80 180" style={{ display: 'block', marginLeft: -25, marginTop: -25 }}>
          {/* Wand stick with spiral stripes */}
          <defs>
            <linearGradient id="stickGrad" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor="#E8A500" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#E8A500" />
            </linearGradient>
          </defs>
          
          {/* Main stick */}
          <rect x="35" y="40" width="10" height="120" rx="5" fill="url(#stickGrad)" />
          
          {/* Spiral stripes on stick */}
          <g opacity="0.6">
            <line x1="36" y1="50" x2="44" y2="50" stroke="#D49500" strokeWidth="1" />
            <line x1="36" y1="60" x2="44" y2="60" stroke="#D49500" strokeWidth="1" />
            <line x1="36" y1="70" x2="44" y2="70" stroke="#D49500" strokeWidth="1" />
            <line x1="36" y1="80" x2="44" y2="80" stroke="#D49500" strokeWidth="1" />
            <line x1="36" y1="90" x2="44" y2="90" stroke="#D49500" strokeWidth="1" />
            <line x1="36" y1="100" x2="44" y2="100" stroke="#D49500" strokeWidth="1" />
            <line x1="36" y1="110" x2="44" y2="110" stroke="#D49500" strokeWidth="1" />
            <line x1="36" y1="120" x2="44" y2="120" stroke="#D49500" strokeWidth="1" />
            <line x1="36" y1="130" x2="44" y2="130" stroke="#D49500" strokeWidth="1" />
          </g>

          {/* Star head */}
          <g transform="translate(40, 20)">
            {/* Main star */}
            <polygon 
              points="0,-18 4,-6 15,-6 7,0 11,12 0,6 -11,12 -7,0 -15,-6 -4,-6" 
              fill="#FFD700"
            />
            {/* Star shine/highlight */}
            <polygon 
              points="0,-18 4,-6 15,-6 7,0 11,12 0,6 -11,12 -7,0 -15,-6 -4,-6" 
              fill="#FFED4E"
              opacity="0.6"
            />
            
            {/* Sparkle dots on star */}
            <circle cx="5" cy="-8" r="2" fill="#FFF" opacity="0.9" />
            <circle cx="10" cy="2" r="1.5" fill="#FFF" opacity="0.7" />
            <circle cx="-8" cy="5" r="1.5" fill="#FFF" opacity="0.7" />
            <circle cx="-3" cy="-3" r="1" fill="#FFF" opacity="0.8" />
            <circle cx="6" cy="8" r="1.5" fill="#FFF" opacity="0.6" />
          </g>
        </svg>
      </div>
    </>
  )
}

function makeParticle(x: number, y: number): Particle {
  return { x, y, vx: 0, vy: 0, life: 0, maxLife: 40, size: 2, hue: 0, sat: 0, light: 100, glow: 1 }
}
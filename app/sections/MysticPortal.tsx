'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Slide = {
  id: number
  title: string
  desc: string
  img: string
  character: string
}

const slides: Slide[] = [
  { id: 1, title: 'Advertising Magician', desc: "Elevate your brand with our expert digital marketing solutions. From crafting compelling campaigns to optimizing your online presence, we're your go-to advertising magicians.", img: '/assets/images/advertising-bg.png', character: '/assets/images/advertising.png' },
  { id: 2, title: 'Amazon Elf', desc: 'Conquer the Amazon marketplace with our comprehensive e-commerce services. From product optimization to fulfillment & marketing, we are your trusted partner for Amazon success.', img: '/assets/images/Amazon-bg.png', character: '/assets/images/Amazon.png' },
  { id: 3, title: 'App Enchanter', desc: 'Transform your ideas into enchanting mobile & web apps. Our skilled developers specialize in designing & building innovative apps that engage & delight users.', img: '/assets/images/Appencharter-bg.png', character: '/assets/images/Appencharter.png' },
  { id: 4, title: 'Design Genie', desc: 'Unleash your creativity with our versatile design services. From stunning graphics to functional interiors, our genies bring your vision to life.', img: '/assets/images/Designgenie-bg.png', character: '/assets/images/Designgenie.png' },
  { id: 5, title: 'Scribbling Witch', desc: 'Cast a spell on your audience with our captivating content writing. From blog posts to product descriptions, we craft compelling narratives that resonate.', img: '/assets/images/Scribblingwitch-bg.jpg', character: '/assets/images/Scribblingwitch.png' },
  { id: 6, title: 'Web Wizard', desc: 'Weave a digital masterpiece with our expert web design & development. Whether you need a WordPress blog or a custom-coded e-commerce platform, we will create a website that exceeds your expectations.', img: '/assets/images/Webwizard-bg.png', character: '/assets/images/Webwizard.png' },
]

/** Card + layout metrics — tuned to match the screenshot proportions */
const CARD_W = 300
const CARD_H = 470
const GAP = 20
const STEP = CARD_W + GAP
const VIEW_CARDS = 3

/** Active stays as-is; non-actives are slightly smaller */
const ACTIVE_SCALE = 1.0
const SIDE_SCALE_1 = 0.94
const SIDE_SCALE_2 = 0.88

const VIEWPORT_PAD_LEFT = 0

export default function MysticPortalExact() {
  // Build loop list so we can fake infinite
  const extended = [slides[slides.length - 1], ...slides, slides[0]]

  const [pos, setPos] = useState(1)
  const [transitionMs, setTransitionMs] = useState(450)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [velocity, setVelocity] = useState(0)

  const autoRef = useRef<NodeJS.Timeout | null>(null)
  const lastX = useRef(0)
  const lastT = useRef(0)

  // auto-advance
  useEffect(() => {
    if (autoRef.current) clearTimeout(autoRef.current)
    autoRef.current = setTimeout(() => go(1), 6000) as unknown as NodeJS.Timeout
    return () => { if (autoRef.current) clearTimeout(autoRef.current) }
  }, [pos])

  const go = (delta: number) => {
    setTransitionMs(450)
    setPos(p => p + delta)
  }
  const next = () => go(1)
  const prev = () => go(-1)

  // infinite wrap
  const onTransitionEnd = () => {
    if (pos === extended.length - 1) { setTransitionMs(0); setPos(1) }
    else if (pos === 0) { setTransitionMs(0); setPos(slides.length) }
  }

  // drag
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    setDragging(true); setTransitionMs(0); setStartX(x)
    lastX.current = x; lastT.current = performance.now()
    if (autoRef.current) clearTimeout(autoRef.current)
  }
  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const now = performance.now()
    setDrag(x - startX)
    const dx = x - lastX.current
    const dt = now - lastT.current
    setVelocity(dx / Math.max(dt, 1))
    lastX.current = x; lastT.current = now
  }
  const onDragEnd = () => {
    if (!dragging) return
    const momentum = velocity * 200
    const total = drag + momentum
    const steps = Math.round(total / STEP)
    setDragging(false); setDrag(0); setTransitionMs(450)
    if (steps > 0) go(-1)
    else if (steps < 0) go(1)
  }

  // normalize index
  const norm = (i: number, len: number) => ((i % len) + len) % len
  const realIndex = norm(pos - 1, slides.length)
  const active = slides[realIndex] ?? slides[0]

  // Align-left: make active card’s left edge sit at viewport’s left edge
  const trackX = VIEWPORT_PAD_LEFT - (pos * STEP) + drag

  // Safe split (second word may not exist)
  const [firstWord, secondWord = ''] = active.title.split(' ')

  return (
    <section className="portal" onDragStart={(e) => e.preventDefault()}>
      {/* Background cross-fade (as in your shot) */}
      <div className="bg-layer">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`bg ${i === realIndex ? 'show' : ''}`}
            style={{ backgroundImage: `url(${s.img})` }}
          />
        ))}
      </div>
      <div className="overlay" />

      <div className="portal__content">
        {/* LEFT rail */}
        <aside className="rail">
          <div className="rail__line" aria-hidden />
          <div className="rail__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`rail__dot ${i === realIndex ? 'is-active' : ''}`}
                onClick={() => { setTransitionMs(450); setPos(i + 1) }}
                aria-label={`Go to ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </aside>

        {/* MIDDLE glass content (glass+button static; ONLY text animates) */}
        <div className="glass">
          <h2 key={`title-${active.id}`} className="title animate-text">
            {firstWord}{' '}
            <span className="script animate-text delay-1">{secondWord}</span>
          </h2>
          <p key={`desc-${active.id}`} className="desc animate-text delay-2">
            {active.desc}
          </p>
          <button className="cta">Let’s Explore</button>
        </div>

        {/* RIGHT cards */}
        <div className="cards">
          {/* <button className="arrow left" onClick={prev} aria-label="Previous">‹</button> */}

          <div
            className="viewport"
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onDragStart}
            onTouchMove={onDragMove}
            onTouchEnd={onDragEnd}
            onTouchCancel={onDragEnd}
          >
            <div
              className="track"
              style={{
                transform: `translate(${trackX}px, -50%)`,
                transition: transitionMs ? `transform ${transitionMs}ms cubic-bezier(0.25,1,0.3,1)` : 'none',
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {extended.map((s, i) => {
                const dist = Math.abs(i - pos)
                const isActive = dist === 0
                const scale = isActive ? ACTIVE_SCALE : dist === 1 ? SIDE_SCALE_1 : SIDE_SCALE_2
                const opacity = isActive ? 1 : dist === 1 ? 0.85 : 0.6
                const zIndex = isActive ? 3 : dist === 1 ? 2 : 1
                return (
                  <div
                    key={`${s.id}-${i}`}
                    className={`card ${isActive ? 'is-active' : ''}`}
                    style={{ transform: `scale(${scale})`, opacity, zIndex }}
                  >
                    <Image
                      src={s.character}
                      alt={s.title}
                      width={CARD_W}
                      height={CARD_H}
                      draggable={false}
                      unoptimized
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <button className="arrow right" onClick={next} aria-label="Next">›</button>
        </div>
      </div>

      <style jsx>{`
        /* ---------- SECTION ---------- */
        .portal {
          position: relative;
          width: 100%;
          min-height: 100vh;
          color: #fff;
          background: #000;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 40px;
        }

        /* Background cross-fade */
        .bg-layer { position: absolute; inset: 0; z-index: 0; }
        .bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          opacity: 0; transform: scale(1.04);
          transition: opacity .9s ease, transform 1.2s ease;
          will-change: opacity, transform;
        }
        .bg.show { opacity: 1; transform: scale(1); }
        .overlay { position: absolute; inset: 0; background: rgba(0,0,0,.55); z-index: 1; }

        /* ---------- GRID EXACTLY LIKE THE IMAGE ---------- */
        .portal__content {
          position: relative; z-index: 2;
          width: 100%;
          max-width: 1500px;
          display: grid;
          grid-template-columns: 56px 720px 1fr; /* rail | glass | cards */
          column-gap: 40px;
          align-items: center;
        }

        /* ---------- LEFT RAIL ---------- */
        .rail { position: relative; height: 100%; }
        .rail__line {
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, rgba(255,255,255,.2), rgba(255,255,255,.08));
          transform: translateX(-50%);
          border-radius: 1px;
        }
        .rail__dots {
          position: relative;
          display: grid;
          justify-items: center;
          align-content: space-between;
          height: 560px;
          margin: 0 auto;
          padding: 8px 0;
        }
        .rail__dot {
          width: 36px; height: 36px; border-radius: 50%;
          display: grid; place-items: center;
          border: 2px solid #ffcc00; color: #ffcc00;
          background: rgba(0,0,0,.35);
          font-weight: 600;
          cursor: pointer;
          transition: .2s;
        }
        .rail__dot.is-active { background: #ffcc00; color: #000; transform: scale(1.04); }

        /* ---------- MIDDLE GLASS PANEL ---------- */
        .glass {
          position: relative;
          border-radius: 10px;
          padding: 32px 36px 28px;
          background: rgba(0,0,0,.35);
          border: 1px solid rgba(255,255,255,.12);
          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
        }
        .title {
          margin: 0 0 16px 0;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(32px, 5vw, 54px);
        }
        .script {
          font-family: 'Great Vibes', cursive;
          color: #ffcc00;
        }
        .desc {
          margin: 0 0 20px 0;
          max-width: 560px;
          line-height: 1.7;
          color: #eaeaea;
          font-family: 'Poppins', sans-serif;
        }

        /* === TEXT ANIMATION ONLY === */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); filter: blur(2px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-text { animation: fadeUp .55s ease both; }
        .delay-1 { animation-delay: .06s; }
        .delay-2 { animation-delay: .12s; }

        /* ---------- RIGHT CARDS (3 visible, flush to glass) ---------- */
.cards {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  overflow: visible; /* allow top/bottom overflow to show */
}

.viewport {
  position: relative;
  width: calc(${VIEW_CARDS} * ${CARD_W}px + ${(VIEW_CARDS - 1) * GAP}px);
  height: ${CARD_H}px;

  /* 🔥 FIX: remove vertical scroll & let full card show */
  overflow: hidden; /* stop any scrollbars */
  clip-path: inset(-40px 0 -40px 0); /* allow top/bottom overflow to show outside */
  
  border-radius: 8px;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;
}

.viewport:active { cursor: grabbing; }

.track {
  position: absolute;
  top: 50%; left: 0;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  will-change: transform;
  gap: ${GAP}px;
}

.card {
  width: ${CARD_W}px; height: ${CARD_H}px;
  border-radius: 12px; background: #111;
  display: grid; place-items: center;
  box-shadow: 0 14px 30px rgba(0,0,0,.5);
  transition: transform .45s cubic-bezier(.25,1,.3,1), opacity .25s ease;
  will-change: transform, opacity;
  overflow: visible;
}

.card :global(img) {
  width: 100%; height: 100%; object-fit: contain;
  pointer-events: none;
  border-radius: 20px;
}


        .card.is-active { box-shadow: 0 18px 38px rgba(0,0,0,.6); }

        /* Arrows (right-side only visible in your current markup) */
        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,204,0,.14);
          border: 1px solid rgba(255,204,0,.6);
          color: #ffcc00;
          font-size: 20px;
          display: grid; place-items: center;
          cursor: pointer;
          z-index: 3;
        }
        .arrow.left { left: -22px; }
        .arrow.right { right: -22px; }
        .arrow:hover { background: rgba(255,204,0,.3); }

        /* Responsive */
        @media (max-width: 1280px) {
          .portal__content { grid-template-columns: 56px 640px 1fr; column-gap: 28px; }
          .viewport { width: calc(${VIEW_CARDS} * 260px + ${(VIEW_CARDS - 1) * 24}px); height: 360px; }
          .card { width: 260px; height: 360px; }
        }
        @media (max-width: 1024px) {
          .portal__content { grid-template-columns: 1fr; row-gap: 28px; }
          .rail { display: none; }
          .glass { order: 1; }
          .cards { order: 2; justify-items: start; }
          .viewport { width: 100%; }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-text, .delay-1, .delay-2 { animation: none !important; }
          .track { transition: none !important; }
        }
      `}</style>
    </section>
  )
}

'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Slide = {
  id: number
  title: string
  desc: string
  img: string
  character: string
}

const slides: Slide[] = [
  { id: 1, title: 'Advertising Magician', desc: 'Elevate your brand with our expert digital marketing solutions. From crafting compelling campaigns to optimizing your online presence, we are your go-to advertising magicians.', img: '/assets/images/advertising-bg.png', character: '/assets/images/advertising.png' },
  { id: 2, title: 'Amazon Elf', desc: 'Conquer the Amazon marketplace with our comprehensive e-commerce services. From product optimization to fulfillment & marketing, we are your trusted partner for Amazon success.', img: '/assets/images/Amazon-bg.png', character: '/assets/images/Amazon.png' },
  { id: 3, title: 'App Enchanter', desc: 'Transform your ideas into enchanting mobile & web apps. Our skilled developers specialize in designing & building innovative apps that engage & delight users.', img: '/assets/images/Appencharter-bg.png', character: '/assets/images/Appencharter.png' },
  { id: 4, title: 'Design Genie', desc: 'Unleash your creativity with our versatile design services. From stunning graphics to functional interiors, our genies bring your vision to life.', img: '/assets/images/Designgenie-bg.png', character: '/assets/images/Designgenie.png' },
  { id: 5, title: 'Scribbling Witch', desc: 'Cast a spell on your audience with our captivating content writing. From blog posts to product descriptions, we craft compelling narratives that resonate.', img: '/assets/images/Scribblingwitch-bg.png', character: '/assets/images/Scribblingwitch.png' },
  { id: 6, title: 'Web Wizard', desc: 'Weave a digital masterpiece with our expert web design & development. Whether you need a WordPress blog or a custom-coded e-commerce platform, we will create a website that exceeds your expectations.', img: '/assets/images/Webwizard-bg.png', character: '/assets/images/Webwizard.png' },
]

const CARD_W = 260
const CARD_H = 340
const GAP = 30
const STEP = CARD_W + GAP * 2 // distance between card centers

export default function MysticPortal() {
  // build loop-friendly list
  const extended = [slides[slides.length - 1], ...slides, slides[0]]

  // carousel state
  const [pos, setPos] = useState(1) // index in extended
  const [transitionMs, setTransitionMs] = useState(450)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [velocity, setVelocity] = useState(0)

  // auto + drag helpers
  const autoRef = useRef<NodeJS.Timeout | null>(null)
  const lastX = useRef(0)
  const lastT = useRef(0)

  // layout measurement for RIGHT column only
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [vpCenter, setVpCenter] = useState(0) // pixel center of the viewport

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const compute = () => setVpCenter(el.clientWidth / 2)

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // auto-loop (clears correctly)
  useEffect(() => {
    if (autoRef.current) clearTimeout(autoRef.current)
    autoRef.current = setTimeout(() => go(1), 6000) as unknown as NodeJS.Timeout
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current)
    }
  }, [pos])

  const go = (delta: number) => {
    setTransitionMs(450)
    setPos((p) => p + delta)
  }
  const next = () => go(1)
  const prev = () => go(-1)

  // wrap ends (infinite)
  const onTransitionEnd = () => {
    if (pos === extended.length - 1) {
      setTransitionMs(0)
      setPos(1)
    } else if (pos === 0) {
      setTransitionMs(0)
      setPos(slides.length)
    }
  }

  // drag
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragging(true)
    setTransitionMs(0)
    setStartX(x)
    lastX.current = x
    lastT.current = performance.now()
    if (autoRef.current) clearTimeout(autoRef.current)
  }

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const now = performance.now()
    setDrag(x - startX)
    const dx = x - lastX.current
    const dt = now - lastT.current
    setVelocity(dx / Math.max(dt, 1))
    lastX.current = x
    lastT.current = now
  }

  const onDragEnd = () => {
    if (!dragging) return
    const momentum = velocity * 200
    const total = drag + momentum
    const steps = Math.round(total / STEP)
    setDragging(false)
    setDrag(0)
    setTransitionMs(450)
    if (steps > 0) go(-1)
    else if (steps < 0) go(1)
  }

  // real slide index (for BG + left text)
  const realIndex = pos === 0 ? slides.length - 1 : pos === extended.length - 1 ? 0 : pos - 1
  const active = slides[realIndex]

  // translate the track so the current card is centered **inside the right viewport only**
  const trackX = vpCenter - CARD_W / 2 - pos * STEP + drag

  return (
    <section className="portal">
      {/* background images (fade) */}
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
        {/* LEFT: steps + text */}
        <div className="left">
          <div className="portal__steps">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={`step ${i === realIndex ? 'active' : ''}`}
                onClick={() => { setTransitionMs(450); setPos(i + 1) }}
              >
                <div className="dot">{s.id}</div>
                {i !== slides.length - 1 && <div className="line" />}
              </div>
            ))}
          </div>

          <div key={active.id} className="portal__text">
            <h2>
              {active.title.split(' ')[0]}{' '}
              <span className="highlight">{active.title.split(' ')[1]}</span>
            </h2>
            <p>{active.desc}</p>
            <button>Let’s Explore</button>
          </div>
        </div>

        {/* RIGHT: carousel – strictly confined to this column */}
        <div className="right">
          <button className="arrow left" onClick={prev}>‹</button>

          <div
            ref={viewportRef}
            className="carousel-viewport"
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onDragStart}
            onTouchMove={onDragMove}
            onTouchEnd={onDragEnd}
          >
            <div
              className="track"
              style={{
                transform: `translateX(${trackX}px)`,
                transition: transitionMs ? `transform ${transitionMs}ms cubic-bezier(0.25,1,0.3,1)` : 'none',
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {extended.map((s, i) => {
                const dist = Math.abs(i - pos)
                const isActive = dist === 0
                const scale = isActive ? 1.08 : dist === 1 ? 0.88 : 0.78
                const opacity = isActive ? 1 : dist === 1 ? 0.55 : 0.28
                const zIndex = isActive ? 3 : dist === 1 ? 2 : 1

                return (
                  <div
                    key={`${s.id}-${i}`}
                    className="card"
                    style={{
                      transform: `scale(${scale})`,
                      opacity,
                      zIndex,
                    }}
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

          <button className="arrow right" onClick={next}>›</button>
        </div>
      </div>

      <style jsx>{`
        /* SECTION */
        .portal {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #000;
          color: #fff;
          padding: 100px clamp(16px, 5vw, 80px);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow-x: hidden; /* no page-wide horizontal scroll */
          overflow-y: hidden;
        }

        /* BACKGROUND */
        .bg-layer { position: absolute; inset: 0; z-index: 0; }
        .bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          opacity: 0; transform: scale(1.05);
          transition: opacity 1s ease, transform 1.4s ease;
        }
        .bg.show { opacity: 1; transform: scale(1); }
        .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); z-index: 1; }

        /* GRID: Left / Right columns */
        .portal__content {
          position: relative; z-index: 2;
          max-width: 1300px; width: 100%;
          display: grid;
          grid-template-columns: 55% 45%; /* <- RIGHT column is the carousel area */
          gap: 40px;
          align-items: center;
        }

        /* LEFT column */
        .left { display: grid; grid-template-columns: auto 1fr; gap: 30px; align-items: start; }
        .portal__steps { display: flex; flex-direction: column; align-items: center; gap: 32px; }
        .dot {
          width: 38px; height: 38px; border-radius: 50%;
          border: 2px solid #ffcc00; color: #ffcc00;
          display: grid; place-items: center; font-weight: 600; transition: .3s;
        }
        .step.active .dot { background: #ffcc00; color: #000; transform: scale(1.08); }
        .line { width: 2px; height: 40px; background: linear-gradient(#ffd700, rgba(255,215,0,.15)); }

        .portal__text { max-width: 520px; }
        .portal__text h2 { font: 700 clamp(2rem,3vw,3rem) 'Playfair Display', serif; margin: 0 0 20px; }
        .highlight { color: #ffcc00; font-family: 'Great Vibes', cursive; }
        .portal__text p { color: #ccc; line-height: 1.8; font-family: 'Poppins', sans-serif; margin: 0 0 22px; }
        .portal__text button {
          background: #ffcc00; color: #000; border: 0; border-radius: 6px;
          padding: 10px 26px; font-weight: 600; cursor: pointer; transition: .25s;
        }
        .portal__text button:hover { background: #ffec99; transform: translateY(-1px); }

        /* RIGHT column (carousel) — strictly confined here */
        .right {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
        }

        .carousel-viewport {
          position: relative;
          width: 100%;
          height: ${CARD_H}px;
          overflow: hidden;          /* <- HARD CLIP to right column */
          border-radius: 16px;
        }

        .track {
          position: absolute; top: 50%;
          transform: translateY(-50%);
          display: flex; align-items: center;
          height: ${CARD_H}px;
          will-change: transform;
        }

        .card {
          width: ${CARD_W}px; height: ${CARD_H}px;
          margin: 0 ${GAP}px;
          border-radius: 14px; background: #111;
          display: grid; place-items: center;
          box-shadow: 0 10px 28px rgba(0,0,0,.55);
          transition: transform .45s cubic-bezier(.25,1,.3,1), opacity .45s ease;
        }

        /* Arrows stay inside right column */
        .arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 46px; height: 46px; border-radius: 50%;
          background: rgba(255,215,0,.1);
          border: 1px solid rgba(255,215,0,.6);
          color: #ffd700; font-size: 1.6rem; display: grid; place-items: center;
          z-index: 3; cursor: pointer; transition: .25s;
        }
        .arrow:hover { background: rgba(255,215,0,.3); transform: translateY(-50%) scale(1.07); }
        .arrow.left  { left: -24px; }   /* tucked just outside the viewport edge */
        .arrow.right { right: -24px; }

        @media (max-width: 1024px) {
          .portal__content { grid-template-columns: 1fr; gap: 36px; }
          .left { grid-template-columns: auto 1fr; }
          .arrow.left  { left: 6px; }
          .arrow.right { right: 6px; }
        }
      `}</style>
    </section>
  )
}

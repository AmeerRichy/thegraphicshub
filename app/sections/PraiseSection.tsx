'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Testimonial = {
  name: string
  review: string
  author: string
  project: string
  rating: number
  img: string
}

const testimonials: Testimonial[] = [
  {
    name: 'MCT Collection',
    review:
      "We've collaborated on multiple projects — always a pleasure. Their speed, creativity & professionalism are unmatched.",
    author: '– MCT',
    project: 'Logo Design',
    rating: 5,
    img: '/sample-card.jpg',
  },
  {
    name: 'Sweet VAJ',
    review:
      'They understood my vision perfectly. Delivered exactly what I needed — polished, timely, and aesthetic.',
    author: '– Aajayi',
    project: 'Branding',
    rating: 5,
    img: '/sample-card.jpg',
  },
  {
    name: 'Travel Diva',
    review:
      'Flawless communication & execution! They turned my idea into a brand identity that truly represents me.',
    author: '– Tomeka Gilmer',
    project: 'Logo Design',
    rating: 5,
    img: '/sample-card.jpg',
  },
  {
    name: 'The Luxe Edit',
    review:
      'From logos to product shots — every detail was handled with perfection. You guys truly make design feel like magic.',
    author: '– Huda',
    project: 'Complete Branding Kit',
    rating: 5,
    img: '/sample-card.jpg',
  },
  {
    name: 'Bloom Studios',
    review:
      'Highly professional & creative. Loved how they transformed our dull visuals into a premium brand identity!',
    author: '– Zara Malik',
    project: 'Rebranding & Print',
    rating: 5,
    img: '/sample-card.jpg',
  },
]

export default function PraiseSection() {
  const [index, setIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [parallax, setParallax] = useState(0) // -1..1 on mouse move
  const touchStartX = useRef<number | null>(null)
  const prefersReduced = useRef(false)

  // Cluster composition
  const BASE = 338           // distance between cards
  const LEFT_SHIFT = 168     // global left nudge for cluster
  const ACTIVE_EXTRA = 40    // extra nudge for center card
  const PARALLAX_X = 14      // px sway of cluster on mouse
  const PARALLAX_TILT = 5    // deg extra tilt from parallax

  useEffect(() => {
    prefersReduced.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  }, [])

  // Autoplay (pause on hover / reduced motion)
  useEffect(() => {
    if (prefersReduced.current) return
    const t = setInterval(() => {
      if (!isHovering) setIndex((p) => (p + 1) % testimonials.length)
    }, 5600)
    return () => clearInterval(t)
  }, [isHovering])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const next = () => setIndex((p) => (p + 1) % testimonials.length)
  const prev = () => setIndex((p) => (p - 1 + testimonials.length) % testimonials.length)

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) (delta < 0 ? next() : prev())
    touchStartX.current = null
  }

  // Mouse parallax
  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced.current) return
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0..1
    setParallax((x - 0.5) * 2) // -1..1
  }

  return (
    <section className="praise">
      <h2 className="praise-title">
        Whispers of <span>Praise</span>
      </h2>
      <p className="praise-subtitle">
        Hear from those who’ve experienced our magic firsthand — real stories of transformation from happy clients.
      </p>

      <div
        className="slider-wrapper"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button className="arrow left" onClick={prev} aria-label="Previous testimonial">‹</button>

        <div
          className="slider"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseMove={onMouseMove}
          style={{
            // subtle sway of the entire cluster
            transform: `translateX(${parallax * PARALLAX_X}px)`,
          }}
        >
          <div className="fade fade-left" aria-hidden />
          <div className="fade fade-right" aria-hidden />

          {testimonials.map((item, i) => {
            const offset = (i - index + testimonials.length) % testimonials.length // 0 = active, ±1 near, etc.
            const isCenter = offset === 0
            const dist = Math.abs(offset)

            // depth/presence
            const scale = isCenter ? 1 : 0.865
            const baseOpacity = isCenter ? 1 : 0.26 + Math.max(0, 0.16 - dist * 0.05)
            const blurAmount = Math.min(dist * 2.7, 6.5)
            const zTranslate = isCenter ? 46 : 0
            const zIndex = 12 - dist

            // left shift + active bias
            const x =
              offset * BASE
              - LEFT_SHIFT
              - (isCenter ? ACTIVE_EXTRA : Math.floor(ACTIVE_EXTRA / 2))

            // tilt with parallax spice
            const tiltBase = isCenter ? 0 : offset > 0 ? -14 : 14
            const tilt = tiltBase + parallax * PARALLAX_TILT

            const classDist =
              isCenter ? 'center' : dist === 1 ? 'near' : 'far'

            const style = {
              transform: `translateX(${x}px) translateZ(${zTranslate}px) scale(${scale}) rotateY(${tilt}deg)`,
              opacity: baseOpacity,
              zIndex,
              filter: `blur(${blurAmount}px)`,
            } as React.CSSProperties

            return (
              <article
                key={i}
                className={`card ${classDist}`}
                style={style}
                aria-roledescription="slide"
                aria-label={`${item.name} — ${item.project}`}
                tabIndex={isCenter ? 0 : -1}
              >
                <div className="hexagon" aria-hidden>
                  <Image
                    src={item.img}
                    alt=""
                    width={104}
                    height={104}
                    className="hex"
                    priority={isCenter}
                  />
                </div>

                <h3 className="card-title">{item.name}</h3>
                <p className="review">“{item.review}”</p>
                <p className="author">{item.author}</p>
                <p className="project">{item.project}</p>

                <div className="stars" aria-label={`${item.rating} star rating`} role="img">
                  {'★'.repeat(item.rating)}
                </div>
              </article>
            )
          })}
        </div>

        <button className="arrow right" onClick={next} aria-label="Next testimonial">›</button>
      </div>

      <div className="dots" role="tablist" aria-label="Choose testimonial">
        {testimonials.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .praise {
          width: 100%;
          background:
            radial-gradient(110rem 70rem at 55% 28%, #0b0b0b 0%, #000 100%),
            radial-gradient(70rem 40rem at 0% 60%, rgba(255, 215, 0, 0.05), transparent 70%);
          color: #fff;
          text-align: center;
          padding: 140px 5% 230px;
          overflow: hidden;
          position: relative;
          isolation: isolate;
        }

        /* Animated ambient */
        .praise::before {
          content: '';
          position: absolute;
          top: 34%;
          left: -8%;
          width: 540px;
          height: 540px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.18), transparent 70%);
          filter: blur(72px);
          animation: pulseGlow 6.8s ease-in-out infinite alternate;
          z-index: 0;
        }
        @keyframes pulseGlow {
          0% { opacity: 0.45; transform: scale(1); }
          100% { opacity: 0.85; transform: scale(1.18); }
        }

        .praise-title {
          font-size: 3rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.5px;
          z-index: 2;
        }
        .praise-title span {
          color: #ffd700;
          font-family: 'Great Vibes', cursive;
          margin-left: 8px;
        }
        .praise-subtitle {
          color: rgba(255, 255, 255, 0.82);
          font-family: 'Poppins', sans-serif;
          max-width: 760px;
          margin: 18px auto 78px;
          font-size: 1.05rem;
        }

        .slider-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 5;
          width: 100%;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(circle at center, rgba(255, 215, 0, 0.12), rgba(0, 0, 0, 0.6));
          border: 1px solid rgba(255, 215, 0, 0.62);
          color: #ffd700;
          font-size: 1.6rem;
          width: 52px;
          height: 52px;
          cursor: pointer;
          border-radius: 50%;
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          box-shadow: 0 0 18px rgba(255, 215, 0, 0.25);
          z-index: 20;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .arrow:hover,
        .arrow:focus-visible {
          box-shadow: 0 0 34px rgba(255, 215, 0, 0.55);
          transform: translateY(-50%) scale(1.1);
          border-color: rgba(255, 215, 0, 0.9);
          outline: none;
          background: radial-gradient(circle at center, rgba(255, 215, 0, 0.18), rgba(0, 0, 0, 0.62));
        }
        .arrow.left { left: 5%; }
        .arrow.right { right: 5%; }

        .slider {
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1450px;
          width: 100%;
          max-width: 1180px;
          height: 502px;
          position: relative;
          padding-bottom: 132px; /* space for reflection */
          will-change: transform;
          transition: transform 400ms ease-out;
        }

        /* Edge fades */
        .fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 12%;
          pointer-events: none;
          z-index: 6;
          filter: blur(1px);
        }
        .fade-left {
          left: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.78), rgba(0,0,0,0.35) 35%, transparent 70%);
        }
        .fade-right {
          right: 0;
          background: linear-gradient(to left, rgba(0,0,0,0.78), rgba(0,0,0,0.35) 35%, transparent 70%);
        }

        .card {
          position: absolute;
          width: 320px;
          background: rgba(255, 215, 0, 0.07);
          border: 1px solid rgba(255, 215, 0, 0.26);
          border-radius: 18px;
          padding: 36px 24px 70px;
          box-shadow:
            0 0 40px rgba(255, 215, 0, 0.08),
            inset 0 0 0.5px rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition:
            transform 900ms cubic-bezier(0.25, 1, 0.3, 1),
            opacity 600ms ease,
            filter 600ms ease,
            background 300ms ease,
            border-color 300ms ease;
        }

        /* True reflection + stronger fade */
        @supports (-webkit-box-reflect: below 0) {
          .card {
            -webkit-box-reflect: below 0
              linear-gradient(
                to bottom,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0.08) 18%,
                rgba(0,0,0,0.2) 38%,
                rgba(0,0,0,0.38) 60%,
                rgba(0,0,0,0.65) 100%
              );
          }
          /* Extra haze ON TOP of the reflection for realism */
          .card::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -26px;
            transform: translateX(-50%);
            width: 84%;
            height: 28px;
            border-radius: 50%;
            background:
              radial-gradient(closest-side, rgba(255, 215, 0, 0.30), rgba(255, 215, 0, 0.02));
            filter: blur(12px);
            pointer-events: none;
            opacity: 0.9;
          }
          /* Distance-aware haze intensity */
          .card.near::after { opacity: 0.85; filter: blur(13px); }
          .card.far::after  { opacity: 0.65; filter: blur(16px); height: 24px; }
          .card.center::after { opacity: 1; filter: blur(11px); height: 30px; }
        }

        /* Fallback glow if reflection not supported */
        @supports not (-webkit-box-reflect: below 0) {
          .card::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -26px;
            transform: translateX(-50%);
            width: 84%;
            height: 26px;
            border-radius: 50%;
            background:
              radial-gradient(closest-side, rgba(255, 215, 0, 0.28), rgba(255, 215, 0, 0.02));
            filter: blur(12px);
            pointer-events: none;
          }
          .card.near::after { opacity: 0.82; filter: blur(13px); }
          .card.far::after  { opacity: 0.6;  filter: blur(15px); height: 22px; }
          .card.center::after { opacity: 0.95; filter: blur(11px); height: 28px; }
        }

        .card.center {
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.35);
          box-shadow:
            0 0 66px rgba(255, 215, 0, 0.14),
            inset 0 0 0.5px rgba(255, 255, 255, 0.14);
        }
        .card.center:focus-visible {
          outline: 2px solid #ffd700;
          outline-offset: 3px;
        }

        .hexagon {
          width: 108px;
          height: 108px;
          background: linear-gradient(145deg, #77530a, #ffd277);
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          margin: 0 auto 16px;
          display: grid;
          place-items: center;
          box-shadow: 0 0 26px rgba(255, 215, 0, 0.35);
        }
        .hex {
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          width: 96px;
          height: 96px;
          object-fit: cover;
        }

        .card-title {
          font-size: 1.16rem;
          font-weight: 700;
          letter-spacing: 0.3px;
        }
        .review {
          font-size: 0.98rem;
          color: #e7e7e7;
          margin: 12px 0 10px;
          line-height: 1.7;
          text-shadow: 0 0 14px rgba(0,0,0,0.25);
        }
        .author { color: #ffd700; font-weight: 600; margin-top: 10px; }
        .project { color: #b9b9b9; font-size: 0.92rem; }
        .stars {
          color: #ffd700;
          font-size: 1.06rem;
          margin-top: 10px;
          letter-spacing: 1px;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.25);
        }

        .dots {
          margin-top: 26px;
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255, 215, 0, 0.26);
          border: 1px solid rgba(255, 215, 0, 0.46);
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, width 0.25s ease;
        }
        .dot.active {
          width: 24px;
          background: rgba(255, 215, 0, 0.85);
        }
        .dot:hover,
        .dot:focus-visible {
          transform: scale(1.1);
          outline: none;
        }

        @media (max-width: 1100px) {
          .arrow.left { left: 3%; }
          .arrow.right { right: 3%; }
        }
        @media (max-width: 992px) {
          .praise { padding: 120px 5% 190px; }
          .praise-title { font-size: 2.6rem; }
          .card { width: 284px; padding: 30px 22px 62px; }
        }
        @media (max-width: 768px) {
          .arrow { width: 44px; height: 44px; font-size: 1.3rem; }
          .card { width: 244px; padding: 26px 18px 54px; }
          .fade { width: 16%; }
        }
        @media (max-width: 520px) {
          .praise-title { font-size: 2.05rem; }
          .arrow { width: 38px; height: 38px; font-size: 1.1rem; }
          .card { width: 210px; padding: 22px 16px 48px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .praise::before { animation: none; }
          .slider { transition: none; }
          .card { transition: none; }
        }
      `}</style>
    </section>
  )
}

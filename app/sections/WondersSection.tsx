'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const cards = [
  { i: -5, title: 'UI/UX Design', desc: 'Design intuitive & user-friendly interfaces that enhance digital experiences.', link: '#' },
  { i: -4, title: 'Stationary', desc: 'Professional & cohesive business essentials like cards & letterheads.', link: '#' },
  { i: -3, title: 'Social Media', desc: 'Create engaging posts & templates to boost brand presence.', link: '#' },
  { i: -2, title: 'Logo Design', desc: 'Craft unique & impactful logos representing brand values.', link: '#' },
  { i: -1, title: 'Branding', desc: 'Develop color schemes, typography, & visual elements.', link: '#' },
  { i: 0, title: 'View All', desc: '', link: '#' },
  { i: 1, title: 'Print Media', desc: 'Design visually compelling brochures & flyers.', link: '#' },
  { i: 2, title: 'Video Editing', desc: 'Produce dynamic video content & animations.', link: '#' },
  { i: 3, title: 'Product Design', desc: 'Innovative & appealing packaging designs.', link: '#' },
  { i: 4, title: 'Interior/Exterior', desc: 'Design captivating spaces aligned with your brand.', link: '#' },
  { i: 5, title: 'Character Design', desc: 'Create custom characters for storytelling & branding.', link: '#' },
]

export default function WondersSection() {
  const [hovered, setHovered] = useState<{ title: string; desc: string } | null>(null)
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // 🎬 Trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true)
      },
      { threshold: 0.4 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={`wonders ${animate ? 'animate' : ''}`}>
      <h2 className="title">
        Wonders <span>We Weave</span>
      </h2>
      <p className="subtitle">
        Dive into our array of mystical offerings – from web enchantments to branding spells &
        immersive 3D illusions.
      </p>

      <div className="card-container">
        {cards.map((card) => (
          <div
            key={card.i}
            className={`card ${animate ? 'visible' : ''}`}
            style={{ '--i': card.i } as React.CSSProperties}
            onMouseEnter={() => setHovered({ title: card.title, desc: card.desc })}
            onMouseLeave={() => setHovered(null)}
          >
            <Image src="/sample-card.jpg" alt={card.title} width={200} height={300} />
          </div>
        ))}

        <div className={`title-display ${hovered ? 'show' : ''}`}>
          <div className="title-text">{hovered?.title || ''}</div>
          <div className="description">{hovered?.desc || ''}</div>
        </div>
      </div>

      <style jsx>{`
        .wonders {
          position: relative;
          width: 100%;
          overflow: hidden;
          background-color: #000;
          color: #fff;
          text-align: center;
          padding: 160px 5% 200px; /* ✅ added bottom space */
          background-image: url('/cards-bg.png');
          background-size: 180px;
          background-repeat: repeat;
          background-position: center;
          box-sizing: border-box;
        }

        .title {
          font-size: 3rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
        }

        .title span {
          color: #ffd700;
          font-family: 'Great Vibes', cursive;
          margin-left: 6px;
        }

        .subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 650px;
          margin: 20px auto 60px;
          font-family: 'Poppins', sans-serif;
        }

        .card-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          position: relative;
          height: 400px;
          overflow: visible;
        }

        .card {
          position: absolute;
          width: 200px;
          height: 300px;
          border-radius: 10px;
          background: linear-gradient(to right, #77530a, #ffd277, #77530a);
          padding: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          opacity: 0;
          transform-origin: 50% 250%;
          transform: translateY(80px) scale(0.8);
          transition: all 1s ease;
        }

        /* 🎬 Animation after scroll */
        .animate .card.visible {
          opacity: 1;
          transform: rotate(calc(var(--i) * 12deg))
            translate(calc(var(--i) * -15px), 10px)
            scale(1);
        }

        .card img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
          object-fit: cover;
        }

        .card:hover {
          transform: rotate(calc(var(--i) * 12deg)) translate(calc(var(--i) * 10px), -40px);
          background-position: right;
          background-size: 200%;
        }

        .title-display {
          position: absolute;
          bottom: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 800px;
          opacity: 0;
          transition: opacity 0.4s ease;
          font-family: 'Arima', sans-serif;
          color: #ecb73b;
          text-align: center;
          pointer-events: none;
        }

        .title-display.show {
          opacity: 1;
        }

        .description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .wonders {
            padding: 120px 3% 160px;
          }
          .card-container {
            height: 300px;
            max-width: 100%;
            overflow: hidden;
          }
          .animate .card.visible {
            transform: rotate(calc(var(--i) * 10deg)) translate(calc(var(--i) * -10px), 40px)
              scale(1);
          }
          .card {
            width: 150px;
            height: 220px;
          }
          .title {
            font-size: 2.4rem;
          }
          .subtitle {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .card-container {
            height: 240px;
            overflow: hidden;
          }
          .card {
            width: 90px;
            height: 140px;
          }
          .animate .card.visible {
            transform: rotate(calc(var(--i) * 8deg)) translate(calc(var(--i) * -2px), 70px)
              scale(1);
          }
          .title-display {
            bottom: -60px;
            max-width: 360px;
          }
          .title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  )
}

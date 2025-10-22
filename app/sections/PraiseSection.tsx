'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const testimonials = [
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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="praise">
      <h2 className="praise-title">
        Whispers of <span>Praise</span>
      </h2>
      <p className="praise-subtitle">
        Hear from those who’ve experienced our magic firsthand — real stories of transformation from happy clients.
      </p>

      <div className="slider-wrapper">
        <button className="arrow left" onClick={prev}>
          ‹
        </button>

        <div className="slider">
          {testimonials.map((item, i) => {
            const offset = (i - index + testimonials.length) % testimonials.length
            const isCenter = offset === 0
            const distance = Math.abs(offset)
            const blurAmount = Math.min(distance * 2.5, 6)
            const scale = isCenter ? 1 : 0.85
            const opacity = isCenter ? 1 : 0.25
            const zIndex = isCenter ? 10 : 5
            const style = {
              transform: `translateX(${offset * 350}px) scale(${scale}) rotateY(${isCenter ? 0 : offset > 0 ? -15 : 15}deg)`,
              opacity,
              zIndex,
              filter: `blur(${blurAmount}px)`,
            } as React.CSSProperties

            return (
              <div key={i} className={`card ${isCenter ? 'center' : ''}`} style={style}>
                <div className="hexagon">
                  <Image src={item.img} alt={item.name} width={100} height={100} className="hex" />
                </div>
                <h3>{item.name}</h3>
                <p className="review">“{item.review}”</p>
                <p className="author">{item.author}</p>
                <p className="project">{item.project}</p>
                <div className="stars">{'⭐'.repeat(item.rating)}</div>
              </div>
            )
          })}
        </div>

        <button className="arrow right" onClick={next}>
          ›
        </button>
      </div>

      <style jsx>{`
        .praise {
          width: 100%;
          background: radial-gradient(circle at 50% 30%, #0a0a0a 0%, #000 100%);
          color: #fff;
          text-align: center;
          padding: 160px 5% 240px;
          overflow: hidden;
          position: relative;
        }

        /* 🌟 Animated ambient glow */
        .praise::before {
          content: '';
          position: absolute;
          top: 40%;
          left: 0;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.18), transparent 70%);
          filter: blur(65px);
          animation: pulseGlow 6s ease-in-out infinite alternate;
          z-index: 0;
        }

        @keyframes pulseGlow {
          0% { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(1.25); }
        }

        .praise-title {
          font-size: 3.2rem;
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
          color: rgba(255, 255, 255, 0.8);
          font-family: 'Poppins', sans-serif;
          max-width: 680px;
          margin: 20px auto 90px;
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

        .slider {
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          width: 100%;
          max-width: 1100px;
          height: 460px;
          position: relative;
        }

        .card {
          position: absolute;
          width: 320px;
          background: rgba(255, 215, 0, 0.05);
          border: 1px solid rgba(255, 215, 0, 0.25);
          border-radius: 18px;
          padding: 40px 25px 80px;
          box-shadow: 0 0 40px rgba(255, 215, 0, 0.08);
          backdrop-filter: blur(10px);
          transition: all 0.9s cubic-bezier(0.25, 1, 0.3, 1);
        }

        /* Reflection + curved glow */
        .card.center::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: 50%;
          transform: translateX(-50%) scaleY(-1);
          width: 85%;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.25), rgba(255, 215, 0, 0));
          filter: blur(25px);
          opacity: 0.7;
          animation: reflectPulse 4s ease-in-out infinite alternate;
        }

        @keyframes reflectPulse {
          0% { opacity: 0.4; transform: translateX(-50%) scaleY(-1) scale(1); }
          100% { opacity: 0.8; transform: translateX(-50%) scaleY(-1) scale(1.05); }
        }

        .hexagon {
          width: 100px;
          height: 100px;
          background: linear-gradient(145deg, #77530a, #ffd277);
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(255, 215, 0, 0.4);
        }

        .hex {
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          width: 90px;
          height: 90px;
          object-fit: cover;
        }

        .review {
          font-size: 0.95rem;
          color: #ddd;
          margin: 12px 0 10px;
          line-height: 1.7;
        }

        .author {
          color: #ffd700;
          font-weight: 600;
          margin-top: 10px;
        }

        .project {
          color: #aaa;
          font-size: 0.9rem;
        }

        .stars {
          color: #ffd700;
          font-size: 1.1rem;
          margin-top: 8px;
        }

        /* 🎯 Arrows */
        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(circle at center, rgba(255, 215, 0, 0.1), rgba(0, 0, 0, 0.6));
          border: 1px solid rgba(255, 215, 0, 0.6);
          color: #ffd700;
          font-size: 1.6rem;
          width: 52px;
          height: 52px;
          cursor: pointer;
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 0 18px rgba(255, 215, 0, 0.3);
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .arrow::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255, 215, 0, 0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }

        .arrow:hover::after {
          transform: translateX(100%);
        }

        .arrow:hover {
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
          transform: translateY(-50%) scale(1.1);
        }

        .arrow.left {
          left: 5%;
        }

        .arrow.right {
          right: 5%;
        }

        /* 📱 Responsive */
        @media (max-width: 992px) {
          .praise { padding: 120px 5% 160px; }
          .praise-title { font-size: 2.6rem; }
          .card { width: 270px; padding: 35px 20px 70px; }
        }

        @media (max-width: 768px) {
          .arrow { width: 42px; height: 42px; font-size: 1.3rem; }
          .card { width: 240px; padding: 30px 18px 60px; }
        }

        @media (max-width: 480px) {
          .praise-title { font-size: 2rem; }
          .arrow { width: 38px; height: 38px; font-size: 1.1rem; }
          .card { width: 200px; padding: 25px 16px 55px; }
        }
      `}</style>
    </section>
  )
}

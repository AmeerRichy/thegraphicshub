'use client'

import { useMemo } from 'react'

type GalleryProps = {
  buttonText?: string
  onButtonClick?: () => void
}

export default function InfiniteGallery({
  buttonText = 'View All',
  onButtonClick,
}: GalleryProps) {
  // ── 5 columns × 5 images (add your own URLs here) ──────────────────────────
  const COL_IMAGES: string[][] = [
    [
      '/assets/images/col1-1.png',
      '/assets/images/col1-2.png',
      '/assets/images/col1-3.png',
      '/assets/images/col1-4.png',
      '/assets/images/col1-5.png',
    ],
    [
      '/assets/images/col2-1.png',
      '/assets/images/col2-2.png',
      '/assets/images/col2-3.png',
      '/assets/images/col2-4.png',
      '/assets/images/col2-5.png',
    ],
    [
      '/assets/images/col3-1.png',
      '/assets/images/col3-2.png',
      '/assets/images/col3-3.png',
      '/assets/images/col3-4.png',
      '/assets/images/col3-5.png',
    ],
    [
      '/assets/images/col4-1.png',
      '/assets/images/col4-2.png',
      '/assets/images/col4-3.png',
      '/assets/images/col4-4.png',
      '/assets/images/col4-5.png',
    ],
    [
      '/assets/images/col5-1.png',
      '/assets/images/col5-2.png',
      '/assets/images/col5-3.png',
      '/assets/images/col5-4.png',
      '/assets/images/col5-5.png',
    ],
  ]

  // duplicate each column once to loop seamlessly
  const columns = useMemo(
    () => COL_IMAGES.map((col) => [...col, ...col]),
    [COL_IMAGES]
  )

  return (
    <section className="wrap">
      <h2 className="title">
        Design<span>Sorcery</span>
      </h2>

      <div className="gallery" aria-label="Design gallery">
        {columns.map((col, idx) => {
          const dir = idx % 2 === 0 ? 'up' : 'down' // 1,3,5 up; 2,4 down
          // vary speed slightly per column
          const dur = 26 + idx * 2
          return (
            <div
              key={idx}
              className={`col ${dir}`}
              style={{ ['--dur' as any]: `${dur}s` }}
            >
              <div className="stack">
                {col.map((src, i) => (
                  <figure key={i} className="card">
                    <img src={src} alt="" loading="lazy" />
                  </figure>
                ))}
              </div>
            </div>
          )
        })}

        {/* top/bottom fades */}
        <div className="fade fade-top" aria-hidden />
        <div className="fade fade-bottom" aria-hidden />
      </div>

      <button
        className="cta"
        onClick={onButtonClick || (() => {})}
        type="button"
        aria-label={buttonText}
      >
        {buttonText}
      </button>

      <style jsx>{`
        .wrap {
          background: #000;
          color: #fff;
          padding: 150px 16px 80px;
          min-height: 100vh;
        }

        .title {
          text-align: center;
          font-size: 3rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: #fff;
          margin-bottom: 10px;
        }
        .title span {
        color: #ffd700;
          font-family: 'Great Vibes', cursive;
          margin-left: 6px;
        }

        .gallery {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          padding: 6px;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            #000 10%,
            #000 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            #000 10%,
            #000 90%,
            transparent 100%
          );
        }

        .col {
          display: grid;
          gap: 18px;
          height: 800px;
          overflow: hidden;
          position: relative;
        }

        /* one long vertical stack that loops */
        .stack {
          display: grid;
          gap: 18px;
          animation-duration: var(--dur, 28s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-name: scrollUp;
        }
        .col.down .stack {
          animation-name: scrollDown;
        }

        /* pause all when hovered */
        .gallery:hover .stack {
          animation-play-state: paused;
        }

        .card {
          margin: 0;
          border-radius: 12px;
          background: #0b0b0b;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45),
            inset 0 0 0 1px rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }
        .card img {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 3 / 4;
          object-fit: cover;
        }

        .fade {
          pointer-events: none;
          position: absolute;
          left: 0;
          right: 0;
          height: 80px;
          z-index: 2;
        }
        .fade-top {
          top: 0;
          background: linear-gradient(to bottom, #000, transparent);
        }
        .fade-bottom {
          bottom: 0;
          background: linear-gradient(to top, #000, transparent);
        }

        .cta {
          display: block;
          margin: 24px auto 0;
          padding: 10px 22px;
          border-radius: 10px;
          border: 1px solid #77530a;
          background: linear-gradient(
            to right,
            #77530a,
            #ffd277,
            #77530a,
            #ffd277
          );
          background-size: 200%;
          background-position: left;
          color: #000;
          font-weight: 600;
          cursor: pointer;
          transition: background-position 0.8s ease;
          box-shadow: 0 6px 18px rgba(255, 210, 119, 0.15);
        }
        .cta:hover {
          background-position: right;
        }

        /* keyframes for infinite marquee */
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* responsive */
        @media (max-width: 1100px) {
          .gallery {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 900px) {
          .gallery {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .gallery {
            grid-template-columns: repeat(2, 1fr);
          }
          .col {
            height: 440px;
          }
        }
      `}</style>
    </section>
  )
}

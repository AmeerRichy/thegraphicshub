'use client'

import Image from 'next/image'
import React from 'react'

export default function Abouthero() {
  return (
    <section
      style={{
        backgroundImage: 'url("/assets/images/cardsbg.png")',
        backgroundSize: '1000px auto', // 👈 zoom in your pattern
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top left',
        imageRendering: 'pixelated',
        color: '#fff',
        padding: '150px 0 100px',
      }}
    >
      <div
        style={{
          width: '92%',
          maxWidth: 1240,
          margin: '0 auto',
        }}
      >
        {/* HEADING */}
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 6vw, 4rem)',
            lineHeight: 1.05,
            textAlign: 'center',
            margin: '0 0 60px',
            letterSpacing: '.5px',
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          About
          <span
            style={{
              color: '#F0C64A',
              fontFamily: 'Great Vibes, cursive',
              fontWeight: 400,
              marginLeft: 6,
            }}
          >
            Us
          </span>
        </h2>

        {/* GRID LAYOUT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1fr) minmax(360px, 560px)',
            alignItems: 'center',
            gap: 40,
            justifyContent: 'center',
          }}
        >
          {/* LEFT TEXT SECTION */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              minHeight: 500,
            }}
          >
            <div
              style={{
                maxWidth: 640,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: 1.8,
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                  color: '#d7d7d7',
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Welcome to Graphics Hub – Where Creativity Meets Magic!
              </p>

              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: 1.9,
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                  color: '#cfcfcf',
                  margin: 0,
                }}
              >
                At Graphics Hub, we bring visions to life with a touch of enchantment. From mesmerizing interiors &amp; exteriors to captivating UI/UX
                designs &amp; iconic branding, we craft visuals that leave a lasting impression. Every pixel &amp; detail is meticulously designed to
                reflect your unique story &amp; make your ideas unforgettable.
              </p>

              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: 1.9,
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                  color: '#cfcfcf',
                  margin: 0,
                }}
              >
                With a passion for innovation &amp; an eye for precision, we transform imagination into reality. Whether it’s a striking logo, a seamless
                digital experience, or a brand identity that resonates, we ensure every creation shines with creativity &amp; purpose.
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src="/assets/images/hm22.webp"
              alt="About Graphics Hub"
              width={720}
              height={560}
              priority
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 14,
                objectFit: 'cover',
                boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

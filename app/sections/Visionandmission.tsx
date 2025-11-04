'use client'

import Image from 'next/image'
import React from 'react'

export default function VisionMissionSection() {
  return (
    <section style={{ padding: '90px 0', color: '#fff' }}>
      <div
        style={{
          width: '92%',
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          alignItems: 'start',
          gap: 72,
        }}
      >
        {/* ================= LEFT: OUR VISION ================= */}
        <div>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              color: '#F0C64A',
              textAlign: 'center',
              fontSize: 'clamp(2rem, 3.4vw, 2.4rem)',
              margin: '0 0 18px',
              letterSpacing: '.3px',
            }}
          >
            Our Vision
          </h3>

          <div
            style={{
              maxWidth: 560,
              margin: '0 auto',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(0.95rem, 1.02vw, 1.05rem)',
              lineHeight: 1.9,
              color: '#cfcfcf',
              textAlign: 'left',
              letterSpacing: '.15px',
            }}
          >
            <p style={{ margin: '0 0 16px' }}>
              Our vision is to redefine the boundaries of design by blending creativity, innovation, &amp; strategy. We aim to be a beacon of
              inspiration, empowering brands to tell their stories through captivating visuals that leave a lasting impact.
            </p>
            <p style={{ margin: 0 }}>
              We strive to build a world where design isn’t just an aesthetic choice but a powerful tool for connection &amp; transformation. By
              consistently delivering exceptional, purpose-driven creations, we envision becoming a trusted partner for individuals &amp; businesses
              seeking to bring their ideas to life in extraordinary ways.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 560, margin: '24px auto 0' }}>
            <Image
              src="/assets/images/Vision.webp"
              alt="Our Vision"
              width={1120}
              height={840}
              priority
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 18,
                objectFit: 'cover',
                boxShadow: '0 16px 36px rgba(0,0,0,0.45)',
              }}
            />
          </div>
        </div>

        {/* ================= RIGHT: OUR MISSION ================= */}
        <div
          style={{
            marginTop: 'clamp(200px, 5vw, 140px)', // 👈 push the whole column down on desktop
          }}
        >
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              color: '#F0C64A',
              textAlign: 'center',
              fontSize: 'clamp(2rem, 3.4vw, 2.4rem)',
              margin: '0 0 18px',
              letterSpacing: '.3px',
            }}
          >
            Our Mission
          </h3>

          <div
            style={{
              maxWidth: 560,
              margin: '0 auto',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(0.95rem, 1.02vw, 1.05rem)',
              lineHeight: 1.9,
              color: '#cfcfcf',
              textAlign: 'left',
              letterSpacing: '.15px',
            }}
          >
            <p style={{ margin: '0 0 16px' }}>
              We believe every brand has a story—a unique magic waiting to be unleashed. At <strong>Graphics Hub</strong>, we specialize in{' '}
              <strong>branding, logo design, UI/UX, and digital experiences</strong>, crafting <strong>high-impact visuals</strong> that captivate &amp;
              inspire. Whether you’re a startup <strong>shaping your brand identity</strong> or an established business seeking a{' '}
              <strong>fresh perspective</strong>, we bring <strong>innovation &amp; precision</strong> to every design.
            </p>
            <p style={{ margin: 0 }}>
              From <strong>iconic logos</strong> to <strong>immersive UI/UX</strong>, our expert graphic design services ensure your brand stands out. We
              blend <strong>creativity, strategy &amp; storytelling</strong> to transform ideas into visuals that leave a lasting impression. At Graphics
              Hub, we don’t just design—we bring your vision to life.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 560, margin: '24px auto 0' }}>
            <Image
              src="/assets/images/Mission.webp"
              alt="Our Mission"
              width={1120}
              height={840}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 18,
                objectFit: 'cover',
                boxShadow: '0 16px 36px rgba(0,0,0,0.45)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile: remove the offset so stacking is clean */}
      <style jsx>{`
        @media (max-width: 1020px) {
          section > div {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
          section > div > div:nth-child(2) {
            margin-top: 0 !important; /* reset offset on mobile */
          }
        }
      `}</style>
    </section>
  )
}

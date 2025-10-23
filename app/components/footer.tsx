'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const socialLinks = [
    { label: 'Be', url: '#behance', title: 'Behance' },
    { label: 'fi', url: '#facebook', title: 'Facebook' },
    { label: 'in', url: '#linkedin', title: 'LinkedIn' },
    { label: '@', url: '#instagram', title: 'Instagram' },
    { label: 'f', url: '#facebook', title: 'Facebook' },
  ]

  const handleLinkHover = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  isEnter: boolean
) => {
  const target = e.currentTarget as HTMLAnchorElement
  target.style.color = isEnter ? '#d4af37' : '#888'
  target.style.transform = isEnter ? 'translateX(8px)' : 'translateX(0)'
}


  return (
    <footer
      style={{
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'Poppins, sans-serif',
        borderTop: '3px solid #d4af37',
        overflow: 'hidden',
        position: 'relative',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Golden Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '45%',
          height: '100%',
          background:
            'radial-gradient(circle at top right, rgba(212,175,55,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '60px 24px 0' : '100px 80px 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: isMobile ? '80px' : '200px',
          }}
        >
          {/* Left Links */}
          <div style={{ display: 'flex', gap: isMobile ? '60px' : '180px' }}>
            {/* Quick Links */}
            <div>
              <h3
                style={{
                  color: '#d4af37',
                  fontSize: isMobile ? '15px' : '17px',
                  fontWeight: 700,
                  marginBottom: '35px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  paddingBottom: '15px',
                  position: 'relative',
                }}
              >
                Quick Links
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '50px',
                    height: '2px',
                    background: 'linear-gradient(to right,#d4af37,transparent)',
                  }}
                />
              </h3>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {["FAQ's", 'Contact Us', 'Terms & Conditions'].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      style={{
                        color: '#888',
                        fontSize: isMobile ? '13px' : '14px',
                        textDecoration: 'none',
                        transition: 'all 0.4s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => handleLinkHover(e, true)}
                      onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Icons */}
              {!isMobile && (
                <div
                  style={{
                    marginTop: '50px',
                    display: 'flex',
                    gap: '16px',
                    paddingTop: '40px',
                    borderTop: '1px solid #222',
                  }}
                >
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      title={social.title}
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.4s',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#fff',
                        textDecoration: 'none',
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        border: '1.5px solid #333',
                        background: 'rgba(255,255,255,0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#d4af37'
                        e.currentTarget.style.borderColor = '#d4af37'
                        e.currentTarget.style.boxShadow =
                          '0 0 12px rgba(212,175,55,0.6), inset 0 0 12px rgba(212,175,55,0.1)'
                        e.currentTarget.style.background = 'rgba(212,175,55,0.08)'
                        e.currentTarget.style.transform = 'translateY(-4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.borderColor = '#333'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                        e.currentTarget.style.transform = 'none'
                      }}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Policies */}
            <div>
              <h3
                style={{
                  color: '#d4af37',
                  fontSize: isMobile ? '15px' : '17px',
                  fontWeight: 700,
                  marginBottom: '35px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  paddingBottom: '15px',
                  position: 'relative',
                }}
              >
                Policies
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '50px',
                    height: '2px',
                    background: 'linear-gradient(to right,#d4af37,transparent)',
                  }}
                />
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {['Refund Policy', 'Privacy Policy', 'Payment Policy'].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      style={{
                        color: '#888',
                        fontSize: isMobile ? '13px' : '14px',
                        textDecoration: 'none',
                        transition: 'all 0.4s',
                      }}
                      onMouseEnter={(e) => handleLinkHover(e, true)}
                      onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right GH */}
          <div style={{ textAlign: isMobile ? 'left' : 'right', maxWidth: isMobile ? '100%' : '420px' }}>
            <div
              style={{
                fontSize: isMobile ? '80px' : '110px',
                fontWeight: 900,
                color: '#d4af37',
                marginBottom: '25px',
                letterSpacing: '-4px',
                lineHeight: '0.9',
                textShadow: '0 0 40px rgba(212,175,55,0.25)',
                cursor: 'default',
              }}
            >
              GH
            </div>
            <p
              style={{
                color: '#999',
                fontSize: isMobile ? '12px' : '13.5px',
                lineHeight: '1.9',
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              "Graphics Hub" is your one-stop solution for stunning visual experiences. We specialize in
              creating captivating designs for social media, websites, branding, 3D, interiors, exteriors, &
              print materials. Let us elevate your brand with our expertise.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #333, transparent)',
            margin: isMobile ? '25px 0' : '40px 0',
          }}
        />

        {/* Copyright */}
        <div
          style={{
            color: '#666',
            fontSize: isMobile ? '11px' : '12px',
            textAlign: 'center',
            letterSpacing: '0.5px',
            fontWeight: 300,
            padding: isMobile ? '8px 0 12px' : '10px 0 15px',
            margin: 0,
            lineHeight: '1.6',
          }}
        >
          © 2025 – All Rights Reserved.{' '}
          <span style={{ color: '#d4af37', fontWeight: 600 }}>Graphics Hub.</span>
        </div>
      </div>
    </footer>
  )
}

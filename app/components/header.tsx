'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      {/* 🌟 Logo Section */}
      <div className="logo">
        <Image
          src="/assets/images/Logo.png"
          alt="Graphics Hub Logo"
          width={250}
          height={80}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* 🔗 Desktop Navigation */}
      <nav className="nav-desktop">
        {['Home', 'About Us', 'Gallery', 'Services', 'Contact Us'].map((item) => (
          <Link
            key={item}
            href={`/${item === 'Home' ? '' : item.toLowerCase().replace(/\s+/g, '-')}`}
            className={`nav-link ${item === 'Home' ? 'active' : ''}`}
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* 🍔 Mobile Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? 'open' : ''}`} />
        <div className={`bar ${menuOpen ? 'open' : ''}`} />
        <div className={`bar ${menuOpen ? 'open' : ''}`} />
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {['Home', 'About Us', 'Gallery', 'Services', 'Contact Us'].map((item) => (
            <Link
              key={item}
              href={`/${item === 'Home' ? '' : item.toLowerCase().replace(/\s+/g, '-')}`}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      {/* 💅 Inline CSS */}
    <style jsx>{`
  /* ===== Base Header ===== */
  .header {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 30px); /* ✅ Ensures no overflow */
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 16px;
    border: 1px solid rgba(255, 215, 0, 0.8);
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 9999;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-desktop {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .nav-link {
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #ffd700;
  }

  /* ===== Hamburger ===== */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 32px;
    height: 26px;
    cursor: pointer;
    z-index: 10000; /* Above menu */
  }

  .bar {
    width: 24px;
    height: 2px;
    background: #ffd700;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .bar.open:nth-child(1) {
    transform: rotate(45deg) translateY(8px);
  }
  .bar.open:nth-child(2) {
    opacity: 0;
  }
  .bar.open:nth-child(3) {
    transform: rotate(-45deg) translateY(-8px);
  }

  /* ===== Mobile Menu ===== */
  .mobile-menu {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    background: rgba(0, 0, 0, 0.85);
    border: 1px solid rgba(255, 215, 0, 0.5);
    border-radius: 12px;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    backdrop-filter: blur(10px);
    animation: fadeIn 0.3s ease;
  }

  .mobile-link {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    margin: 10px 0;
    transition: color 0.3s;
  }

  .mobile-link:hover {
    color: #ffd700;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ===== Responsive ===== */
  @media (max-width: 900px) {
    .nav-desktop {
      display: none;
    }
    .hamburger {
      display: flex;
    }
    .header {
      width: calc(100% - 20px);
      padding: 10px 20px;
    }
  }

  @media (max-width: 500px) {
    .header {
      width: calc(100% - 10px);
      padding: 8px 16px;
    }
  }
`}</style>

    </header>
  )
}

export default Header

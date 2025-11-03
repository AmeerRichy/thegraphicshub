'use client'

const HomeHero = () => (
  <section className="hero">
    {/* Full-width 4:3 frame — scales on all screens */}
    <div className="frame">
      <video
        className="vid"
        src="/assets/videos/tghh.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>

    <style jsx>{`
      .hero {
        position: relative;
        width: 100%;
        min-height: 100vh;
        overflow: hidden;
        background: black;
        display: flex;
        justify-content: center;
      }

      .frame {
        position: relative;
        width: 100vw;
        aspect-ratio: 4 / 3; /* 4:3, fills width */
        overflow: hidden;
      }

      .vid {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center bottom; /* keep bottom safe */
        transform: scale(1.01);
        transform-origin: center bottom;
        transition: transform 0.3s ease, object-position 0.3s ease;
      }

      /* ===== Mobile tweaks ===== */
      @media (max-width: 768px) {
        .hero {
          min-height: 80vh;
        }
        .frame {
          width: 100vw;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .vid {
          transform: scale(1.02) translateY(-3%); /* 👈 move slightly up */
          object-fit: contain;                    /* fit width */
          object-position: center bottom;
        }
      }
    `}</style>
  </section>
)

export default HomeHero

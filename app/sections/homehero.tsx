'use client'

const HomeHero = () => (
  <section
    style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {/* 🎥 Exact 16:9 container */}
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '56.25vw', // 9/16 = 0.5625 → keeps perfect 16:9 ratio
        maxHeight: '100vh',
        maxWidth: '177.78vh', // 16/9 = 1.7778 → keeps perfect ratio vertically too
      }}
    >
      <video
        src="/assets/videos/tghh.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain', // ✅ show entire frame
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>

    {/* ✨ Overlay Text */}
    {/* <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFD700',
        background: 'rgba(0,0,0,0.3)',
        pointerEvents: 'none',
      }}
    >
      <h1 style={{ fontSize: '4rem', fontWeight: 600 }}>
        Magic <span style={{ fontWeight: 'bold' }}>in every pixel</span>
      </h1>
    </div> */}
  </section>
)

export default HomeHero

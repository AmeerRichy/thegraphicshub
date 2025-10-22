'use client'

const HomeHero = () => {
  // ✅ Public MP4 link that works everywhere
  const videoUrl =
    'https://videos.pexels.com/video-files/855876/855876-hd_1280_720_25fps.mp4'

  return (
    <section
      id="home-hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* 🎥 Background Video */}
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* ✨ Overlay Text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#FFD700',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 600,
            fontFamily: 'cursive',
            textShadow: '0 0 20px rgba(255,215,0,0.5)',
          }}
        >
          Magic <span style={{ fontFamily: 'serif', fontWeight: 'bold' }}>in every pixel</span>
        </h1>
      </div>
    </section>
  )
}

export default HomeHero

'use client';
import Image from 'next/image';

type Props = {
  artSrc?: string;
};

export default function FaqHeroExact({
  artSrc = '/assets/images/FAQs.webp',
}: Props) {
  return (
    <section className="faq-hero">
      <div className="wrap">
        {/* Heading */}
        <h2 className="title">
          Frequently Asked
          <span className="highlight"> Questions</span>
        </h2>

        {/* Art (chat bubble + lamp) */}
        <div className="art">
          <Image
            src={artSrc}
            alt="FAQ chat bubble and lamp"
            width={200}      /* ✅ fixed width */
            height={164}     /* keeps original ~420x344 ratio */
            priority
            className="art-img"
          />
        </div>
      </div>

      <style jsx>{`
        /* --- Layout Canvas --- */
        .faq-hero {
          background: #000;
          width: 100%;
          padding: 150px 0 100px; /* match other heroes */
        }
        .wrap {
          position: relative;
          max-width: 1440px;
          margin: 0 auto;
          height: 600px; /* balanced for smaller art */
          padding: 0 72px;
        }

        /* --- Heading --- */
        .title {
          position: absolute;
          top: 50%;
          left: 180px; /* closer since art is smaller */
          transform: translateY(-42%);
          margin: 0;
          text-align: left;
          font-family: 'Arima', serif;
          font-weight: 700;
          font-size: clamp(2.6rem, 6vw, 4rem);
          line-height: 1.05;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.85);
        }
        .highlight {
          color: #f0c64a;
          font-family: 'Great Vibes', cursive;
          font-weight: 400;
          margin-left: 6px;
        }

        /* --- Art --- */
        .art {
          position: absolute;
          right: 100px;
          top: 60px;
          width: 200px;
          height: 164px;
        }
        .art-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        /* --- Responsive tweaks --- */
        @media (max-width: 1280px) {
          .wrap {
            height: 480px;
            padding: 0 48px;
          }
          .title {
            left: 100px;
            transform: translateY(-38%);
            font-size: clamp(2.2rem, 5vw, 3.2rem);
          }
          .art {
            right: 60px;
            top: 40px;
            width: 160px;
            height: 131px;
          }
        }
        @media (max-width: 768px) {
          .wrap {
            height: 360px;
            padding: 0 24px;
          }
          .title {
            left: 24px;
            transform: translateY(-36%);
            font-size: clamp(1.8rem, 6vw, 2.6rem);
          }
          .art {
            right: 24px;
            width: 140px;
            height: 115px;
            top: auto;
            bottom: 72px;
          }
        }
      `}</style>
    </section>
  );
}

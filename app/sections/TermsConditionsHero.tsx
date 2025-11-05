'use client';
import Image from 'next/image';

type Props = {
  artSrc?: string;
  note?: string;
};

export default function TermsConditionsHeroExact({
  artSrc = '/assets/images/Terms-Conditions.webp',
  note,
}: Props) {
  return (
    <section className="hero">
      <div className="wrap">
        {/* Heading */}
        <h2 className="title">
          Terms &<span className="highlight"> Conditions</span>
        </h2>

        {/* Right art */}
        <div className="art">
          <Image
            src={artSrc}
            alt="Terms and Conditions illustration"
            width={200}     /* ✅ fixed width */
            height={90}     /* proportional height */
            priority
            className="art-img"
          />
        </div>

        {/* Optional note */}
        {note && <p className="note">{note}</p>}
      </div>

      <style jsx>{`
        .hero {
          background: #000;
          width: 100%;
          padding: 150px 0 100px; /* same spacing as other heroes */
        }

        .wrap {
          position: relative;
          max-width: 1588px;
          margin: 0 auto;
          height: 600px; /* adjusted for smaller art */
          padding: 0 70px;
        }

        /* Heading */
        .title {
          position: absolute;
          top: 50%;
          left: 200px; /* closer for better balance */
          transform: translateY(-55%);
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
          font-family: 'Corinthia, Sans-serif';
          font-weight: 400;
          margin-left: 6px;
        }

        /* Art */
        .art {
          position: absolute;
          right: 200px;
          top: 100px;
          width: 200px;
          height: 90px;
        }

        .art-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        /* Note */
        .note {
          position: absolute;
          right: 100px;
          bottom: 20px;
          margin: 0;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.72);
        }

        /* Responsive */
        @media (max-width: 1280px) {
          .wrap {
            height: 480px;
            padding: 0 48px;
          }
          .title {
            left: 100px;
            transform: translateY(-38%);
          }
          .art {
            right: 60px;
            top: 40px;
            width: 160px;
            height: 72px;
          }
          .note {
            right: 60px;
            bottom: 16px;
            font-size: 14px;
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
            font-size: clamp(1.9rem, 6.5vw, 2.6rem);
          }
          .art {
            right: 24px;
            width: 140px;
            height: 63px;
            top: auto;
            bottom: 72px;
          }
          .note {
            right: 24px;
            bottom: 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}

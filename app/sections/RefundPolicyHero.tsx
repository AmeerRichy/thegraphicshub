'use client';
import Image from 'next/image';

type Props = {
  artSrc?: string;
  effectiveDate?: string;
};

export default function RefundPolicyHeroExact({
  artSrc = '/assets/images/Refund-Policy.webp',
  effectiveDate = 'December 1st, 2024.',
}: Props) {
  return (
    <section className="refund-hero">
      <div className="wrap">
        {/* Heading */}
        <h2 className="title">
          Refund
          <span className="highlight"> Policy</span>
        </h2>

        {/* Right art (wallet + lamp) */}
        <div className="art">
          <Image
            src={artSrc}
            alt="Wallet above genie lamp"
            width={200}     // ✅ adjusted width
            height={90}     // keep ratio ~2.2:1
            priority
            className="art-img"
          />
        </div>

        {/* Bottom-right effective date */}
        <p className="effective">
          <span className="label">Effective Date:</span> {effectiveDate}
        </p>
      </div>

      <style jsx>{`
        /* Canvas */
        .refund-hero {
          background: #000;
          width: 100%;
          padding: 150px 0 100px;
        }

        .wrap {
          position: relative;
          max-width: 1588px;
          margin: 0 auto;
          height: 600px; /* ✅ reduced overall height for smaller art */
          padding: 0 70px;
        }

        /* Heading */
        .title {
          position: absolute;
          top: 50%;
          left: 180px; /* ✅ shifted closer for smaller image */
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
          font-family: 'Corinthia, Sans-serif';
          font-weight: 400;
          margin-left: 6px;
        }

        /* Right art */
        .art {
          position: absolute;
          right: 100px; /* ✅ slightly closer to text */
          top: 60px;
          width: 200px;
          height: 90px;
        }
        .art-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Effective date */
        .effective {
          position: absolute;
          right: 100px;
          bottom: 20px;
          margin: 0;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.72);
        }
        .label {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.82);
        }

        /* Responsive tweaks */
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
          .effective {
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
          .effective {
            right: 24px;
            bottom: 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}

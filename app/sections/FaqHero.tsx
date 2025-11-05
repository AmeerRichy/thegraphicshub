'use client';
import Image from 'next/image';

type Props = { artSrc?: string };

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

        {/* Art */}
        <div className="art">
          <Image
            src={artSrc}
            alt="FAQ chat bubble and lamp"
            width={240}
            height={197}
            priority
            className="art-img"
          />
        </div>
      </div>

      <style jsx>{`
        /* ===== Tunables ===== */
        :root {
          --hero-min-h: clamp(460px, 80vh, 700px); /* drives vertical centering */
          --side-pad: 96px;                         /* desktop left/right padding */
          --gap: 48px;
        }

        .faq-hero {
          background: #000;
          color: #fff;
          width: 100%;
          padding-block: 200px 100px; /* match other heroes */
        }

        /* ===== Centered grid canvas ===== */
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding-inline: var(--side-pad);
          min-height: var(--hero-min-h);

          /* Perfect centering */
          display: grid;
          grid-template-columns: 1fr auto; /* title | art */
          align-items: center;              /* vertical centering */
          justify-content: space-between;
          gap: var(--gap);
        }

        /* ===== Heading ===== */
        .title {
          margin: 0;
          font-family: 'Arima', serif;
          font-weight: 700;
          font-size: clamp(2.6rem, 6vw, 4rem);
          line-height: 1.06;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.85);
          text-align: left;
          max-width: 18ch;
        }
        .highlight {
          color: #ffd700;
          font-family: 'Corinthia', serif;
          font-size: clamp(3rem, 4vw, 5rem);
          font-weight: 500;
          margin-left: -15px;
          display: inline-block;
        }

        /* ===== Art ===== */
        .art {
          display: grid;
          place-items: center;
        }
        .art-img {
          display: block;
          width: 100%;
          height: auto;
          max-width: 240px;
          object-fit: contain;
        }

        /* ===== Wide desktops ===== */
        @media (min-width: 1600px) {
          :root { --side-pad: 120px; }
        }

        /* ===== Large tablet ===== */
        @media (max-width: 1200px) {
          :root { --side-pad: 64px; --gap: 40px; }
          .art-img { max-width: 210px; }
        }

        /* ===== Tablet & below (stacked, perfectly centered) ===== */
        @media (max-width: 900px) {
          :root { --side-pad: 24px; --gap: 28px; }
          .wrap {
            grid-template-columns: 1fr;     /* stack */
            justify-items: center;          /* center horizontally */
            text-align: center;
            padding-inline: max(16px, env(safe-area-inset-left)) max(16px, env(safe-area-inset-right));
          }
          .title {
            text-align: center;
            max-width: 22ch;
          }
          .highlight { margin-left: -6px; }
          .art-img { max-width: min(58vw, 220px); }
        }

        /* ===== Phones ===== */
        @media (max-width: 600px) {
          .faq-hero { padding-block: 120px 80px; }
          .title {
            font-size: clamp(2rem, 7vw, 2.6rem);
            line-height: 1.1;
          }
          .highlight {
            font-size: clamp(2.2rem, 8.2vw, 2.8rem);
            margin-left: -4px;
          }
          .art-img { max-width: min(64vw, 200px); }
        }

        /* ===== Small phones ===== */
        @media (max-width: 400px) {
          .faq-hero { padding-block: 110px 70px; }
          .art-img { max-width: min(70vw, 180px); }
        }
      `}</style>
    </section>
  );
}

'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((res) => setTimeout(res, 1200))
      setStatus('✅ Message sent successfully!')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('❌ Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page">
      {/* ===== Top Headings ===== */}
      <header className="head">
        <h1 className="big">
          Contact
          <span>Us</span>
        </h1>
        <h2 className="sub">Reach Us Out</h2>
        <p className="subdesc">Let us know how to get back to you!</p>
      </header>

      {/* ===== Image + Form Row ===== */}
      <div className="container">
        {/* LEFT: Image same height as form */}
        <div className="photoCard">
          <Image
            src="/assets/images/10-e1731652606915.png"
            alt="Graphics Hub Visual"
            fill
            priority
            style={{ objectFit: 'cover', borderRadius: '20px' }}
          />
        </div>

        {/* RIGHT: Original form */}
        <div className="right">
          <div className="formBox">
            <h3>Get In Touch</h3>
            <p className="desc">Tell us a bit about your project — we’ll reply soon.</p>

            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="field">
                  <label>Name</label>
                  <input type="text" name="name" value={form.name} onChange={onChange} required />
                </div>

                <div className="field">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required />
                </div>
              </div>

              <div className="row">
                <div className="field">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={onChange} required />
                </div>
              </div>

              <div className="field">
                <label>Message</label>
                <textarea name="message" rows={4} value={form.message} onChange={onChange} required />
              </div>

              <div className="wpforms-submit-container">
                <button type="submit" className="wpforms-submit" disabled={loading}>
                  {loading ? 'Sending...' : ''}
                </button>
              </div>

              {status && <p className="status">{status}</p>}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --teal: #018175;
          --beige: #f0e1c0;
          --dark: #0a0a0a;
        }

        .page {
          background: var(--dark);
          color: #fff;
          font-family: 'Arima', sans-serif;
          padding: 150px 16px 110px;
        }

        /* ===== Headings ===== */
        .head {
          text-align: center;
          margin-bottom: 28px;
        }
        .big {
          font-family: 'Arima', serif;
          font-weight: 700;
          font-size: clamp(2.6rem, 6vw, 4rem);
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 10px;
        }
        .big span {
          font-family: 'Corinthia, Sans-serif';
          color: #f0c64a;
          margin-left: 6px;
          font-weight: 400;
        }
        .sub {
          font-family: 'Arima', serif;
          color: #f0c64a;
          font-size: clamp(1.4rem, 2.6vw, 2rem);
          margin: 0 0 6px;
        }
        .subdesc {
          color: #cfd3db;
          opacity: 0.9;
          margin: 0;
        }

        /* ===== Layout ===== */
        .container {
          width: 92%;
          max-width: 1220px;
          margin: 30px auto 0;
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 40px;
          align-items: stretch; /* 👈 makes both same height */
        }

        /* Image same height as formBox */
        .photoCard {
          position: relative;
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          overflow: hidden;
        }

        /* ===== Original Form Styles ===== */
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .formBox {
          width: 100%;
          max-width: 600px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 50px 60px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
          height: 100%; /* 👈 ensures full stretch */
        }
        .formBox h3 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--beige);
        }
        .desc {
          font-size: 0.95rem;
          opacity: 0.8;
          margin-bottom: 32px;
        }

        .row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .field {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 18px;
        }
        label {
          font-size: 0.9rem;
          color: #ccc;
        }
        input,
        textarea {
          background: #141414;
          border: 1px solid #2a2a2a;
          color: #fff;
          padding: 12px 14px;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input:focus,
        textarea:focus {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(1, 129, 117, 0.25);
        }

        /* === Gold Button === */
        .wpforms-submit-container {
          display: flex;
          justify-content: flex-end;
        }
        .wpforms-submit {
          width: 150px;
          height: 40px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(
            to right,
            #77530a,
            #ffd277,
            #77530a,
            #77530a,
            #ffd277,
            #77530a
          );
          background-size: 200%;
          background-position: left;
          color: #ffd277;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-position 1s;
          overflow: hidden;
        }
        .wpforms-submit::before {
          position: absolute;
          content: 'Submit';
          color: #ffd277;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 97%;
          height: 90%;
          border-radius: 8px;
          background-color: rgba(0, 0, 0, 0.84);
          background-size: 200%;
          background-position: left;
          transition: background-position 1s;
        }
        .wpforms-submit:hover {
          background-position: right;
        }
        .wpforms-submit:hover::before {
          background-position: right;
        }
        .wpforms-submit:disabled {
          filter: grayscale(0.6) brightness(0.8);
          cursor: not-allowed;
        }

        .status {
          font-size: 0.9rem;
          margin-top: 10px;
          opacity: 0.85;
        }

        /* ===== Responsive ===== */
        @media (max-width: 1024px) {
          .container {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .photoCard {
            aspect-ratio: 16/9;
            height: auto;
          }
          .right {
            padding: 0 6px;
          }
          .wpforms-submit-container {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}

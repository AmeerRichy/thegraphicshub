'use client'
import { useMemo, useRef, useState, useEffect } from 'react'
import Image from 'next/image'

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  company?: string // honeypot
}

export default function ContactUs() {
  const [values, setValues] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    company: '',
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const canSubmit = useMemo(() => {
    const { firstName, email, message, company } = values
    const emailOk = /^\S+@\S+\.\S+$/.test(email)
    return !!firstName && emailOk && message.trim().length >= 10 && !company
  }, [values])

  useEffect(() => {
    if (!status) return
    const t = setTimeout(() => setStatus(null), 4500)
    return () => clearTimeout(t)
  }, [status])

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues(v => ({ ...v, [k]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) {
      setStatus({ ok: false, text: 'Please fill the required fields properly.' })
      return
    }
    try {
      setLoading(true)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('fail')
      setStatus({ ok: true, text: 'Thanks! We’ll get back to you shortly.' })
      setValues({ firstName: '', lastName: '', email: '', phone: '', message: '', company: '' })
      formRef.current?.reset()
    } catch {
      setStatus({ ok: false, text: 'Something went wrong. Try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="lux">
      <header className="head">
        <h2 className="title">
          Contact<span>Us</span>
        </h2>
        <p className="sub">Let’s talk about your brand, visuals, or the next launch.</p>
      </header>

      <div className="shell">
        {/* Left visual */}
        <aside className="left">
          <div className="hero">
            <div className="hero-img">
              <Image
                src="/sample-card.jpg"
                alt="Graphics Hub"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="hero-badge">
              <span className="dot" />
              Graphics Hub · Since 2018
            </div>
          </div>

          {/* QUICK CONTACT CHIPS */}
          <div className="chips">
            <a className="chip" href="tel:+923255855580" aria-label="Call Graphics Hub">✆ Call</a>
            <a className="chip" href="mailto:hey@graphicshub.com" aria-label="Email Graphics Hub">✉ Email</a>
            <a className="chip" href="https://wa.me/923255855580" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              💬 WhatsApp
            </a>
          </div>
        </aside>

        {/* FORM */}
        <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
          {/* honeypot */}
          <input className="hp" name="company" autoComplete="off" value={values.company} onChange={onChange('company')} />

          <div className="row">
            <FloatInput label="First name *" name="firstName" value={values.firstName} onChange={onChange('firstName')} required />
            <FloatInput label="Last name" name="lastName" value={values.lastName} onChange={onChange('lastName')} />
          </div>

          <FloatInput
            label="Email *"
            type="email"
            name="email"
            value={values.email}
            onChange={onChange('email')}
            helper="We only use this to reply."
            required
          />

          <FloatInput
            label="Phone"
            name="phone"
            value={values.phone}
            onChange={onChange('phone')}
            placeholder="+92 3xx xxxxxxx"
          />

          <FloatTextarea
            label="Message *"
            name="message"
            value={values.message}
            onChange={onChange('message')}
            minLength={10}
            required
          />

          {/* GOLD GRADIENT SUBMIT (your Elementor style, Reactified) */}
          <button className="gh-submit" disabled={!canSubmit || loading} aria-busy={loading} type="submit">
            Submit
          </button>

          {status && <div className={`note ${status.ok ? 'ok' : 'err'}`}>{status.text}</div>}
        </form>
      </div>

      {/* CTA + SOCIAL (your showcased buttons, React version) */}
      <div className="ctaSocial">
        <h3 className="miniTitle">Get in Touch</h3>
        <div className="btnRow">
          {/* Call */}
          <a className="roundBtn call" href="tel:+923255855580" aria-label="Make a Call">
            <span className="sign">
              {/* phone svg */}
              <svg viewBox="0 0 512 512" width="20" height="20" aria-hidden>
                <path fill="currentColor" d="M141 209.38c17.22 31.02 37.04 60.82 62.81 88.02 25.83 27.33 57.94 52.21 99.56 73.45 3.08 1.51 6.01 1.51 8.61.47 3.97-1.51 7.99-4.78 11.97-8.75 3.07-3.07 6.9-7.99 10.92-13.38 15.99-21.05 35.81-47.16 63.76-34.1.61.28 1.09.61 1.7.89l93.27 53.64c.28.14.61.47.9.61 12.3 8.47 17.36 21.52 17.5 36.28 0 15.04-5.53 31.97-13.67 46.26-10.74 18.87-26.58 31.35-44.84 39.63-17.35 7.99-36.7 12.3-55.29 15.04-29.18 4.3-56.51 1.56-84.47-7.05-27.34-8.46-54.86-22.42-84.94-41l-2.23-1.42c-13.81-8.61-28.71-17.83-43.32-28.71-53.59-40.44-108.12-98.8-143.64-163.03C9.81 212.31-6.47 154.09 2.43 98.61 7.34 68.2 20.4 40.53 43.15 22.27 62.97 6.28 89.69-2.46 124.26.61c3.98.28 7.52 2.6 9.37 6.01l59.78 101.07c8.75 11.35 9.37 29.31-2.13 44.54-13.09 17.64-28.99 37.18-50.28 57.15z"/>
              </svg>
            </span>
            <span className="txt">Call</span>
          </a>

          {/* WhatsApp */}
          <a className="roundBtn wa" href="https://wa.me/923255855580" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <span className="sign">
              <svg viewBox="0 0 509 511.514" width="20" height="20" aria-hidden>
                <path fill="currentColor" d="M434.762 74.334C387.553 26.81 323.245 0 256.236 0h-.768C115.795.001 2.121 113.696 2.121 253.456l.001.015a253.516 253.516 0 0033.942 126.671L0 511.514l134.373-35.269a253.416 253.416 0 00121.052 30.9h.003.053C395.472 507.145 509 393.616 509 253.626c0-67.225-26.742-131.727-74.252-179.237l.014-.055zM255.555 464.453c-37.753 0-74.861-10.22-107.293-29.479l-7.72-4.602-79.741 20.889 21.207-77.726-4.984-7.975c-21.147-33.606-32.415-72.584-32.415-112.308 0-116.371 94.372-210.743 210.741-210.743 56.011 0 109.758 22.307 149.277 61.98a210.93 210.93 0 0161.744 149.095c0 116.44-94.403 210.869-210.844 210.869h.028zm115.583-157.914c-6.363-3.202-37.474-18.472-43.243-20.593-5.769-2.121-10.01-3.202-14.315 3.203-4.305 6.404-16.373 20.593-20.063 24.855-3.69 4.263-7.401 4.815-13.679 1.612-6.278-3.202-26.786-9.883-50.899-31.472a192.748 192.748 0 01-35.411-43.867c-3.712-6.363-.404-9.777 2.82-12.873 3.224-3.096 6.363-7.381 9.48-11.092a41.58 41.58 0 006.357-10.597 11.678 11.678 0 00-.508-11.09c-1.718-3.18-14.444-34.357-19.534-47.06-5.09-12.703-10.37-10.603-14.272-10.901-3.902-.297-7.911-.19-12.089-.19a23.322 23.322 0 00-16.964 7.911c-5.707 6.298-22.1 21.673-22.1 52.849s22.671 61.249 25.852 65.532c3.182 4.284 44.663 68.227 108.288 95.649 15.099 6.489 26.891 10.392 36.053 13.403a87.504 87.504 0 0025.216 3.718c4.905 0 9.82-.416 14.65-1.237 12.174-1.782 37.453-15.291 42.776-30.073s5.303-27.57 3.711-30.093c-1.591-2.524-5.704-4.369-12.088-7.615l-.038.021z"/>
              </svg>
            </span>
            <span className="txt">WhatsApp</span>
          </a>
        </div>

        <h3 className="miniTitle mt">Stay Connected</h3>
        <div className="socialRow">
          {/* Facebook */}
          <a className="socialBtn fb" href="https://www.facebook.com/graphicshub3878" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <span className="bg" />
            <span className="iconBox">
              <svg viewBox="0 0 320 512" height="20" aria-hidden fill="white">
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>
              </svg>
            </span>
          </a>

          {/* Instagram */}
          <a className="socialBtn ig" href="https://www.instagram.com/graphics___hub/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <span className="bg" />
            <span className="iconBox">
              <svg viewBox="0 0 448 512" height="22" aria-hidden fill="white">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </span>
          </a>
        </div>
      </div>

      <style jsx>{`
        :global(:root){
          --gold:#FFD700;
          --gold2:#E6C300;
          --ink:#0b0b0b;
          --ink2:#000;
        }
        .lux{ padding:110px 6% 120px; background: radial-gradient(110rem 70rem at 55% 20%, var(--ink) 0%, var(--ink2) 100%); color:#fff; }
        .head{ text-align:center; margin-bottom:56px; }
        .title{ font:700 3.1rem/1 'Playfair Display',serif; }
        .title span{ color:var(--gold); font-family:'Great Vibes',cursive; margin-left:6px; }
        .sub{ max-width:680px; margin:14px auto 0; opacity:.8; font:400 1.05rem/1.7 Poppins,system-ui; }

        .shell{ display:grid; grid-template-columns:minmax(280px,560px) minmax(360px,1fr); gap:48px; align-items:start; }
        .left{ display:flex; flex-direction:column; gap:18px; }
        .hero{ position:relative; height:420px; border-radius:24px; overflow:hidden; box-shadow:0 18px 60px rgba(0,0,0,.55); }
        .hero::after{ content:''; position:absolute; inset:0; background: radial-gradient(80rem 30rem at 0% 100%, rgba(255,215,0,.18), transparent 65%); mix-blend:screen; }
        .hero-img{ position:absolute; inset:0; }
        .hero-badge{ position:absolute; left:18px; bottom:18px; padding:10px 14px; border-radius:999px; background:rgba(0,0,0,.55); border:1px solid rgba(255,215,0,.25); backdrop-filter:blur(8px); display:flex; gap:8px; align-items:center; font:600 .92rem/1 Poppins,system-ui; }
        .dot{ width:8px; height:8px; border-radius:50%; background:var(--gold); box-shadow:0 0 12px rgba(255,215,0,.8); }
        .chips{ display:flex; flex-wrap:wrap; gap:10px; }
        .chip{ padding:10px 14px; border-radius:999px; background:rgba(255,215,0,.08); border:1px solid rgba(255,215,0,.24); text-decoration:none; color:#fff; transition:.2s; }
        .chip:hover{ transform:translateY(-1px); box-shadow:0 10px 30px rgba(255,215,0,.12); }

        .form{ padding:10px; }
        .row{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }

        /* FLOATING INPUTS (minimal underline) */
        .fi{ position:relative; padding-top:14px; }
        .inp,.ta{ width:100%; background:transparent; color:#fff; border:none; border-bottom:1px solid rgba(255,215,0,.22); padding:14px 2px 12px; outline:none; font:500 1rem/1.4 Poppins,system-ui; transition:border-color .2s ease, box-shadow .2s ease; }
        .ta{ resize:vertical; font:500 1rem/1.6 Poppins,system-ui; }
        .inp:focus,.ta:focus{ border-color:rgba(255,215,0,.75); box-shadow:0 6px 0 -4px rgba(255,215,0,.28); }
        .lab{ position:absolute; left:2px; top:18px; color:#d9d9d9; opacity:.85; transform-origin:left top; transition: transform .15s ease, color .2s ease, opacity .2s ease; pointer-events:none; }
        .inp:focus + .lab,.ta:focus + .lab,.has + .lab{ transform:translateY(-16px) scale(.86); color:var(--gold); opacity:.95; }

        .hp{ position:absolute; left:-9999px; top:-9999px; opacity:0; }
        .note{ margin-top:14px; padding:12px 14px; border-radius:12px; border:1px solid transparent; font:500 .95rem/1.4 Poppins,system-ui; }
        .note.ok{ background:rgba(8,140,92,.18); border-color:rgba(8,140,92,.38); }
        .note.err{ background:rgba(180,45,45,.18); border-color:rgba(180,45,45,.38); }

        /* GOLD SUBMIT (Elementor style -> React) */
        .gh-submit{
          width:150px; height:40px; margin-top:16px;
          border:none; border-radius:10px;
          background:linear-gradient(to right,#77530a,#ffd277,#77530a,#77530a,#ffd277,#77530a);
          background-size:200%;
          background-position:left;
          color:#ffd277; font-weight:700; letter-spacing:.2px;
          display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden; cursor:pointer;
          transition: background-position 1s ease, transform .15s ease;
        }
        .gh-submit::before{
          content:"Submit"; position:absolute; inset:5%; display:flex; align-items:center; justify-content:center;
          color:#ffd277; border-radius:8px; background:rgba(0,0,0,.84); background-size:200%; background-position:left;
          transition: background-position 1s ease;
        }
        .gh-submit:hover{ background-position:right; }
        .gh-submit:hover::before{ background-position:right; }
        .gh-submit:disabled{ filter:grayscale(.4) brightness(.85); cursor:not-allowed; }

        /* CTA & SOCIAL BLOCK */
        .ctaSocial{ margin-top:70px; text-align:center; }
        .miniTitle{ font-family:'Playfair Display',serif; font-weight:700; color:var(--gold); font-size:1.6rem; margin-bottom:12px; }
        .miniTitle.mt{ margin-top:26px; }
        .btnRow{ display:flex; gap:15px; justify-content:center; }

        /* Round gradient buttons (your .Btn refined) */
        .roundBtn{
          --size:60px;
          position:relative; display:flex; align-items:center; justify-content:center;
          width:var(--size); height:var(--size);
          border-radius:50px; overflow:hidden; text-decoration:none; color:#ffd277;
          background:linear-gradient(to right,#77530a,#ffd277,#77530a,#77530a,#ffd277,#77530a);
          background-size:250%; background-position:left;
          box-shadow:2px 2px 10px rgba(0,0,0,.2);
          transition: background-position .3s ease, width .3s ease, transform .1s ease;
        }
        .roundBtn::before{
          content:'';
          position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
          width:90%; height:90%; border-radius:25px;
          background:rgba(0,0,0,.84);
        }
        .roundBtn .sign{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); display:flex; }
        .roundBtn .txt{ opacity:0; color:#ffd277; font-weight:600; margin-left:20px; transform:translateX(-20px); transition:.3s ease; white-space:nowrap; }
        .roundBtn:hover{ background-position:center; width:125px; }
        .roundBtn:hover .txt{ opacity:1; transform:translateX(0); }
        .roundBtn:hover .sign{ left:25px; transform:translate(0,-50%); }
        .roundBtn:active{ transform:translate(2px,2px); }
        .wa:hover{ width:175px; } /* wider for WhatsApp text */

        /* Social buttons (your second snippet) */
        .socialRow{ display:flex; gap:14px; justify-content:center; margin-top:12px; }
        .socialBtn{
          position:relative; width:45px; height:45px; display:flex; align-items:center; justify-content:center;
          border:none; background:transparent; border-radius:10px; cursor:pointer; text-decoration:none;
        }
        .socialBtn .bg{
          position:absolute; inset:0; border-radius:10px; z-index:-1; transition:transform .3s ease; transform-origin:bottom;
          background:#1877f2;
        }
        .socialBtn .iconBox{
          display:flex; align-items:center; justify-content:center; backdrop-filter:blur(10px); border-radius:10px; transition:.3s;
          width:100%; height:100%; border:0.5px solid transparent;
        }
        .socialBtn:hover .bg{ transform:rotate(35deg); }
        .socialBtn:hover .iconBox{ border-color:#fff; backdrop-filter:blur(4px); }
        .socialBtn.ig .bg{
          background:linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5);
        }

        @media (max-width:1060px){
          .shell{ grid-template-columns:1fr; }
          .hero{ height:320px; }
          .row{ grid-template-columns:1fr; }
        }
      `}</style>
    </section>
  )
}

/* ---------- Minimal floating inputs ---------- */
function FloatInput({
  label, name, value, onChange, required, type='text', placeholder, helper,
}: {
  label: string; name: string; value: string; onChange: any; required?: boolean; type?: string; placeholder?: string; helper?: string
}) {
  const filled = !!value
  return (
    <div className="fi">
      <input
        className={`inp ${filled ? 'has' : ''}`}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ' '}
        required={required}
        autoComplete="off"
      />
      <label htmlFor={name} className="lab">{label}</label>
      {helper && <small style={{display:'block', marginTop:6, opacity:.75}}>{helper}</small>}
    </div>
  )
}

function FloatTextarea({
  label, name, value, onChange, required, minLength,
}: { label: string; name: string; value: string; onChange: any; required?: boolean; minLength?: number }) {
  const filled = !!value
  return (
    <div className="fi">
      <textarea
        className={`ta ${filled ? 'has' : ''}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        placeholder=" "
        rows={6}
      />
      <label htmlFor={name} className="lab">{label}</label>
    </div>
  )
}

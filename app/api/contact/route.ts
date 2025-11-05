export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const preferredRegion = 'home'

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const fromIdentity = process.env.MAIL_FROM || `Website <${process.env.GMAIL_USER}>`
    const ownerEmail = process.env.OWNER_EMAIL || process.env.GMAIL_USER

    await transporter.sendMail({
      from: fromIdentity,
      to: ownerEmail,
      replyTo: email,
      subject: `New Contact: ${name} (${email})`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace;">${String(message)}</pre>
        <hr/><small>Sent from your website contact form.</small>
      `,
    })

    await transporter.sendMail({
      from: fromIdentity,
      to: email,
      subject: 'We received your message — Graphics Hub',
      html: `
        <p>Hi ${name.split(' ')[0] || 'there'},</p>
        <p>Thanks for reaching out! We’ve received your message and will get back to you shortly.</p>
        <blockquote style="border-left:4px solid #ddd;padding-left:10px;margin:0;">
          ${String(message).replace(/\n/g, '<br/>')}
        </blockquote>
        <p style="margin-top:16px;">— Graphics Hub Team</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Mailer error:', err)
    return NextResponse.json({ ok: false, error: err?.message || 'Mail failed' }, { status: 500 })
  }
}

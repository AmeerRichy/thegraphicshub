import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/admin')) return NextResponse.next()

  const user = process.env.ADMIN_BASIC_USER
  const pass = process.env.ADMIN_BASIC_PASS
  if (!user || !pass) return NextResponse.next()

  const auth = req.headers.get('authorization') || ''
  const [scheme, encoded] = auth.split(' ')
  if (scheme === 'Basic' && encoded) {
    const [u, p] = Buffer.from(encoded, 'base64').toString().split(':')
    if (u === user && p === pass) return NextResponse.next()
  }
  return new NextResponse('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
  })
}

export const config = { matcher: ['/admin/:path*'] }

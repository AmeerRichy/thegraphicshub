import { NextResponse } from 'next/server'
import { dbConnect } from '@/app/libs/mongoose'
import { ImageModel } from '@/app/libs/Image'
import { isValidCategoryCode } from '@/app/libs/categories'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET /api/images?cat=PRINT_MEDIA&page=1&limit=24
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const rawCat = searchParams.get('cat') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '24', 10)
    const skip = (page - 1) * limit

    await dbConnect()
    const query: any = {}
    if (rawCat) {
      if (!isValidCategoryCode(rawCat)) {
        return NextResponse.json({ ok: false, error: 'Invalid category' }, { status: 400 })
      }
      query.category = rawCat
    }

    const [items, total] = await Promise.all([
      ImageModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ImageModel.countDocuments(query),
    ])

    return NextResponse.json({
      ok: true,
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    })
  } catch (err: any) {
    console.error('Public GET error:', err)
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}

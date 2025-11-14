import { NextResponse } from 'next/server'
import cloudinary from '@/app/libs/cloudinary'
import { dbConnect } from '@/app/libs/mongoose'
import { ImageModel } from '@/app/libs/Image'
import { isValidCategoryCode } from '@/app/libs/categories'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const maxDuration = 60

// GET /api/admin/images?cat=&limit=&page=
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
        return NextResponse.json(
          { ok: false, error: 'Invalid category' },
          { status: 400 }
        )
      }
      query.category = rawCat
    }

    const [items, total] = await Promise.all([
      ImageModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
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
    console.error('Admin GET error:', err)
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/images?id=<mongoId>
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    await dbConnect()
    const doc = await ImageModel.findById(id)
    if (!doc) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    try {
      // if cloudinary publicId is present
      // @ts-ignore
      if (doc.publicId) {
        // @ts-ignore
        await cloudinary.uploader.destroy(doc.publicId)
      }
    } catch (e) {
      console.warn('Cloudinary delete failed', e)
    }

    await doc.deleteOne()
    return NextResponse.json({ ok: true, deleted: id })
  } catch (err: any) {
    console.error('Admin DELETE error:', err)
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/images  { ids: string[], category: string }
export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { ids, category } = body as {
      ids?: string[]
      category?: string
    }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'ids[] required' },
        { status: 400 }
      )
    }

    if (!category || !isValidCategoryCode(category)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid category' },
        { status: 400 }
      )
    }

    await dbConnect()

    const result: any = await ImageModel.updateMany(
      { _id: { $in: ids } },
      { $set: { category } }
    )

    return NextResponse.json({
      ok: true,
      matched: result.matchedCount ?? result.n,
      modified: result.modifiedCount ?? result.nModified,
    })
  } catch (err: any) {
    console.error('Admin PATCH error:', err)
    return NextResponse.json(
      { ok: false, error: err.message || 'Bulk update failed' },
      { status: 500 }
    )
  }
}

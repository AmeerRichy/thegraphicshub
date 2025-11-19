import { NextResponse } from 'next/server'
import { dbConnect } from '@/app/libs/mongoose'
import cloudinary from '@/app/libs/cloudinary'
import { ImageModel } from '@/app/libs/Image'
import {
  isValidCategoryCode,
  isValidSubcategory,
  SUBCATEGORIES,
  getSubcategories,
} from '@/app/libs/categories'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const maxDuration = 60

// ===========================================================
// GET — /api/admin/images?cat=&sub=&page=&limit=
// ===========================================================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const rawCat = searchParams.get('cat') || ''
    const rawSub = searchParams.get('sub') || '' // ⭐ NEW
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '24', 10)
    const skip = (page - 1) * limit

    await dbConnect()

    const query: any = {}

    // Category filter
    if (rawCat) {
      if (!isValidCategoryCode(rawCat)) {
        return NextResponse.json(
          { ok: false, error: 'Invalid category' },
          { status: 400 }
        )
      }
      query.category = rawCat
    }

    // Subcategory filter
    if (rawSub && rawSub !== 'ALL') {
      if (!isValidCategoryCode(rawCat)) {
        return NextResponse.json(
          { ok: false, error: 'Category required before filtering subcategory' },
          { status: 400 }
        )
      }

      if (!isValidSubcategory(rawCat, rawSub)) {
        return NextResponse.json(
          { ok: false, error: 'Invalid subcategory' },
          { status: 400 }
        )
      }

      query.subcategory = rawSub
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

// ===========================================================
// DELETE — /api/admin/images?id=
// ===========================================================
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    await dbConnect()

    const doc = await ImageModel.findById(id)
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    try {
      if (doc.publicId) {
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

// ===========================================================
// PATCH — Bulk update category + optional subcategory
// ===========================================================
export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { ids, category, subcategory } = body as {
      ids?: string[]
      category?: string
      subcategory?: string | null
    }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'ids[] required' },
        { status: 400 }
      )
    }

    // Category validation
    if (!category || !isValidCategoryCode(category)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid category' },
        { status: 400 }
      )
    }

    // Subcategory validation (ONLY IF provided)
    if (subcategory && !isValidSubcategory(category, subcategory)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid subcategory' },
        { status: 400 }
      )
    }

    await dbConnect()

    const result = await ImageModel.updateMany(
      { _id: { $in: ids } },
      {
        $set: {
          category,
          subcategory: subcategory || null, // ⭐ SAVE OR CLEAR
        },
      }
    )

   return NextResponse.json({
  ok: true,
  matched: result.matchedCount,
  modified: result.modifiedCount,
})

  } catch (err: any) {
    console.error('Admin PATCH error:', err)
    return NextResponse.json(
      { ok: false, error: err.message || 'Bulk update failed' },
      { status: 500 }
    )
  }
}

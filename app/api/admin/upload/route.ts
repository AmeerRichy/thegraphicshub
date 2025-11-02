import { NextResponse } from 'next/server'
import cloudinary from '@/app/libs/cloudinary'
import { dbConnect } from '@/app/libs/mongoose'
import { ImageModel } from '@/app/libs/Image'
import { isValidCategoryCode } from '@/app/libs/categories'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const category = String(form.get('category') || '')
    const altPrefix = String(form.get('altPrefix') || '')
    const files = form.getAll('files') as File[]

    if (!category || files.length === 0) {
      return NextResponse.json({ error: 'category & files required' }, { status: 400 })
    }
    if (!isValidCategoryCode(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    await dbConnect()

    const toBuf = (f: File) => f.arrayBuffer().then(b => Buffer.from(b))

    const results = await Promise.all(
      files.map(async (file, idx) => {
        const buffer = await toBuf(file)
        const uploaded = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: `services/${category.toLowerCase()}` },
            (err, res) => (err ? reject(err) : resolve(res))
          )
          stream.end(buffer)
        })

        const { public_id, secure_url, width, height } = uploaded
        const thumbUrl = cloudinary.url(public_id, {
          width: 600,
          quality: 70,
          crop: 'limit',
          fetch_format: 'auto',
        })

        const doc = await ImageModel.create({
          category,
          alt: altPrefix || file.name.replace(/\.[^.]+$/, ''),
          width,
          height,
          publicId: public_id,
          url: secure_url,
          thumbUrl,
        })
        return doc
      })
    )

    return NextResponse.json({ ok: true, saved: results.length, images: results })
  } catch (e: any) {
    console.error('Admin UPLOAD error:', e)
    return NextResponse.json({ error: e.message || 'upload failed' }, { status: 500 })
  }
}

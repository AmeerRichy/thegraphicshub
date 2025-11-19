import { NextResponse } from 'next/server'
import cloudinary from '@/app/libs/cloudinary'
import { dbConnect } from '@/app/libs/mongoose'
import { ImageModel } from '@/app/libs/Image'
import { isValidCategoryCode, isValidSubcategory, SUBCATEGORIES } from '@/app/libs/categories'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const maxDuration = 60

// soft limit
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024 // 20MB

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const category = String(form.get('category') || '')
    const subcategory = String(form.get('subcategory') || '') || null  // ⭐ NEW
    const altPrefix = String(form.get('altPrefix') || '')

    const files = form.getAll('files') as File[]

    if (!category || files.length === 0) {
      return NextResponse.json({ error: 'category & files required' }, { status: 400 })
    }

    // Validate category
    if (!isValidCategoryCode(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    // Validate subcategory (ONLY IF provided)
    if (subcategory && !isValidSubcategory(category, subcategory)) {
      return NextResponse.json(
        { error: 'Invalid subcategory for this category' },
        { status: 400 }
      )
    }

    await dbConnect()

    const toBuf = (file: File) =>
      file.arrayBuffer().then(b => Buffer.from(b))

    const results = await Promise.all(
      files.map(async file => {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          throw new Error(
            `File "${file.name}" is too large. Max = ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB`
          )
        }

        const buffer = await toBuf(file)

        // ⭐ folder structure
        const folder = subcategory
          ? `services/${category.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`
          : `services/${category.toLowerCase()}`

const uploaded = await new Promise<any>((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    {
      folder,
      resource_type: "auto",   // ⭐ REQUIRED for video upload
      transformation:
        file.type.startsWith("image/")
          ? [
              {
                width: 2000,
                height: 2000,
                crop: "limit",
                quality: "auto:good",
                fetch_format: "auto",
              },
            ]
          : [], // ⭐ No transformations for video
    },
    (err, res) => (err ? reject(err) : resolve(res))
  )

  stream.end(buffer)
})


        const { public_id, secure_url, width, height } = uploaded

       const thumbUrl =
  file.type.startsWith("video/")
    ? cloudinary.url(public_id + ".jpg", {
        resource_type: "video",
        width: 250,
        height: 250,
        crop: "fill",
        gravity: "auto",
      })
    : cloudinary.url(public_id, {
        width: 250,
        height: 250,
        crop: "fill",
        gravity: "auto",
        fetch_format: "auto",
        quality: "auto:low",
      })


        const doc = await ImageModel.create({
          category,
          subcategory,                  // ⭐ SAVE SUBCATEGORY
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

    return NextResponse.json({
      ok: true,
      saved: results.length,
      images: results,
    })
  } catch (err: any) {
    console.error('Admin UPLOAD error:', err)
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    )
  }
}

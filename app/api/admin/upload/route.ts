import { NextResponse } from 'next/server'
import cloudinary from '@/app/libs/cloudinary'
import { dbConnect } from '@/app/libs/mongoose'
import { ImageModel } from '@/app/libs/Image'
import { isValidCategoryCode } from '@/app/libs/categories'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const maxDuration = 60

// soft size limit (optional)
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024 // 20 MB

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const category = String(form.get('category') || '')
    const altPrefix = String(form.get('altPrefix') || '')
    const files = form.getAll('files') as File[]

    if (!category || files.length === 0) {
      return NextResponse.json(
        { error: 'category & files required' },
        { status: 400 }
      )
    }
    if (!isValidCategoryCode(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      )
    }

    await dbConnect()

    const toBuf = (f: File) => f.arrayBuffer().then(b => Buffer.from(b))

    const results = await Promise.all(
      files.map(async (file, idx) => {
        // optional: guard very large files
        if (file.size > MAX_FILE_SIZE_BYTES) {
          throw new Error(
            `File "${file.name}" is too large (${(
              file.size /
              (1024 * 1024)
            ).toFixed(1)} MB). Max allowed is ${
              MAX_FILE_SIZE_BYTES / (1024 * 1024)
            } MB.`
          )
        }

        const buffer = await toBuf(file)

        const uploaded = await new Promise<any>((resolve, reject) => {
          // Optimize: resize + compress + auto format
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `services/${category.toLowerCase()}`,
              transformation: [
                {
                  width: 2000,
                  height: 2000,
                  crop: 'limit', // only downscale if bigger
                  quality: 'auto:good',
                  fetch_format: 'auto',
                },
              ],
            },
            (err, res) => (err ? reject(err) : resolve(res))
          )
          stream.end(buffer)
        })

        const { public_id, secure_url, width, height } = uploaded

        // Smaller, optimized variant for UI (grid/listing)
        const thumbUrl = cloudinary.url(public_id, {
          width: 800,
          quality: 'auto:good',
          crop: 'limit',
          fetch_format: 'auto',
        })

        const doc = await ImageModel.create({
          category,
          alt: altPrefix || file.name.replace(/\.[^.]+$/, ''),
          width,
          height,
          publicId: public_id,
          url: secure_url, // optimized original
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
  } catch (e: any) {
    console.error('Admin UPLOAD error:', e)
    return NextResponse.json(
      { error: e.message || 'upload failed' },
      { status: 500 }
    )
  }
}

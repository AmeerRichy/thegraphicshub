import { Schema, model, models } from 'mongoose'
import type { CategoryCode } from '@/app/libs/categories'
import { CATEGORY_CODES } from '@/app/libs/categories'

const ImageSchema = new Schema(
  {
    category: { type: String, enum: CATEGORY_CODES, required: true },

    // ⭐ NEW — optional subcategory
    subcategory: { type: String, default: null },

    alt: String,
    width: Number,
    height: Number,

    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    thumbUrl: { type: String, required: true },
  },
  { timestamps: true }
)

export type ImageDoc = {
  _id: string
  category: CategoryCode
  subcategory?: string | null   // ⭐ include subcategory in TypeScript

  alt?: string
  width?: number
  height?: number

  publicId: string
  url: string
  thumbUrl: string

  createdAt: Date
  updatedAt: Date
}

export const ImageModel = models.Image || model('Image', ImageSchema)

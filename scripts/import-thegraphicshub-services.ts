// @ts-nocheck
// scripts/import-thegraphicshub-services.ts
// One-time migration: WordPress Services page → your Cloudinary/Mongo via /api/admin/upload

import { load } from 'cheerio'

// --- CONFIG ---
// WordPress site
const WP_BASE = 'https://thegraphicshub.org'
const PAGE_SLUG = 'services'
const NEW_SITE_BASE = 'https://thegraphicshub.vercel.app'


// Your CategoryCode union – keep this in sync with libs/categories
type CategoryCode =
  | 'CHARACTER_DESIGN'
  | 'EDITING'
  | 'INTERIOR_EXTERIOR'
  | 'ILLUSTRATIONS'
  | 'INFOGRAPHICS'
  | 'LOGO_DESIGN'
  | 'PRINT_MEDIA'

// Map the section heading text on the services page → CategoryCode
const HEADING_TO_CATEGORY: Record<string, CategoryCode> = {
  'Character Design': 'CHARACTER_DESIGN',
  Editing: 'EDITING',
  'Interior/Exterior Design': 'INTERIOR_EXTERIOR',
  Illustrations: 'ILLUSTRATIONS',
  Infographics: 'INFOGRAPHICS',
  'Logo Design': 'LOGO_DESIGN',
  'Print Media': 'PRINT_MEDIA',
}

// If your /api/admin/upload needs auth, add headers here
const EXTRA_HEADERS: Record<string, string> = {
  // 'Authorization': 'Bearer YOUR_TOKEN',
}

// ---- Types for WP ----
type WPPage = {
  id: number
  slug: string
  title?: { rendered?: string }
  content: { rendered: string }
}

// --------------------------
// Step 1: Load WP page HTML
// --------------------------
async function fetchServiceHtml(): Promise<string> {
  const url = `${WP_BASE}/wp-json/wp/v2/pages?slug=${PAGE_SLUG}`
  console.log('GET', url)
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch WP page: ${res.status} ${res.statusText}`)
  }
  const json = (await res.json()) as WPPage[]
  if (!Array.isArray(json) || !json[0]) {
    throw new Error(`Page with slug "${PAGE_SLUG}" not found`)
  }
  const page = json[0]
  console.log('Found page:', page.title?.rendered || page.slug)
  return page.content.rendered
}

// --------------------------------------
// Step 2: Parse Elementor galleries HTML
// --------------------------------------
type ItemInfo = {
  src: string
  alt: string
  category: CategoryCode
}

function extractItems(html: string): ItemInfo[] {
  const $ = load(html)
  const items: ItemInfo[] = []

  // Look at all headings (h2/h3); if text matches a known category,
  // grab the gallery right after it.
  $('h2, h3').each((_, el) => {
    const headingText = $(el).text().trim()
    const category = HEADING_TO_CATEGORY[headingText]
    if (!category) return

    // Elementor usually wraps gallery in the next container.
    // We look for links with class "e-gallery-item".
    const $galleryRoot = $(el)
      .nextAll()
      .filter((_, n) => $(n).find('a.e-gallery-item').length > 0)
      .first()

    const $links = $galleryRoot.find('a.e-gallery-item')

    if ($links.length === 0) {
      console.warn(`⚠️ No gallery items found under heading "${headingText}"`)
      return
    }

    $links.each((_, a) => {
      const $a = $(a)
      const $img = $a.find('img').first()

      const src =
        $img.attr('src') ||
        $a.attr('href') || // fallback to href
        ''

      if (!src) return

      const alt =
        $img.attr('alt') ||
        $a.attr('data-elementor-lightbox-title') ||
        headingText

      items.push({ src, alt, category })
    })
  })

  console.log(`Extracted ${items.length} image(s) from services page`)
  return items
}

// --------------------------
// Step 3: Download + upload
// --------------------------
async function downloadBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to download image ${url} (${res.status})`)
  }
  const arr = await res.arrayBuffer()
  return Buffer.from(arr)
}

function fileNameFromUrl(url: string): string {
  const clean = url.split('?')[0]
  const parts = clean.split('/')
  return parts[parts.length - 1] || 'image.jpg'
}

async function uploadToPanel(
  buf: Buffer,
  filename: string,
  altPrefix: string,
  category: CategoryCode
) {
  const fd = new FormData()
  fd.append('category', category)
  fd.append('altPrefix', altPrefix)
  // TS would normally complain about Buffer -> BlobPart, but @ts-nocheck disables that.
  fd.append('files', new Blob([buf]), filename)

  const res = await fetch(`${NEW_SITE_BASE}/api/admin/upload`, {
    method: 'POST',
    body: fd,
    headers: {
      ...EXTRA_HEADERS,
    },
  })

  const json = await res.json().catch(() => ({} as any))

  if (!res.ok || json.ok === false) {
    console.error('Upload failed:', res.status, json)
    throw new Error(json.error || 'upload failed')
  }

  console.log(`✅ Uploaded ${filename} → ${category}`)
}

// --------------------------
// MAIN
// --------------------------
async function main() {
  try {
    const html = await fetchServiceHtml()
    const items = extractItems(html)

    if (!items.length) {
      console.log('No items extracted. Check headings / Elementor structure.')
      return
    }

    let index = 0
    for (const item of items) {
      index++
      const filename = fileNameFromUrl(item.src)
      console.log(
        `\n[${index}/${items.length}] Importing ${filename} (${item.category})`
      )

      try {
        const buf = await downloadBuffer(item.src)
        await uploadToPanel(buf, filename, item.alt, item.category)
      } catch (err: any) {
        console.error('❌ Failed:', err.message || err)
      }
    }

    console.log('\nDone — all service page images migrated to Cloudinary 👍')
  } catch (err: any) {
    console.error('Fatal error:', err.message || err)
  }
}

main()

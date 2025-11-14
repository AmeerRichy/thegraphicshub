// scripts/import-thegraphicshub-services.cjs
// One-time migration: WordPress Services page → your Cloudinary/Mongo via /api/admin/upload

const cheerio = require('cheerio')

// --- CONFIG ---
// WordPress site (old site)
const WP_BASE = 'https://thegraphicshub.org'
// slug of the services page (change if needed)
const PAGE_SLUG = 'services'

// Your new panel (Next.js app with /api/admin/upload)
const NEW_SITE_BASE = 'https://thegraphicshub.vercel.app' // <-- using your live URL

// Map the section heading text on the services page → your CategoryCode strings
const HEADING_TO_CATEGORY = {
  'Character Design': 'CHARACTER_DESIGN',
  Editing: 'EDITING',
  'Interior/Exterior Design': 'INTERIOR_EXTERIOR',
  Illustrations: 'ILLUSTRATIONS',
  Infographics: 'INFOGRAPHICS',
  'Logo Design': 'LOGO_DESIGN',
  'Print Media': 'PRINT_MEDIA',
}

// If your /api/admin/upload needs auth, add headers here
const EXTRA_HEADERS = {
  // 'Authorization': 'Bearer YOUR_TOKEN',
}

// --------------------------
// Step 1: Load WP page HTML
// --------------------------
async function fetchServiceHtml() {
  const url = `${WP_BASE}/${PAGE_SLUG}/`
  console.log('GET (front-end HTML)', url)

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch page HTML: ${res.status}`)
  }

  const html = await res.text()
  return html
}

// --------------------------------------
// Step 2: Parse Elementor galleries HTML
// --------------------------------------
function extractItems(html) {
  const $ = cheerio.load(html)
  const items = []

  // Look at all headings (h2/h3); if text matches a known category,
  // grab the gallery right after it.
  $('h2, h3').each((_, el) => {
    const headingText = $(el).text().trim()
    const category = HEADING_TO_CATEGORY[headingText]
    if (!category) return

    // Elementor usually wraps gallery in a container after heading.
    // Find the first next element that contains 'a.e-gallery-item'.
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
async function downloadBuffer(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to download image ${url} (${res.status})`)
  }
  const arr = await res.arrayBuffer()
  return Buffer.from(arr)
}

function fileNameFromUrl(url) {
  const clean = url.split('?')[0]
  const parts = clean.split('/')
  return parts[parts.length - 1] || 'image.jpg'
}

async function uploadToPanel(buf, filename, altPrefix, category) {
  const fd = new FormData()
  fd.append('category', category)
  fd.append('altPrefix', altPrefix)
  fd.append('files', new Blob([buf]), filename)

  const res = await fetch(`${NEW_SITE_BASE}/api/admin/upload`, {
    method: 'POST',
    body: fd,
    headers: {
      ...EXTRA_HEADERS,
    },
  })

  let json = {}
  try {
    json = await res.json()
  } catch (e) {
    // ignore parse error
  }

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
      } catch (err) {
        console.error('❌ Failed:', err.message || err)
      }
    }

    console.log('\nDone — all service page images migrated to Cloudinary 👍')
  } catch (err) {
    console.error('Fatal error:', err.message || err)
  }
}

main()

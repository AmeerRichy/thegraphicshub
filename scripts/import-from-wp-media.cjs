// scripts/import-from-wp-media.cjs
// Fetch ALL media from WordPress and upload to your Cloudinary/Mongo panel

const cheerio = require("cheerio");
const PAGE_SIZE = 100;

// WordPress site
const WP_BASE = "https://thegraphicshub.org";

// Your new Next.js app URL (production)
const NEW_SITE_BASE = "https://thegraphicshub.vercel.app";

// Category mapping by filename patterns
const CATEGORY_MAP = [
  { cat: "CHARACTER_DESIGN", match: ["character", "ai", "face", "people", "model"] },
  { cat: "EDITING", match: ["edit", "editing", "retouch", "manipulation", "composite"] },
  { cat: "INTERIOR_EXTERIOR", match: ["interior", "exterior", "architecture", "room"] },
  { cat: "ILLUSTRATIONS", match: ["illustration", "drawing", "sketch", "artwork"] },
  { cat: "INFOGRAPHICS", match: ["infographic", "info", "chart", "graph"] },
  { cat: "LOGO_DESIGN", match: ["logo", "branding"] },
  { cat: "PRINT_MEDIA", match: ["poster", "flyer", "print", "brochure", "media"] },
];

// If your upload API needs auth (optional)
const EXTRA_HEADERS = {
  // Authorization: "Bearer YOUR_TOKEN"
};

// ------------------------------------
// STEP 1 — Fetch all WP media items
// ------------------------------------
async function fetchAllMedia() {
  let page = 1;
  let items = [];

  while (true) {
    const url = `${WP_BASE}/wp-json/wp/v2/media?per_page=${PAGE_SIZE}&page=${page}`;
    console.log("GET", url);

    const res = await fetch(url);

    if (res.status === 400 || res.status === 404) break; // No more pages
    if (!res.ok) throw new Error("Failed to fetch media: " + res.status);

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    items.push(...data);
    page++;
  }

  console.log(`Fetched ${items.length} media files from WordPress.`);
  return items;
}

// ------------------------------------
// STEP 2 — Auto-detect category by filename
// ------------------------------------
function detectCategory(filename) {
  const lower = filename.toLowerCase();

  for (const rule of CATEGORY_MAP) {
    if (rule.match.some((key) => lower.includes(key))) {
      return rule.cat;
    }
  }

  return null; // Skip unknown
}

// ------------------------------------
// STEP 3 — Download file buffer
// ------------------------------------
async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to download " + url);
  return Buffer.from(await res.arrayBuffer());
}

function cleanFilename(url) {
  return url.split("?")[0].split("/").pop() || "image.jpg";
}

// ------------------------------------
// STEP 4 — Upload to your admin upload API
// ------------------------------------
async function uploadToPanel(buf, filename, category, alt) {
  const fd = new FormData();
  fd.append("category", category);
  fd.append("altPrefix", alt || filename);
  fd.append("files", new Blob([buf]), filename);

  const res = await fetch(`${NEW_SITE_BASE}/api/admin/upload`, {
    method: "POST",
    body: fd,
    headers: { ...EXTRA_HEADERS },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.ok === false) {
    console.error("Upload failed:", json);
    throw new Error("Upload failed");
  }

  console.log(`✅ Uploaded ${filename} → ${category}`);
}

// ------------------------------------
// MAIN SCRIPT
// ------------------------------------
async function main() {
  try {
    const media = await fetchAllMedia();

    let index = 0;

    for (const item of media) {
      index++;

      // skip non-image files
      if (!item.media_type || item.media_type !== "image") continue;
      if (!item.source_url) continue;

      const filename = cleanFilename(item.source_url);
      const category = detectCategory(filename);

      if (!category) {
        console.log(`⚠️ Skipping (no category matched): ${filename}`);
        continue;
      }

      console.log(`\n[${index}] Importing ${filename} (${category})`);

      try {
        const buf = await downloadBuffer(item.source_url);
        await uploadToPanel(buf, filename, category, item.title?.rendered || filename);
      } catch (err) {
        console.error("❌ Error on", filename, err.message);
      }
    }

    console.log("\n🎉 All WordPress media imported into your new panel!");
  } catch (err) {
    console.error("\nFATAL ERROR:", err.message);
  }
}

main();

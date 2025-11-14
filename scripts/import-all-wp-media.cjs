// scripts/import-all-wp-media.cjs
// Import ALL WordPress media → Cloudinary/Mongo through your panel
// FAST VERSION with parallel uploads

const PAGE_SIZE = 100;

// WordPress site
const WP_BASE = "https://thegraphicshub.org";

// Your live Next.js site with /api/admin/upload
const NEW_SITE_BASE = "https://thegraphicshub.vercel.app";

// Category for ALL imports
const DEFAULT_CATEGORY = "CHARACTER_DESIGN"; // you will change manually later

// Extra headers (if needed)
const EXTRA_HEADERS = {
  // Authorization: "Bearer token"
};

// --------------------------
// Fetch ALL WP media items
// --------------------------
async function fetchAllMedia() {
  let page = 1;
  let items = [];

  while (true) {
    const url = `${WP_BASE}/wp-json/wp/v2/media?per_page=${PAGE_SIZE}&page=${page}`;
    console.log("GET", url);

    const res = await fetch(url);

    if (res.status === 400 || res.status === 404) break; // no more pages
    if (!res.ok) throw new Error("Failed to fetch: " + res.status);

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    items.push(...data);
    page++;
  }

  console.log(`Fetched ${items.length} media files from WordPress.`);
  return items;
}

// --------------------------
// Helpers
// --------------------------
async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Download failed: " + url);
  return Buffer.from(await res.arrayBuffer());
}

function filenameFromURL(url) {
  return url.split("?")[0].split("/").pop() || "image.jpg";
}

// --------------------------
// Upload to your panel
// --------------------------
async function uploadToPanel(buf, filename, alt) {
  const fd = new FormData();
  fd.append("category", DEFAULT_CATEGORY);
  fd.append("altPrefix", alt || filename);
  fd.append("files", new Blob([buf]), filename);

  const res = await fetch(`${NEW_SITE_BASE}/api/admin/upload`, {
    method: "POST",
    body: fd,
    headers: { ...EXTRA_HEADERS },
  });

  let json = {};
  try {
    json = await res.json();
  } catch {}

  if (!res.ok || json.ok === false) {
    console.error("Upload failed:", json);
    throw new Error("Upload error");
  }

  console.log(`✅ Uploaded ${filename}`);
}

// --------------------------
// PARALLEL PROCESSING
// --------------------------
const CONCURRENCY = 10; // 10 uploads at a time (FAST)

async function processItem(item, index) {
  if (item.media_type !== "image") return;
  if (!item.source_url) return;

  const filename = filenameFromURL(item.source_url);
  const alt = item.title?.rendered || filename;

  console.log(`Importing [${index}] ${filename}`);

  try {
    const buf = await downloadBuffer(item.source_url);
    await uploadToPanel(buf, filename, alt);
  } catch (err) {
    console.error("❌ Error", filename, err.message);
  }
}

async function runInBatches(items, batchSize) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    await Promise.all(
      batch.map((item, idx) =>
        processItem(item, i + idx + 1)
      )
    );
  }
}

// --------------------------
// MAIN
// --------------------------
async function main() {
  try {
    const media = await fetchAllMedia();

    await runInBatches(media, CONCURRENCY);

    console.log("\n🎉 DONE — All WP media uploaded FAST!");
  } catch (err) {
    console.error("\nFATAL ERROR:", err.message);
  }
}

main();

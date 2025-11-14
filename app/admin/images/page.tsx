'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
  CATEGORY_CODES,
  CODE_TO_LABEL,
  type CategoryCode,
} from '@/app/libs/categories'

type Img = {
  _id: string
  category: CategoryCode
  alt?: string
  width?: number
  height?: number
  url: string
  thumbUrl: string
  createdAt: string
}

const ALL = 'ALL' as const
type CatFilter = typeof ALL | CategoryCode

export default function AdminImagesPage() {
  const [cat, setCat] = useState<CatFilter>(ALL)
  const [page, setPage] = useState(1)
  const [limit] = useState(24)
  const [items, setItems] = useState<Img[]>([])
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [bulkCat, setBulkCat] = useState<CategoryCode | ''>('')

  const pages = useMemo(() => Math.ceil(total / limit), [total, limit])
  const qCat = cat === ALL ? '' : cat

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `/api/admin/images?cat=${qCat}&page=${page}&limit=${limit}`,
        { cache: 'no-store' }
      )
      const json = await res.json()
      if (res.ok) {
        setItems(json.items)
        setTotal(json.total)
        setSelected(new Set()) // reset selection on new load
      } else {
        alert(json.error || 'Failed to load images')
      }
    } catch (e) {
      console.error(e)
      alert('Network error while loading images')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
  }, [cat])

  useEffect(() => {
    load()
  }, [cat, page])

  const delOne = async (id: string) => {
    if (!confirm('Delete this image?')) return
    const res = await fetch(`/api/admin/images?id=${id}`, { method: 'DELETE' })
    const json = await res.json()
    if (!res.ok) return alert(json.error || 'Delete failed')
    setItems(prev => prev.filter(i => i._id !== id))
    setTotal(t => t - 1)
    setSelected(s => {
      s.delete(id)
      return new Set(s)
    })
  }

  const delSelected = async () => {
    if (selected.size === 0) return
    if (!confirm(`Delete ${selected.size} image(s)?`)) return
    const ids = Array.from(selected)

    for (const id of ids) {
      try {
        await fetch(`/api/admin/images?id=${id}`, { method: 'DELETE' })
      } catch (e) {
        console.error('Failed to delete', id, e)
      }
    }

    setItems(prev => prev.filter(i => !selected.has(i._id)))
    setTotal(t => Math.max(0, t - selected.size))
    setSelected(new Set())
  }

  const bulkUpdateCategory = async () => {
    if (selected.size === 0) return
    if (!bulkCat) return alert('Please choose a category first.')

    if (
      !confirm(
        `Change category of ${selected.size} image(s) to "${
          CODE_TO_LABEL[bulkCat] || bulkCat
        }"?`
      )
    ) {
      return
    }

    const ids = Array.from(selected)

    try {
      const res = await fetch('/api/admin/images', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, category: bulkCat }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        return alert(json.error || 'Bulk category update failed')
      }

      // optimistic UI update
      setItems(prev =>
        prev.map(i =>
          selected.has(i._id) ? { ...i, category: bulkCat } : i
        )
      )
      setSelected(new Set())
    } catch (e) {
      console.error(e)
      alert('Network error while updating categories')
    }
  }

  const toggle = (id: string) =>
    setSelected(s => {
      const next = new Set(s)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const allIds = items.map(i => i._id)
  const allOnPageSelected =
    allIds.length > 0 && allIds.every(id => selected.has(id))
  const toggleAllOnPage = () =>
    setSelected(s => {
      const next = new Set(s)
      if (allOnPageSelected) {
        allIds.forEach(id => next.delete(id))
      } else {
        allIds.forEach(id => next.add(id))
      }
      return next
    })

  const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1
  const showingTo = showingFrom + items.length - 1

  return (
    <main className="wrap">
      <header className="bar">
        <div className="bar-left">
          <h1>Admin — Images</h1>
          <p className="subtitle">
            Showing {items.length ? `${showingFrom}–${showingTo}` : 0} of {total}{' '}
            {cat === ALL ? 'images' : `in “${cat}”`}
          </p>
        </div>

        <div className="filters">
          <label className="filter-label">
            Category
            <select
              value={cat}
              onChange={e => setCat(e.target.value as CatFilter)}
            >
              <option value={ALL}>{ALL}</option>
              {CATEGORY_CODES.map(c => (
                <option key={c} value={c}>
                  {CODE_TO_LABEL[c] || c}
                </option>
              ))}
            </select>
          </label>

          <div className="pages">
            <button
              disabled={page <= 1 || loading}
              onClick={() => setPage(p => p - 1)}
            >
              ‹ Prev
            </button>
            <span className="page-indicator">
              Page {page} / {Math.max(1, pages || 1)}
            </span>
            <button
              disabled={page >= pages || loading}
              onClick={() => setPage(p => p + 1)}
            >
              Next ›
            </button>
          </div>
        </div>
      </header>

      <div className="bulkBar">
        <label className="chk">
          <input
            type="checkbox"
            checked={allOnPageSelected}
            onChange={toggleAllOnPage}
          />
          <span>
            Select all on page{' '}
            {items.length > 0 && `(${selected.size}/${items.length} selected)`}
          </span>
        </label>

        <div className="bulk-actions">
          <div className="bulk-cat">
            <span className="bulk-label">Change category to:</span>
            <select
              value={bulkCat}
              onChange={e => setBulkCat(e.target.value as CategoryCode | '')}
            >
              <option value="">Select…</option>
              {CATEGORY_CODES.map(c => (
                <option key={c} value={c}>
                  {CODE_TO_LABEL[c] || c}
                </option>
              ))}
            </select>
            <button
              onClick={bulkUpdateCategory}
              disabled={selected.size === 0 || !bulkCat}
              className="secondary"
              title="Update category for selected"
            >
              Apply to selected
            </button>
          </div>

          <button
            onClick={delSelected}
            disabled={selected.size === 0}
            className="danger"
            title="Delete selected"
          >
            Delete selected ({selected.size})
          </button>
        </div>
      </div>

      <section className="grid">
        {loading && (
          <div className="loading">
            <span className="spinner" />
            <span>Loading images…</span>
          </div>
        )}

        {!loading &&
          items.map(i => {
            const isSel = selected.has(i._id)
            return (
              <div
                className={`card ${isSel ? 'sel' : ''}`}
                key={i._id}
                title={i.alt || ''}
              >
                <label className="pick">
                  <input
                    type="checkbox"
                    checked={isSel}
                    onChange={() => toggle(i._id)}
                  />
                </label>
                <div className="thumb">
                  <Image
                    src={i.thumbUrl}
                    alt={i.alt || ''}
                    fill
                    sizes="(max-width:800px) 50vw, 25vw"
                  />
                </div>
                <div className="meta">
                  <div className="meta-left">
                    <span className="cat">
                      {CODE_TO_LABEL[i.category] || i.category}
                    </span>
                    <span className="id">#{i._id.slice(-6)}</span>
                  </div>
                  <button
                    onClick={() => delOne(i._id)}
                    className="meta-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}

        {!loading && items.length === 0 && <p>No images found.</p>}
      </section>

      <style jsx>{`
        .wrap {
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 16px 40px;
          color: #f5e2a8;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            sans-serif;
        }

        .bar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 10px;
          gap: 16px;
        }

        .bar-left h1 {
          font-size: 22px;
          margin: 0;
        }

        .subtitle {
          margin: 4px 0 0;
          font-size: 13px;
          opacity: 0.7;
        }

        .filters {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .filter-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12px;
        }

        select {
          background: #131313;
          color: #fff;
          border: 1px solid #3a2b10;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 13px;
          outline: none;
        }

        select:focus {
          border-color: #e9c572;
          box-shadow: 0 0 0 1px #e9c57244;
        }

        .pages {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pages button {
          background: #1a1a1a;
          color: #fff;
          border: 1px solid #3a2b10;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease,
            transform 0.1s ease;
        }

        .pages button:hover:not(:disabled) {
          background: #262626;
          border-color: #e9c57255;
          transform: translateY(-1px);
        }

        .pages button:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .page-indicator {
          font-size: 12px;
          opacity: 0.8;
        }

        .bulkBar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin: 16px 0 18px;
          padding: 10px 12px;
          border-radius: 10px;
          background: radial-gradient(circle at top left, #3a2b10 0, #111 55%);
          border: 1px solid #3a2b10;
        }

        .chk {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .chk input {
          width: 14px;
          height: 14px;
        }

        .bulk-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .bulk-cat {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .bulk-label {
          opacity: 0.8;
        }

        .secondary,
        .danger {
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 13px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: background 0.15s ease, border-color 0.15s ease,
            transform 0.1s ease, opacity 0.15s ease;
        }

        .secondary {
          background: #222;
          color: #f5e2a8;
          border-color: #3a2b10;
        }

        .secondary:hover:not(:disabled) {
          background: #2b2b2b;
          border-color: #e9c57255;
          transform: translateY(-1px);
        }

        .danger {
          background: #3a1010;
          border-color: #612222;
          color: #fff;
        }

        .danger:hover:not(:disabled) {
          background: #511818;
          border-color: #9b3434;
          transform: translateY(-1px);
        }

        .secondary:disabled,
        .danger:disabled {
          opacity: 0.4;
          cursor: default;
          transform: none;
        }

        .grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
          min-height: 80px;
        }

        .card {
          position: relative;
          background: radial-gradient(circle at top, #151515, #050505);
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.3);
          transition: transform 0.15s ease, box-shadow 0.15s ease,
            border-color 0.15s ease;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
          border-color: #3a2b10;
        }

        .card.sel {
          outline: 2px solid #e9c572;
          outline-offset: -2px;
          box-shadow: 0 0 0 1px #e9c57255, 0 16px 32px rgba(0, 0, 0, 0.5);
        }

        .pick {
          position: absolute;
          top: 8px;
          left: 8px;
          z-index: 2;
          background: #0008;
          padding: 6px;
          border-radius: 8px;
          backdrop-filter: blur(6px);
        }

        .thumb {
          position: relative;
          width: 100%;
          padding-top: 66%;
          background: #111;
        }

        .meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
        }

        .meta-left {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .cat {
          font-size: 12px;
          opacity: 0.9;
        }

        .id {
          font-size: 11px;
          opacity: 0.55;
        }

        .meta-delete {
          background: #2a2a2a;
          color: #fff;
          border: 0;
          border-radius: 6px;
          padding: 5px 10px;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .meta-delete:hover {
          background: #3a1010;
          transform: translateY(-1px);
        }

        .loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 14px;
          color: #f5e2a8;
          background: radial-gradient(circle at top, #111, #000d);
          border-radius: 10px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          border: 2px solid #333;
          border-top-color: #e9c572;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 640px) {
          .bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .bulkBar {
            flex-direction: column;
            align-items: flex-start;
          }
          .bulk-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </main>
  )
}

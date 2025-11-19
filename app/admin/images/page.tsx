'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CATEGORY_CODES,
  CODE_TO_LABEL,
  SUBCATEGORIES,
  type CategoryCode,
} from '@/app/libs/categories'

// TYPES
type Img = {
  _id: string
  category: CategoryCode
  subcategory?: string | null
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
  const [sub, setSub] = useState<string>('ALL')

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(24)
  const [items, setItems] = useState<Img[]>([])
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [bulkCat, setBulkCat] = useState<CategoryCode | ''>('')
  const [bulkSub, setBulkSub] = useState<string>('')

  const [preview, setPreview] = useState<Img | null>(null)

  const qCat = cat === ALL ? '' : cat
  const qSub = sub === 'ALL' ? '' : sub

  const pages = useMemo(() => Math.ceil(total / limit), [total, limit])

  // reset page + sub when category changes
  useEffect(() => {
    setPage(1)
    setSub('ALL')
  }, [cat])

  // LOAD
  const load = useCallback(async () => {
    try {
      setLoading(true)

      const res = await fetch(
        `/api/admin/images?cat=${qCat}&sub=${qSub}&page=${page}&limit=${limit}`,
        { cache: 'no-store' }
      )
      const json = await res.json()

      if (res.ok) {
        setItems(json.items)
        setTotal(json.total)
        setSelected(new Set())
      } else {
        alert(json.error || 'Failed to load images')
      }
    } catch {
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }, [qCat, qSub, page, limit])

  useEffect(() => {
    load()
  }, [load])

  // SEARCH
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items
    const s = search.toLowerCase()

    return items.filter(i =>
      [i.alt, i._id, CODE_TO_LABEL[i.category], i.subcategory]
        .filter(Boolean)
        .some(str => str!.toLowerCase().includes(s))
    )
  }, [items, search])

  // SELECT TOGGLE
  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const allIds = filteredItems.map(i => i._id)
  const allOnPageSelected = allIds.every(id => selected.has(id))

  const toggleAllOnPage = () =>
    setSelected(prev => {
      const next = new Set(prev)
      if (allOnPageSelected) allIds.forEach(id => next.delete(id))
      else allIds.forEach(id => next.add(id))
      return next
    })

  // DELETE
  const delOne = async (id: string) => {
    if (!confirm('Delete image?')) return
    const res = await fetch(`/api/admin/images?id=${id}`, { method: 'DELETE' })
    const json = await res.json()
    if (!res.ok) return alert(json.error)

    setItems(prev => prev.filter(i => i._id !== id))
    setTotal(t => t - 1)
  }

  const delSelected = async () => {
    if (!selected.size) return
    if (!confirm(`Delete ${selected.size} items?`)) return
    for (const id of selected) {
      await fetch(`/api/admin/images?id=${id}`, { method: 'DELETE' })
    }
    setItems(prev => prev.filter(i => !selected.has(i._id)))
    setTotal(t => t - selected.size)
    setSelected(new Set())
  }

  // BULK UPDATE
  const bulkUpdateCategory = async () => {
    if (!bulkCat) return alert('Choose category')

    const ids = Array.from(selected)
    const res = await fetch('/api/admin/images', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids,
        category: bulkCat,
        subcategory: bulkSub || null,
      }),
    })

    const json = await res.json()
    if (!res.ok) return alert(json.error)

    setItems(prev =>
      prev.map(i =>
        selected.has(i._id)
          ? { ...i, category: bulkCat, subcategory: bulkSub || null }
          : i
      )
    )

    setSelected(new Set())
  }

  const currentSubcategories =
    cat !== ALL ? SUBCATEGORIES[cat as CategoryCode] || [] : []

  return (
    <main className="wrap">
      {/* TOP BAR */}
      <header className="topbar">
        <h1>🖼️ Admin Images</h1>

        <input
          className="search"
          placeholder="Search images…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={cat} onChange={e => setCat(e.target.value as CatFilter)}>
          <option value={ALL}>All Categories</option>
          {CATEGORY_CODES.map(c => (
            <option key={c} value={c}>
              {CODE_TO_LABEL[c]}
            </option>
          ))}
        </select>

        <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
          <option value={24}>24 / page</option>
          <option value={48}>48 / page</option>
          <option value={96}>96 / page</option>
        </select>

        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            ←
          </button>
          <span>
            {page}/{pages}
          </span>
          <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}>
            →
          </button>
        </div>
      </header>

      {/* SUBCATEGORY CHIPS */}
      {cat !== ALL && (
        <div className="subbar">
          <button
            className={`subchip ${sub === 'ALL' ? 'active' : ''}`}
            onClick={() => setSub('ALL')}
          >
            All
          </button>

          {currentSubcategories.map(s => (
            <button
              key={s}
              className={`subchip ${sub === s ? 'active' : ''}`}
              onClick={() => setSub(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* BULK BAR */}
      <div className="bulkbar">
        <label className="chk">
          <input type="checkbox" checked={allOnPageSelected} onChange={toggleAllOnPage} />
          Select all ({selected.size} selected)
        </label>

        <div className="bulk-actions">
          <select value={bulkCat} onChange={e => setBulkCat(e.target.value as CategoryCode)}>
            <option value="">Change category…</option>
            {CATEGORY_CODES.map(c => (
              <option key={c} value={c}>
                {CODE_TO_LABEL[c]}
              </option>
            ))}
          </select>

          {/* bulk subcategory */}
          <select value={bulkSub} onChange={e => setBulkSub(e.target.value)}>
            <option value="">No subcategory</option>
            {bulkCat &&
              SUBCATEGORIES[bulkCat]?.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>

          <button disabled={!bulkCat} onClick={bulkUpdateCategory}>
            Apply
          </button>

          <button className="danger" onClick={delSelected}>
            Delete Selected
          </button>
        </div>
      </div>

      {/* GRID */}
      <section className="grid">
        {loading && <p className="loading">Loading…</p>}

        {!loading &&
          filteredItems.map(i => {
            const isSel = selected.has(i._id)
            return (
              <div
                key={i._id}
                className={`card ${isSel ? 'sel' : ''}`}
                onClick={() => toggle(i._id)}
              >
                <Image
                  src={i.thumbUrl}
                  alt={i.alt || ''}
                  fill
                  className="img"
                  placeholder="blur"
                  blurDataURL={i.thumbUrl}
                />

                <div className="overlay">
                  <div className="info">
                    <span>
                      {CODE_TO_LABEL[i.category]}
                      {i.subcategory ? ` → ${i.subcategory}` : ''}
                    </span>
                    <span className="id">#{i._id.slice(-6)}</span>
                  </div>

                  <div className="btns">
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setPreview(i)
                      }}
                    >
                      Preview
                    </button>

                    <button
                      className="danger"
                      onClick={e => {
                        e.stopPropagation()
                        delOne(i._id)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
      </section>

      {/* MODAL */}
      {preview && (
        <div className="modal" onClick={() => setPreview(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <Image
              src={preview.url}
              alt={preview.alt || ''}
              width={preview.width || 800}
              height={preview.height || 600}
              className="modal-img"
            />
            <h2>{preview.alt}</h2>
            <p>
              Category: {CODE_TO_LABEL[preview.category]}
              {preview.subcategory ? ` → ${preview.subcategory}` : ''}
            </p>
            <button onClick={() => setPreview(null)}>Close</button>
          </div>
        </div>
      )}

      {/* STYLES (unchanged except subchips) */}
      <style jsx>{`
        * {
          font-family: 'Inter', sans-serif;
        }
        .wrap {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
          color: #fff;
        }

        /* subcategory chips */
        .subbar {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .subchip {
          background: #222;
          border: 1px solid #444;
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
        }
        .subchip.active {
          background: #e9c572;
          color: black;
          border-color: #e9c572;
        }

        /* (everything else unchanged) */
        .topbar {
          display: grid;
          grid-template-columns: 1fr auto auto auto auto;
          gap: 12px;
          margin-bottom: 22px;
          align-items: center;
        }
        .search {
          background: #111;
          border: 1px solid #333;
          padding: 8px 12px;
          border-radius: 8px;
          color: white;
        }
        select {
          background: #111;
          border: 1px solid #444;
          color: white;
          padding: 7px 10px;
          border-radius: 8px;
        }
        .pagination {
          display: flex;
          gap: 8px;
        }
        button {
          background: #222;
          border: 1px solid #444;
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
        }
        button:hover {
          background: #333;
        }
        .danger {
          background: #5c1010;
          border-color: #902020;
        }
        .bulkbar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          background: #111;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #333;
        }
        .chk {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .bulk-actions {
          display: flex;
          gap: 10px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .card {
          position: relative;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
          cursor: pointer;
          border: 1px solid #222;
          transition: 0.2s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          border-color: #e9c572;
        }
        .card.sel {
          outline: 3px solid #e9c572;
          outline-offset: -3px;
        }
        .img {
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(0, 0, 0, 0.85)
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 12px;
          opacity: 0;
          transition: 0.25s ease;
        }
        .card:hover .overlay {
          opacity: 1;
        }
        .info {
          font-size: 12px;
          opacity: 0.9;
          margin-bottom: 8px;
        }
        .btns {
          display: flex;
          gap: 6px;
        }
        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: #111;
          padding: 25px;
          border-radius: 10px;
          max-width: 80%;
          text-align: center;
        }
        .modal-img {
          border-radius: 8px;
          margin-bottom: 20px;
        }
      `}</style>
    </main>
  )
}

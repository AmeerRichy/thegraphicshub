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

  const pages = useMemo(() => Math.ceil(total / limit), [total, limit])
  const qCat = cat === ALL ? '' : cat

  const load = async () => {
    const res = await fetch(`/api/admin/images?cat=${qCat}&page=${page}&limit=${limit}`, { cache: 'no-store' })
    const json = await res.json()
    if (res.ok) {
      setItems(json.items)
      setTotal(json.total)
      setSelected(new Set()) // reset selection on new load
    } else {
      alert(json.error || 'Failed to load')
    }
  }

  useEffect(() => { setPage(1) }, [cat])
  useEffect(() => { load() }, [cat, page])

  const delOne = async (id: string) => {
    const res = await fetch(`/api/admin/images?id=${id}`, { method: 'DELETE' })
    const json = await res.json()
    if (!res.ok) return alert(json.error || 'Delete failed')
    setItems(prev => prev.filter(i => i._id !== id))
    setTotal(t => t - 1)
    setSelected(s => { s.delete(id); return new Set(s) })
  }

  const delSelected = async () => {
    if (selected.size === 0) return
    if (!confirm(`Delete ${selected.size} image(s)?`)) return
    // batch by sending multiple DELETEs (simple + safe)
    const ids = Array.from(selected)
    for (const id of ids) {
      const res = await fetch(`/api/admin/images?id=${id}`, { method: 'DELETE' })
      // ignore per-item errors but keep going
    }
    // optimistic refresh
    setItems(prev => prev.filter(i => !selected.has(i._id)))
    setTotal(t => Math.max(0, t - selected.size))
    setSelected(new Set())
  }

  const toggle = (id: string) =>
    setSelected(s => {
      const next = new Set(s)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const allIds = items.map(i => i._id)
  const allOnPageSelected = allIds.every(id => selected.has(id))
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

  return (
    <main className="wrap">
      <header className="bar">
        <h1>Admin — Images</h1>
        <div className="filters">
          <select value={cat} onChange={e => setCat(e.target.value as CatFilter)}>
            <option value={ALL}>{ALL}</option>
            {CATEGORY_CODES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="pages">
            <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
            <span>{page}/{Math.max(1,pages||1)}</span>
            <button disabled={page>=pages} onClick={()=>setPage(p=>p+1)}>Next</button>
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
          <span>Select all on page</span>
        </label>
        <button
          onClick={delSelected}
          disabled={selected.size === 0}
          className="danger"
          title="Delete selected"
        >
          Delete selected ({selected.size})
        </button>
      </div>

      <section className="grid">
        {items.map(i => {
          const isSel = selected.has(i._id)
          return (
            <div className={`card ${isSel ? 'sel' : ''}`} key={i._id} title={i.alt || ''}>
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
                <span className="cat">{CODE_TO_LABEL[i.category] || i.category}</span>
                <button onClick={() => delOne(i._id)}>Delete</button>
              </div>
            </div>
          )
        })}
        {items.length === 0 && <p>No images</p>}
      </section>

      <style jsx>{`
        .wrap { max-width: 1100px; margin: 40px auto; padding: 0 16px; color:#e9c572; }
        .bar { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
        .filters { display:flex; gap:12px; align-items:center; }
        select { background:#131313; color:#fff; border:1px solid #3a2b10; border-radius:8px; padding:8px 10px; }
        .pages button { background:#1a1a1a; color:#fff; border:1px solid #3a2b10; padding:6px 10px; border-radius:8px; }

        .bulkBar { display:flex; align-items:center; gap:14px; margin:8px 0 16px; }
        .chk { display:flex; align-items:center; gap:8px; font-size:14px; }
        .danger { background:#3a1010; border:1px solid #612222; color:#fff; padding:6px 10px; border-radius:8px; }

        .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap:14px; }
        .card { position:relative; background:#0f0f0f; border:1px solid #2a2a2a; border-radius:10px; overflow:hidden; }
        .card.sel { outline:2px solid #e9c572; outline-offset:-2px; }
        .pick { position:absolute; top:8px; left:8px; z-index:2; background:#0008; padding:6px; border-radius:8px; }
        .thumb { position:relative; width:100%; padding-top:66%; background:#111; }
        .meta { display:flex; align-items:center; justify-content:space-between; padding:8px 10px; }
        .cat { font-size:12px; opacity:.85 }
        .meta button { background:#2a2a2a; color:#fff; border:0; border-radius:6px; padding:6px 10px; cursor:pointer; }
      `}</style>
    </main>
  )
}

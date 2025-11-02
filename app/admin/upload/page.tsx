'use client'
import { useRef, useState } from 'react'
import { CATEGORY_CODES, type CategoryCode } from '@/app/libs/categories'

export default function AdminUploadPage() {
  const [category, setCategory] = useState<CategoryCode>('PRINT_MEDIA')
  const [altPrefix, setAltPrefix] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files ? Array.from(e.target.files) : []
    setFiles(prev => [...prev, ...list])
  }
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const list = Array.from(e.dataTransfer.files || [])
    setFiles(prev => [...prev, ...list])
  }
  const removeAt = (i: number) => setFiles(f => f.filter((_, idx) => idx !== i))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!files.length) return
    setBusy(true)
    const fd = new FormData()
    fd.append('category', category)
    fd.append('altPrefix', altPrefix)
    files.forEach(f => fd.append('files', f))
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const json = await res.json()
    setBusy(false)
    if (!res.ok) {
      alert(json.error || 'Upload failed')
      return
    }
    alert(`Uploaded ${json.saved} image(s)`)
    setFiles([]); setAltPrefix(''); if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <main className="wrap">
      <h1>Admin — Upload Images</h1>
      <form onSubmit={onSubmit}>
        <div className="row">
          <label>
            Category
            <select value={category} onChange={e => setCategory(e.target.value as CategoryCode)}>
              {CATEGORY_CODES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>
            Alt prefix (optional)
            <input value={altPrefix} onChange={e => setAltPrefix(e.target.value)} placeholder="e.g. Vogue cover" />
          </label>
        </div>

        <div
          className="drop"
          onDragOver={e => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <p>Drag & drop images here, or click to browse</p>
          <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={onPick} />
        </div>

        {files.length > 0 && (
          <ul className="list">
            {files.map((f, i) => (
              <li key={i}>
                <span>{f.name}</span>
                <button type="button" onClick={() => removeAt(i)}>Remove</button>
              </li>
            ))}
          </ul>
        )}

        <button className="submit" disabled={busy || files.length === 0}>
          {busy ? 'Uploading…' : `Upload ${files.length || ''}`}
        </button>
      </form>

      <style jsx>{`
        .wrap { max-width: 900px; margin: 40px auto; padding: 0 16px; color:#e9c572; }
        h1 { margin: 0 0 16px; }
        form { background:#0f0f0f; border:1px solid #3a2b10; border-radius:12px; padding:16px; }
        .row { display:flex; gap:16px; flex-wrap:wrap; }
        label { display:flex; flex-direction:column; gap:6px; font-size:14px; }
        select, input { background:#131313; color:#fff; border:1px solid #3a2b10; border-radius:8px; padding:8px 10px; }
        .drop { margin:14px 0; padding:24px; border:2px dashed #3a2b10; border-radius:12px; text-align:center; cursor:pointer; background:#111; }
        .list { list-style:none; padding:0; margin:10px 0; display:grid; gap:8px; }
        .list li { display:flex; justify-content:space-between; align-items:center; background:#101010; border:1px solid #2a2a2a; border-radius:8px; padding:8px 10px; color:#ddd; }
        .list button { background:#2a2a2a; color:#fff; border:0; border-radius:6px; padding:4px 8px; cursor:pointer; }
        .submit { margin-top:10px; padding:10px 14px; border-radius:10px; border:1px solid #e9c57280; color:#e9c572; background:#1a1a1a; cursor:pointer; }
        .submit[disabled] { opacity:.6; cursor:not-allowed; }
      `}</style>
    </main>
  )
}

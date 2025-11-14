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

  const removeAt = (i: number) =>
    setFiles(f => f.filter((_, idx) => idx !== i))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!files.length) return
    setBusy(true)
    const fd = new FormData()
    fd.append('category', category)
    fd.append('altPrefix', altPrefix)
    files.forEach(f => fd.append('files', f))

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: fd,
    })
    const json = await res.json()
    setBusy(false)

    if (!res.ok) {
      alert(json.error || 'Upload failed')
      return
    }

    alert(`Uploaded ${json.saved} image(s)`)
    setFiles([])
    setAltPrefix('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const totalSizeMB =
    files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024)

  return (
    <main className="wrap">
      <h1>Admin — Upload Images</h1>

      <form onSubmit={onSubmit}>
        <div className="row">
          <label>
            Category
            <select
              value={category}
              onChange={e =>
                setCategory(e.target.value as CategoryCode)
              }
            >
              {CATEGORY_CODES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Alt prefix (optional)
            <input
              value={altPrefix}
              onChange={e => setAltPrefix(e.target.value)}
              placeholder="e.g. Vogue cover"
            />
          </label>
        </div>

        <div
          className="drop"
          onDragOver={e => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <p>Drag & drop images here, or click to browse</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={onPick}
          />
        </div>

        {files.length > 0 && (
          <>
            <div className="summary">
              <span>{files.length} file(s) selected</span>
              <span>
                Total:{' '}
                {totalSizeMB.toFixed(2)}
                {' MB'}
              </span>
            </div>
            <ul className="list">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`}>
                  <div className="file-meta">
                    <span className="file-name">{f.name}</span>
                    <span className="file-size">
                      {(f.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAt(i)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <button
          className="submit"
          disabled={busy || files.length === 0}
        >
          {busy
            ? 'Uploading…'
            : files.length
            ? `Upload ${files.length}`
            : 'Upload'}
        </button>
      </form>

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 16px 40px;
          color: #e9c572;
          font-family: system-ui, -apple-system, BlinkMacSystemFont,
            'Segoe UI', sans-serif;
        }
        h1 {
          margin: 0 0 16px;
        }
        form {
          background: #0f0f0f;
          border: 1px solid #3a2b10;
          border-radius: 12px;
          padding: 16px;
        }
        .row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 14px;
          flex: 1;
          min-width: 200px;
        }
        select,
        input {
          background: #131313;
          color: #fff;
          border: 1px solid #3a2b10;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 14px;
          outline: none;
        }
        select:focus,
        input:focus {
          border-color: #e9c572;
          box-shadow: 0 0 0 1px #e9c57244;
        }
        .drop {
          margin: 14px 0;
          padding: 24px;
          border: 2px dashed #3a2b10;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          background: #111;
          transition: background 0.15s ease, border-color 0.15s ease,
            transform 0.1s ease;
        }
        .drop:hover {
          background: #151515;
          border-color: #e9c57266;
          transform: translateY(-1px);
        }
        .summary {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 6px;
          opacity: 0.85;
        }
        .list {
          list-style: none;
          padding: 0;
          margin: 10px 0;
          display: grid;
          gap: 8px;
        }
        .list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #101010;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 8px 10px;
          color: #ddd;
        }
        .file-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .file-name {
          font-size: 13px;
        }
        .file-size {
          font-size: 11px;
          opacity: 0.7;
        }
        .list button {
          background: #2a2a2a;
          color: #fff;
          border: 0;
          border-radius: 6px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.15s ease, transform 0.1s ease;
        }
        .list button:hover {
          background: #3a1010;
          transform: translateY(-1px);
        }
        .submit {
          margin-top: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #e9c57280;
          color: #e9c572;
          background: #1a1a1a;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.15s ease, transform 0.1s ease,
            opacity 0.15s ease;
        }
        .submit:hover:not(:disabled) {
          background: #232323;
          transform: translateY(-1px);
        }
        .submit[disabled] {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        @media (max-width: 600px) {
          form {
            padding: 14px;
          }
        }
      `}</style>
    </main>
  )
}

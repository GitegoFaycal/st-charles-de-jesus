import { useEffect, useRef, useState } from 'react'
import { Upload, Trash2, Copy, FileText, Check } from 'lucide-react'
import api, { errorMessage, mediaUrl } from '../lib/api'
import { uploadFile } from '../lib/uploads'
import { Loader } from '../components/ui'

const isImage = (n) => /\.(jpe?g|png|webp|gif|svg)$/i.test(n)

export default function Media() {
  const [files, setFiles] = useState(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [copied, setCopied] = useState('')
  const ref = useRef()

  const load = () => api.get('/upload').then((r) => setFiles(r.data))
  useEffect(() => {
    load()
  }, [])

  const upload = async (fileList) => {
    setBusy(true)
    setErr('')
    try {
      for (const f of fileList) {
        await uploadFile(f)
      }
      await load()
    } catch (e) {
      setErr(errorMessage(e))
    } finally {
      setBusy(false)
    }
  }
  const remove = async (f) => {
    if (!window.confirm(`Delete ${f.name}? Pages still using it will show a broken image.`)) return
    await api.delete('/upload', { params: { url: f.url } })
    await load()
  }
  const copy = (url) => {
    navigator.clipboard?.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(''), 1500)
  }

  if (!files) return <Loader />
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-heading text-2xl font-bold">Media library</h1><p className="text-sm text-gray-600">Upload photos, PDFs and videos, then paste their URL into any image field.</p></div>
        <button className="btn-primary !px-5 !py-2.5 !text-xs" onClick={() => ref.current?.click()} disabled={busy}><Upload size={16} /> {busy ? 'Uploading…' : 'Upload files'}</button>
        <input ref={ref} type="file" multiple className="hidden" accept="image/*,application/pdf,video/mp4" onChange={(e) => upload([...e.target.files])} />
      </div>
      {err && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</p>}
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {files.length === 0 && <p className="col-span-full text-sm text-gray-500">No files uploaded yet.</p>}
        {files.map((f) => (
          <div key={f.url} className="card overflow-hidden">
            {isImage(f.name) ? <img src={mediaUrl(f.url)} alt="" className="aspect-square w-full object-cover" loading="lazy" /> : <a href={mediaUrl(f.url)} target="_blank" rel="noreferrer" className="flex aspect-square items-center justify-center bg-gray-50 text-brand-700"><FileText size={40} /></a>}
            <div className="p-3">
              <div className="truncate text-xs font-semibold" title={f.name}>{f.name}</div>
              <div className="text-[11px] text-gray-500">{(f.size / 1024).toFixed(0)} KB</div>
              <div className="mt-2 flex gap-1">
                <button onClick={() => copy(f.url)} className="flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 py-1.5 text-xs font-semibold hover:bg-gray-200">{copied === f.url ? <Check size={14} /> : <Copy size={14} />} {copied === f.url ? 'Copied' : 'Copy URL'}</button>
                <button onClick={() => remove(f)} className="rounded-md px-2 text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

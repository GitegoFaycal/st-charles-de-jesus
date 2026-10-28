import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Save, RotateCcw } from 'lucide-react'
import api, { errorMessage } from '../lib/api'
import { useContent } from '../context/ContentContext'
import { Fields } from './Fields'
import { SECTIONS } from './schemas'
import { Loader } from '../components/ui'

export default function SectionEditor() {
  const { section } = useParams()
  const schema = SECTIONS[section]
  const { content, reload } = useContent()
  const [draft, setDraft] = useState(null)
  const [status, setStatus] = useState({ state: 'idle' })

  useEffect(() => {
    setDraft(null)
    setStatus({ state: 'idle' })
    api.get(`/content/${section}`).then((r) => setDraft(r.data)).catch(() => setDraft({}))
  }, [section])

  if (!schema) return <Navigate to="/admin" replace />
  if (!draft) return <Loader />

  const save = async (e) => {
    e.preventDefault()
    setStatus({ state: 'saving' })
    try {
      const { data } = await api.put(`/content/${section}`, draft)
      setDraft(data)
      await reload()
      setStatus({ state: 'saved' })
      setTimeout(() => setStatus({ state: 'idle' }), 2500)
    } catch (err) {
      setStatus({ state: 'error', message: errorMessage(err) })
    }
  }

  const reset = () => setDraft(content?.[section] || {})

  return (
    <form onSubmit={save} className="mx-auto max-w-4xl space-y-6">
      <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between gap-4 border-b border-gray-200 bg-gray-100/95 px-4 py-3 backdrop-blur lg:-mx-8 lg:px-8">
        <div>
          <h1 className="font-heading text-xl font-bold">{schema.title}</h1>
          {schema.description && <p className="text-xs text-gray-600">{schema.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {status.state === 'saved' && <span className="text-sm font-semibold text-green-700">Saved ✓</span>}
          {status.state === 'error' && <span className="text-sm text-red-600">{status.message}</span>}
          <button type="button" onClick={reset} className="btn-outline !px-4 !py-2 !text-xs"><RotateCcw size={14} /> Reset</button>
          <button className="btn-primary !px-5 !py-2 !text-xs" disabled={status.state === 'saving'}><Save size={14} /> {status.state === 'saving' ? 'Saving…' : 'Save changes'}</button>
        </div>
      </div>
      <div className="card p-6">
        <Fields fields={schema.fields} value={draft} onChange={setDraft} />
      </div>
      <div className="flex justify-end">
        <button className="btn-primary" disabled={status.state === 'saving'}><Save size={16} /> {status.state === 'saving' ? 'Saving…' : 'Save changes'}</button>
      </div>
    </form>
  )
}

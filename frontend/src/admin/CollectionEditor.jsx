import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Save, X } from 'lucide-react'
import api, { errorMessage, mediaUrl } from '../lib/api'
import { useContent } from '../context/ContentContext'
import { Fields } from './Fields'
import { COLLECTIONS } from './schemas'
import { Loader } from '../components/ui'
import { formatDate } from '../lib/format'

function blankItem(fields) {
  const o = {}
  for (const f of fields) o[f.key] = ['lines', 'paragraphs', 'list'].includes(f.type) ? [] : f.type === 'boolean' ? false : f.type === 'date' ? new Date().toISOString().slice(0, 10) : ''
  return o
}

export default function CollectionEditor() {
  const { name } = useParams()
  const schema = COLLECTIONS[name]
  const { reload } = useContent()
  const [items, setItems] = useState(null)
  const [editing, setEditing] = useState(null) // null | {} (new) | item
  const [status, setStatus] = useState({ state: 'idle' })

  const load = () => api.get(`/collections/${name}`).then((r) => setItems([...r.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))))

  useEffect(() => {
    setItems(null)
    setEditing(null)
    load()
  }, [name]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!schema) return <Navigate to="/admin" replace />
  if (!items) return <Loader />

  const save = async (e) => {
    e.preventDefault()
    setStatus({ state: 'saving' })
    try {
      if (editing.id) await api.put(`/collections/${name}/${editing.id}`, editing)
      else await api.post(`/collections/${name}`, editing)
      await load()
      await reload()
      setEditing(null)
      setStatus({ state: 'idle' })
    } catch (err) {
      setStatus({ state: 'error', message: errorMessage(err) })
    }
  }

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item[schema.titleKey] || 'this item'}"? This cannot be undone.`)) return
    await api.delete(`/collections/${name}/${item.id}`)
    await load()
    await reload()
  }

  const move = async (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
    await api.put(`/collections/${name}`, next.map((x) => x.id))
    await reload()
  }

  const imageKey = schema.fields.find((f) => f.type === 'image')?.key

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-heading text-2xl font-bold">{schema.title}</h1><p className="text-sm text-gray-600">{items.length} item{items.length === 1 ? '' : 's'}. Use the arrows to change the display order.</p></div>
        <button className="btn-primary !px-5 !py-2.5 !text-xs" onClick={() => setEditing(blankItem(schema.fields))}><Plus size={16} /> New {schema.singular}</button>
      </div>

      {editing && (
        <form onSubmit={save} className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold">{editing.id ? `Edit ${schema.singular}` : `New ${schema.singular}`}</h2>
            <button type="button" onClick={() => setEditing(null)} className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"><X /></button>
          </div>
          <Fields fields={schema.fields} value={editing} onChange={setEditing} />
          {status.state === 'error' && <p className="mt-4 text-sm text-red-600">{status.message}</p>}
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" className="btn-outline !px-4 !py-2 !text-xs" onClick={() => setEditing(null)}>Cancel</button>
            <button className="btn-primary !px-5 !py-2 !text-xs" disabled={status.state === 'saving'}><Save size={14} /> {status.state === 'saving' ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      )}

      <div className="card divide-y divide-gray-100">
        {items.length === 0 && <p className="p-8 text-center text-sm text-gray-500">Nothing here yet. Click "New {schema.singular}" to add the first one.</p>}
        {items.map((item, i) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            {imageKey && (item[imageKey] ? <img src={mediaUrl(item[imageKey])} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" /> : <div className="h-14 w-20 shrink-0 rounded-lg bg-gray-100" />)}
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold">{item[schema.titleKey] || <span className="text-gray-400">(untitled)</span>}</div>
              {schema.subtitleKey && <div className="truncate text-xs text-gray-500">{schema.subtitleKey === 'date' ? formatDate(item.date) : item[schema.subtitleKey]}</div>}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button onClick={() => move(i, -1)} className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100" title="Move up"><ChevronUp size={16} /></button>
              <button onClick={() => move(i, 1)} className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100" title="Move down"><ChevronDown size={16} /></button>
              <button onClick={() => { setEditing(item); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="rounded-md p-1.5 text-brand-700 hover:bg-brand-50" title="Edit"><Pencil size={16} /></button>
              <button onClick={() => remove(item)} className="rounded-md p-1.5 text-red-500 hover:bg-red-50" title="Delete"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

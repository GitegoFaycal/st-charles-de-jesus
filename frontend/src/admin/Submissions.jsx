import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Trash2, ChevronDown, Download } from 'lucide-react'
import api from '../lib/api'
import { SUBMISSIONS } from './schemas'
import { Loader } from '../components/ui'
import { formatDate } from '../lib/format'

const STATUSES = ['new', 'in progress', 'handled']
const HIDDEN = new Set(['id', 'createdAt', 'status', 'note'])
const pretty = (k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())

export default function Submissions() {
  const { type } = useParams()
  const cfg = SUBMISSIONS[type]
  const [list, setList] = useState(null)
  const [open, setOpen] = useState(null)
  const [filter, setFilter] = useState('all')

  const load = () => api.get(`/submissions/${type}`).then((r) => setList(r.data))
  useEffect(() => {
    setList(null)
    setOpen(null)
    load()
  }, [type]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!cfg) return <Navigate to="/admin" replace />
  if (!list) return <Loader />

  const setStatus = async (item, status) => {
    const { data } = await api.patch(`/submissions/${type}/${item.id}`, { status })
    setList(list.map((x) => (x.id === item.id ? data : x)))
  }
  const remove = async (item) => {
    if (!window.confirm('Delete this submission permanently?')) return
    await api.delete(`/submissions/${type}/${item.id}`)
    setList(list.filter((x) => x.id !== item.id))
  }
  const exportCsv = () => {
    const keys = [...new Set(list.flatMap((s) => Object.keys(s)))]
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [keys.join(','), ...list.map((s) => keys.map((k) => esc(s[k])).join(','))].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `${type}-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  const shown = filter === 'all' ? list : list.filter((s) => (s.status || 'new') === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-heading text-2xl font-bold">{cfg.title}</h1><p className="text-sm text-gray-600">{list.length} total · {list.filter((s) => s.status === 'new').length} new</p></div>
        <div className="flex items-center gap-2">
          <select className="input !w-auto !py-2 text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={exportCsv} className="btn-outline !px-4 !py-2 !text-xs" disabled={!list.length}><Download size={14} /> CSV</button>
        </div>
      </div>

      <div className="card divide-y divide-gray-100">
        {shown.length === 0 && <p className="p-8 text-center text-sm text-gray-500">No submissions.</p>}
        {shown.map((s) => (
          <div key={s.id}>
            <button className="flex w-full items-center gap-4 p-4 text-left" onClick={() => setOpen(open === s.id ? null : s.id)}>
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.status === 'handled' ? 'bg-green-500' : s.status === 'in progress' ? 'bg-amber-400' : 'bg-brand-500'}`} />
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">{cfg.columns.map((c) => s[c]).filter(Boolean).join(' · ') || 'Submission'}</div>
                <div className="truncate text-xs text-gray-500">{formatDate(s.createdAt, { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <ChevronDown size={18} className={`shrink-0 text-gray-400 transition ${open === s.id ? 'rotate-180' : ''}`} />
            </button>
            {open === s.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-5">
                <dl className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(s).filter(([k, v]) => !HIDDEN.has(k) && v !== '' && v !== null && v !== undefined).map(([k, v]) => (
                    <div key={k} className={String(v).length > 80 ? 'sm:col-span-2' : ''}>
                      <dt className="text-xs font-bold uppercase tracking-wider text-gray-500">{pretty(k)}</dt>
                      <dd className="whitespace-pre-wrap text-sm">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Status</label>
                  <select className="input !w-auto !py-1.5 text-sm" value={s.status || 'new'} onChange={(e) => setStatus(s, e.target.value)}>
                    {STATUSES.map((st) => <option key={st}>{st}</option>)}
                  </select>
                  {s.email && <a href={`mailto:${s.email}`} className="btn-outline !px-3 !py-1.5 !text-xs">Reply by email</a>}
                  {(s.guardianPhone || s.phone) && <a href={`tel:${(s.guardianPhone || s.phone).replace(/\s+/g, '')}`} className="btn-outline !px-3 !py-1.5 !text-xs">Call</a>}
                  <button onClick={() => remove(s)} className="ml-auto flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={14} /> Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

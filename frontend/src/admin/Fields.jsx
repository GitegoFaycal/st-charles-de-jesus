import { useRef, useState } from 'react'
import { Upload, Trash2, ChevronUp, ChevronDown, Plus, Link as LinkIcon, FileText, MapPin } from 'lucide-react'
import { errorMessage, mediaUrl } from '../lib/api'
import { uploadFile } from '../lib/uploads'

export function MediaInput({ value, onChange, accept = 'image/*', isImage = true }) {
  const ref = useRef()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const upload = async (file) => {
    if (!file) return
    setBusy(true)
    setErr('')
    try {
      const data = await uploadFile(file)
      onChange(data.url)
    } catch (e) {
      setErr(errorMessage(e))
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-start gap-3">
        {value ? (
          isImage ? (
            <img src={mediaUrl(value)} alt="" className="h-20 w-28 rounded-lg object-cover" />
          ) : (
            <a href={mediaUrl(value)} target="_blank" rel="noreferrer" className="flex h-20 w-28 items-center justify-center rounded-lg bg-white text-brand-700"><FileText /></a>
          )
        ) : (
          <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-white text-xs text-gray-400">No file</div>
        )}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <LinkIcon size={14} className="text-gray-400" />
            <input className="input !py-1.5 text-xs" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Paste a URL or upload a file" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-outline !px-3 !py-1.5 !text-xs !normal-case !tracking-normal" onClick={() => ref.current?.click()} disabled={busy}>
              <Upload size={14} /> {busy ? 'Uploading…' : 'Upload'}
            </button>
            {value && (
              <button type="button" className="btn !px-3 !py-1.5 !text-xs !normal-case !tracking-normal text-red-600 hover:bg-red-50" onClick={() => onChange('')}>
                <Trash2 size={14} /> Remove
              </button>
            )}
          </div>
          {err && <p className="text-xs text-red-600">{err}</p>}
        </div>
      </div>
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
    </div>
  )
}

/** Pull "lat, lng" out of free text or a pasted Google Maps link (…/@-1.98,30.10,17z or ?q=-1.98,30.10). */
function parseCoords(text) {
  const m = String(text || '').match(/(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/)
  return m ? `${Number(m[1]).toFixed(6)}, ${Number(m[2]).toFixed(6)}` : ''
}

/** Coordinates field with a "Use my current location" button (works on a phone standing at the school). */
function GeoField({ id, value, onChange }) {
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const locate = () => {
    if (!navigator.geolocation) {
      setMsg('This browser cannot access location. Paste coordinates or a Google Maps link instead.')
      return
    }
    setBusy(true)
    setMsg('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`)
        setMsg(`Location captured (accuracy about ${Math.round(pos.coords.accuracy)} m). Save the settings to apply it.`)
        setBusy(false)
      },
      (err) => {
        setMsg(err.code === 1 ? 'Location permission was denied. Allow location for this site and try again.' : 'Could not get a GPS fix. Try again outdoors or paste the coordinates.')
        setBusy(false)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    )
  }
  const coords = parseCoords(value)
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          className="input"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => value && parseCoords(value) && onChange(parseCoords(value))}
          placeholder="-1.9700, 30.1000 or paste a Google Maps link"
        />
        <button type="button" className="btn-primary shrink-0 !py-2 !text-xs" onClick={locate} disabled={busy}>
          <MapPin size={14} /> {busy ? 'Locating…' : 'Use my current location'}
        </button>
      </div>
      {msg && <p className="mt-2 text-xs text-ink-soft">{msg}</p>}
      {coords ? (
        <iframe title="Preview" src={`https://www.google.com/maps?q=${coords.replace(/\s/g, '')}&z=17&output=embed`} className="mt-3 h-56 w-full rounded-lg border-0" loading="lazy" />
      ) : (
        <p className="mt-2 text-xs text-gray-500">Stand at the school gate with your phone, open this page and tap the button. Leave empty to show the sector on the map instead.</p>
      )}
    </div>
  )
}

function ListField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : []
  const update = (i, v) => onChange(items.map((it, j) => (j === i ? v : it)))
  const remove = (i) => onChange(items.filter((_, j) => j !== i))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  const add = () => {
    const blank = {}
    for (const f of field.fields) blank[f.key] = f.type === 'list' || f.type === 'lines' || f.type === 'paragraphs' ? [] : f.type === 'number' ? 0 : f.type === 'boolean' ? false : f.type === 'object' ? {} : ''
    onChange([...items, blank])
  }
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{field.itemLabel || 'Item'} {i + 1}</span>
            <div className="flex gap-1">
              <IconBtn onClick={() => move(i, -1)} title="Move up"><ChevronUp size={16} /></IconBtn>
              <IconBtn onClick={() => move(i, 1)} title="Move down"><ChevronDown size={16} /></IconBtn>
              <IconBtn onClick={() => remove(i)} title="Remove" danger><Trash2 size={16} /></IconBtn>
            </div>
          </div>
          <Fields fields={field.fields} value={item} onChange={(v) => update(i, v)} compact />
        </div>
      ))}
      <button type="button" className="btn-outline !px-4 !py-2 !text-xs" onClick={add}><Plus size={14} /> Add {field.itemLabel || 'item'}</button>
    </div>
  )
}

function IconBtn({ children, onClick, title, danger }) {
  return (
    <button type="button" onClick={onClick} title={title} className={`rounded-md p-1.5 transition ${danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-100'}`}>
      {children}
    </button>
  )
}

export function Field({ field, value, onChange, compact }) {
  const id = `f-${field.key}`
  const label = (
    <label htmlFor={id} className={`label ${compact ? '!text-xs' : ''}`}>
      {field.label}
    </label>
  )
  switch (field.type) {
    case 'textarea':
      return <div>{label}<textarea id={id} rows={field.rows || 4} className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} /></div>
    case 'number':
      return <div>{label}<input id={id} type="number" className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} /></div>
    case 'date':
      return <div>{label}<input id={id} type="date" className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} /></div>
    case 'boolean':
      return (
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
          <input type="checkbox" className="h-4 w-4 accent-brand-700" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="text-sm font-semibold">{field.label}</span>
        </label>
      )
    case 'select':
      return (
        <div>{label}<select id={id} className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          {field.options.map((o) => <option key={o}>{o}</option>)}
        </select></div>
      )
    case 'geo':
      return <div>{label}<GeoField id={id} value={value} onChange={onChange} /></div>
    case 'image':
      return <div>{label}<MediaInput value={value} onChange={onChange} /></div>
    case 'file':
      return <div>{label}<MediaInput value={value} onChange={onChange} accept="application/pdf,video/mp4,image/*" isImage={false} /></div>
    case 'lines':
      return (
        <div>{label}<textarea id={id} rows={Math.min(12, Math.max(3, (value?.length || 0) + 1))} className="input font-mono text-xs" value={(value || []).join('\n')} onChange={(e) => onChange(e.target.value.split('\n'))} onBlur={() => onChange((value || []).map((s) => s.trim()).filter(Boolean))} />
          <p className="mt-1 text-xs text-gray-500">{field.help || 'One item per line'}</p></div>
      )
    case 'paragraphs':
      return (
        <div>{label}<textarea id={id} rows={10} className="input" value={(value || []).join('\n\n')} onChange={(e) => onChange(e.target.value.split(/\n{2,}/))} onBlur={() => onChange((value || []).map((s) => s.trim()).filter(Boolean))} />
          <p className="mt-1 text-xs text-gray-500">Separate paragraphs with a blank line</p></div>
      )
    case 'list':
      return <div>{label}<ListField field={field} value={value} onChange={onChange} /></div>
    case 'object':
      return (
        <div>{label}<div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4"><Fields fields={field.fields} value={value || {}} onChange={onChange} compact /></div></div>
      )
    default:
      return <div>{label}<input id={id} className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} /></div>
  }
}

/** Renders a list of fields against a plain object. "group" fields are purely visual. */
export function Fields({ fields, value, onChange, compact }) {
  const set = (key, v) => onChange({ ...(value || {}), [key]: v })
  return (
    <div className={`grid gap-${compact ? '3' : '5'}`}>
      {fields.map((f) =>
        f.type === 'group' ? (
          <fieldset key={f.key} className="rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
            <legend className="px-2 font-heading text-sm font-bold uppercase tracking-wider text-brand-700">{f.label}</legend>
            <Fields fields={f.fields} value={value} onChange={onChange} compact={compact} />
          </fieldset>
        ) : (
          <Field key={f.key} field={f} value={value?.[f.key]} onChange={(v) => set(f.key, v)} compact={compact} />
        )
      )}
    </div>
  )
}

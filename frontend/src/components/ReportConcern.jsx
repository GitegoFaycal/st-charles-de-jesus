import { useState } from 'react'
import api, { errorMessage } from '../lib/api'

const CATEGORIES = ['Bullying', 'Harassment', 'Mental Health', 'Neglect', 'Fraud', 'Other']

/** "Report a concern" strip that sits at the top of the footer, as on the reference site. */
export default function ReportConcern() {
  const [form, setForm] = useState({ email: '', category: '', details: '' })
  const [status, setStatus] = useState({ state: 'idle' })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.category) {
      setStatus({ state: 'error', message: 'Please select the type of concern.' })
      return
    }
    setStatus({ state: 'loading' })
    try {
      await api.post('/submissions/concerns', form)
      setStatus({ state: 'done' })
      setForm({ email: '', category: '', details: '' })
    } catch (err) {
      setStatus({ state: 'error', message: errorMessage(err) })
    }
  }

  return (
    <div className="container-x pt-12">
      <div className="flex items-center gap-6">
        <span className="h-px flex-1 bg-accent" />
        <h2 className="footer-heading shrink-0">Report a concern</h2>
        <span className="h-px flex-1 bg-accent" />
      </div>
      <p className="mx-auto mt-5 max-w-md text-center font-footer text-[13px] font-medium leading-relaxed text-white">
        The quickest way for us to respond to any concern is if you complete our concern raising form below.
      </p>
      {status.state === 'done' ? (
        <p className="mt-6 text-center text-sm font-semibold text-accent">Thank you. Your concern has been received and will be handled confidentially.</p>
      ) : (
        <form onSubmit={submit} className="mt-6 grid gap-2 md:grid-cols-[1.5fr_1fr_1.5fr_auto]">
          <input type="email" className="input-footer" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <select className="input-footer font-semibold" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="" className="text-ink">Select Concern</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="text-ink">{c}</option>
            ))}
          </select>
          <input required className="input-footer" placeholder="Details" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
          <button className="btn-accent !rounded-none !px-10 !font-medium" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Sending…' : 'Report Concern'}
          </button>
        </form>
      )}
      {status.state === 'error' && <p className="mt-2 text-center text-sm text-white">{status.message}</p>}
    </div>
  )
}

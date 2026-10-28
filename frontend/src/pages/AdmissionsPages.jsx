import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, FileText, Landmark, Download, Info } from 'lucide-react'
import { PageHeader, SectionHeading, Seo, CtaBand } from '../components/ui'
import { useContent } from '../context/ContentContext'
import api, { errorMessage, mediaUrl } from '../lib/api'
import { formatMoney } from '../lib/format'

export function Admissions() {
  const { content } = useContent()
  const a = content.admissions
  return (
    <>
      <Seo title="Admissions" description={a.intro} />
      <PageHeader eyebrow="Admissions" title={`Admissions ${a.academicYear || ''}`} subtitle={a.intro} image={a.heroImage} />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who can apply" title="Entry points" />
            <ul className="space-y-3">
              {(a.whoCanApply || []).map((w, i) => (
                <li key={i} className="flex gap-3 text-ink-soft"><CheckCircle2 className="mt-0.5 shrink-0 text-brand-700" size={20} />{w}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Documents" title="What to bring" />
            <ul className="space-y-3">
              {(a.documents || []).map((d, i) => (
                <li key={i} className="flex gap-3 text-ink-soft"><FileText className="mt-0.5 shrink-0 text-accent-dark" size={20} />{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-brand-50 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Process" title="How to apply in five steps" align="center" />
          <ol className="grid gap-6 md:grid-cols-5">
            {(a.steps || []).map((s, i) => (
              <li key={i} className="card relative p-6">
                <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent font-heading font-extrabold text-ink">{i + 1}</span>
                <h3 className="mt-3 font-heading font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/admissions/apply" className="btn-accent">Apply online</Link>
            <Link to="/admissions/fees" className="btn-outline">Fees structure</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold">Requirements for every student</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">{(a.requiredItems || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold">Additional items for boarders</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">{(a.boardingItems || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
            {a.notes?.length > 0 && (
              <div className="mt-8 rounded-2xl bg-gray-50 p-6">
                <h3 className="flex items-center gap-2 font-heading font-bold"><Info size={18} className="text-brand-700" /> Good to know</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">{a.notes.map((n, i) => <li key={i}>• {n}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="pb-16 md:pb-24">
        <div className="container-x">
          <h2 className="font-heading text-2xl font-bold">Learning materials by trade</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-brand-700 text-left text-white"><tr><th className="px-4 py-3">Trade</th><th className="px-4 py-3">Materials</th></tr></thead>
              <tbody>
                {(a.materials || []).map((m, i) => (
                  <tr key={i} className="border-t border-gray-100 odd:bg-white even:bg-gray-50"><td className="whitespace-nowrap px-4 py-3 font-semibold">{m.trade}</td><td className="px-4 py-3 text-ink-soft">{m.items}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export function Fees() {
  const { content } = useContent()
  const a = content.admissions
  const f = a.fees || {}
  return (
    <>
      <Seo title="School Fees Structure" />
      <PageHeader eyebrow="Admissions" title={`School Fees ${a.academicYear || ''}`} subtitle={f.note} image={a.heroImage} />
      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-3">
            {(f.terms || []).map((t, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="bg-brand-700 p-6 text-white">
                  <h2 className="font-heading text-2xl font-bold text-white">{t.name}</h2>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div><div className="text-xs uppercase tracking-wider text-white/70">Day (Externe)</div><div className="font-heading text-xl font-extrabold text-accent">{formatMoney(t.day)}</div></div>
                    <div><div className="text-xs uppercase tracking-wider text-white/70">Boarding (Interne)</div><div className="font-heading text-xl font-extrabold text-accent">{formatMoney(t.boarding)}</div></div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed text-[13px] sm:text-sm">
                    <colgroup><col className="w-[44%]" /><col className="w-[28%]" /><col className="w-[28%]" /></colgroup>
                    <thead><tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-ink-soft"><th className="px-3 py-2 sm:px-4">Item</th><th className="px-2 py-2 text-right sm:px-4">Day</th><th className="px-2 py-2 text-right sm:px-4">Boarding</th></tr></thead>
                    <tbody>
                      {(t.items || []).map((it, j) => (
                        <tr key={j} className="border-t border-gray-100"><td className="break-words px-3 py-2 sm:px-4">{it.label}</td><td className="px-2 py-2 text-right sm:px-4">{formatMoney(it.day)}</td><td className="px-2 py-2 text-right sm:px-4">{formatMoney(it.boarding)}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-bold">Other costs</h2>
              <ul className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100">
                {(f.otherCosts || []).map((c, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 px-5 py-3 text-sm"><span className="text-ink-soft">{c.label}</span><span className="font-semibold">{c.amount}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold">How to pay</h2>
              <p className="mt-2 text-sm text-ink-soft">Deposit fees into one of the school accounts below and present the bank slip at the bursar's office.</p>
              <div className="mt-4 space-y-4">
                {(f.bankAccounts || []).map((b, i) => (
                  <div key={i} className="card flex items-center gap-4 p-5">
                    <Landmark className="shrink-0 text-brand-700" size={28} />
                    <div><div className="font-heading font-bold">{b.bank}</div><div className="font-mono text-lg tracking-wider text-brand-700">{b.number}</div><div className="text-xs uppercase tracking-wider text-ink-soft">{b.name}</div></div>
                  </div>
                ))}
              </div>
              {f.feesLetterUrl && (
                <a href={mediaUrl(f.feesLetterUrl)} target="_blank" rel="noreferrer" className="btn-outline mt-6"><Download size={16} /> Download the requirements letter</a>
              )}
            </div>
          </div>
        </div>
      </section>
      <CtaBand heading="Questions about fees?" text="Call the bursar or send us a message and we will help." primary={{ to: '/contacts', label: 'Contact us' }} secondary={{ to: '/admissions/apply', label: 'Apply now' }} />
    </>
  )
}

const EMPTY = { studentName: '', dateOfBirth: '', gender: '', program: '', level: 'Level 3', boarding: 'Day', previousSchool: '', lastResult: '', guardianName: '', guardianPhone: '', guardianEmail: '', district: '', message: '' }

export function ApplicationForm() {
  const { content } = useContent()
  const a = content.admissions
  const programs = a.programsForForm?.length ? a.programsForForm : content.programs.map((p) => `${p.code} – ${p.name}`)
  const [form, setForm] = useState({ ...EMPTY, program: programs[0] || '' })
  const [status, setStatus] = useState({ state: 'idle' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading' })
    try {
      await api.post('/submissions/applications', form)
      setStatus({ state: 'done' })
    } catch (err) {
      setStatus({ state: 'error', message: errorMessage(err) })
    }
  }

  return (
    <>
      <Seo title="Application Form" />
      <PageHeader eyebrow="Admissions" title="Online Application Form" subtitle={`Apply for the ${a.academicYear || ''} academic year. The school will contact the parent or guardian to complete registration.`} image={a.heroImage} />
      <section className="section">
        <div className="container-x max-w-4xl">
          {status.state === 'done' ? (
            <div className="card p-10 text-center">
              <CheckCircle2 size={56} className="mx-auto text-green-600" />
              <h2 className="mt-4 font-heading text-2xl font-bold">Application received</h2>
              <p className="mt-2 text-ink-soft">Thank you, {form.studentName}. The admissions office will call {form.guardianPhone} to confirm the next steps.</p>
              <Link to="/admissions/fees" className="btn-primary mt-6">View fees structure</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="card space-y-8 p-6 md:p-10">
              <fieldset className="grid gap-4 md:grid-cols-2">
                <legend className="mb-2 font-heading text-xl font-bold">Student</legend>
                <div className="md:col-span-2"><label className="label">Full name *</label><input required className="input" value={form.studentName} onChange={set('studentName')} /></div>
                <div><label className="label">Date of birth</label><input type="date" className="input" value={form.dateOfBirth} onChange={set('dateOfBirth')} /></div>
                <div><label className="label">Gender</label><select className="input" value={form.gender} onChange={set('gender')}><option value="">Select</option><option>Female</option><option>Male</option></select></div>
                <div><label className="label">Programme / trade *</label><select required className="input" value={form.program} onChange={set('program')}>{programs.map((p) => <option key={p}>{p}</option>)}</select></div>
                <div><label className="label">Level applying for</label><select className="input" value={form.level} onChange={set('level')}>{['Level 1', 'Level 3', 'Level 4', 'Level 5'].map((l) => <option key={l}>{l}</option>)}</select></div>
                <div><label className="label">Day or boarding</label><select className="input" value={form.boarding} onChange={set('boarding')}><option>Day</option><option>Boarding</option></select></div>
                <div><label className="label">District of residence</label><input className="input" value={form.district} onChange={set('district')} /></div>
                <div><label className="label">Previous school</label><input className="input" value={form.previousSchool} onChange={set('previousSchool')} /></div>
                <div><label className="label">Last result / level completed</label><input className="input" value={form.lastResult} onChange={set('lastResult')} placeholder="e.g. S3 national exam, 2026" /></div>
              </fieldset>
              <fieldset className="grid gap-4 md:grid-cols-2">
                <legend className="mb-2 font-heading text-xl font-bold">Parent / guardian</legend>
                <div><label className="label">Name</label><input className="input" value={form.guardianName} onChange={set('guardianName')} /></div>
                <div><label className="label">Phone *</label><input required className="input" value={form.guardianPhone} onChange={set('guardianPhone')} placeholder="+250 7xx xxx xxx" /></div>
                <div className="md:col-span-2"><label className="label">Email</label><input type="email" className="input" value={form.guardianEmail} onChange={set('guardianEmail')} /></div>
                <div className="md:col-span-2"><label className="label">Message or questions</label><textarea rows={4} className="input" value={form.message} onChange={set('message')} /></div>
              </fieldset>
              {status.state === 'error' && <p className="text-sm text-red-600">{status.message}</p>}
              <div className="flex flex-wrap items-center gap-4">
                <button className="btn-accent" disabled={status.state === 'loading'}>{status.state === 'loading' ? 'Submitting…' : 'Submit application'}</button>
                <p className="text-xs text-ink-soft">By submitting you agree that the school may contact you about this application.</p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

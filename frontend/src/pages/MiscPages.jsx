import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Clock, ChevronDown, CheckCircle2 } from 'lucide-react'
import { PageHeader, SectionHeading, Seo, Paragraphs, CtaBand } from '../components/ui'
import { useContent } from '../context/ContentContext'
import api, { errorMessage, mediaUrl } from '../lib/api'
import { sortByOrder } from '../lib/format'

export function Alumni() {
  const { content } = useContent()
  const a = content.alumni
  return (
    <>
      <Seo title="Alumni" />
      <PageHeader eyebrow="Community" title={a.title || 'Alumni'} image={a.image} />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <Paragraphs text={a.intro} className="text-lg" />
            <ul className="mt-6 space-y-3">{(a.benefits || []).map((b, i) => <li key={i} className="flex gap-3 text-ink-soft"><CheckCircle2 className="mt-0.5 shrink-0 text-brand-700" size={20} />{b}</li>)}</ul>
          </div>
          <div className="card p-8">
            <h2 className="font-heading text-2xl font-bold">Stay connected</h2>
            <p className="mt-2 text-sm text-ink-soft">Are you a former student? Send us your name, year of graduation, trade and what you are doing now. We would love to feature you.</p>
            <ContactForm subject="Alumni registration" compact />
          </div>
        </div>
      </section>
    </>
  )
}

export function ContactForm({ subject = '', compact = false }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject, message: '' })
  const [status, setStatus] = useState({ state: 'idle' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading' })
    try {
      await api.post('/submissions/inquiries', form)
      setStatus({ state: 'done' })
    } catch (err) {
      setStatus({ state: 'error', message: errorMessage(err) })
    }
  }
  if (status.state === 'done')
    return (
      <div className="mt-6 rounded-xl bg-green-50 p-6 text-center text-green-800">
        <p className="font-heading text-lg font-bold">Message sent</p>
        <p className="mt-1 text-sm">Thank you. We will get back to you as soon as possible.</p>
      </div>
    )
  return (
    <form onSubmit={submit} className={`mt-6 grid gap-4 ${compact ? '' : 'md:grid-cols-2'}`}>
      <div><label className="label">Name *</label><input required className="input" value={form.name} onChange={set('name')} /></div>
      <div><label className="label">Email *</label><input required type="email" className="input" value={form.email} onChange={set('email')} /></div>
      <div><label className="label">Phone</label><input className="input" value={form.phone} onChange={set('phone')} /></div>
      <div><label className="label">Subject</label><input className="input" value={form.subject} onChange={set('subject')} /></div>
      <div className={compact ? '' : 'md:col-span-2'}><label className="label">Message *</label><textarea required rows={5} className="input" value={form.message} onChange={set('message')} /></div>
      {status.state === 'error' && <p className="text-sm text-red-600 md:col-span-2">{status.message}</p>}
      <div className={compact ? '' : 'md:col-span-2'}><button className="btn-primary" disabled={status.state === 'loading'}>{status.state === 'loading' ? 'Sending…' : 'Send message'}</button></div>
    </form>
  )
}

export function Contacts() {
  const { content } = useContent()
  const s = content.settings
  // Exact GPS pin when coordinates are set in Admin → Site settings; otherwise a place search.
  const coords = String(s.mapCoordinates || '').match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/)
  const map = coords
    ? `https://www.google.com/maps?q=${coords[1]},${coords[2]}&z=17&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(s.mapQuery || s.address || 'Kagarama, Kicukiro, Kigali')}&output=embed`
  const directions = coords
    ? `https://www.google.com/maps/dir/?api=1&destination=${coords[1]},${coords[2]}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.mapQuery || s.address || 'Kagarama, Kicukiro, Kigali')}`
  return (
    <>
      <Seo title="Contacts" />
      <PageHeader eyebrow="Get in touch" title="Contacts" subtitle="We are in Kagarama Sector, Kicukiro District, Kigali City. Call, write or visit." image={content.about.heroImage} />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[380px_1fr]">
          <div className="space-y-5">
            {(s.phones || []).map((p) => <ContactRow key={p} icon={Phone} label="Phone" value={p} href={`tel:${p.replace(/\s+/g, '')}`} />)}
            <ContactRow icon={Mail} label="Email" value={s.email} href={`mailto:${s.email}`} />
            <ContactRow icon={MapPin} label="Address" value={`${s.pobox}\n${s.address}`} />
            <ContactRow icon={Clock} label="Office hours" value={s.officeHours} />
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="pb-16 md:pb-24">
        <div className="container-x">
          <div className="overflow-hidden rounded-[5px] shadow-card">
            <iframe title="Map" src={map} className="h-[420px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
            <span>{s.address}</span>
            <a href={directions} target="_blank" rel="noreferrer" className="btn-primary !py-2">Get directions</a>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactRow({ icon: Icon, label, value, href }) {
  if (!value) return null
  const body = <span className="whitespace-pre-line font-medium">{value}</span>
  return (
    <div className="flex gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon size={22} /></span>
      <div><div className="text-xs uppercase tracking-wider text-ink-soft">{label}</div>{href ? <a href={href} className="hover:text-brand-700">{body}</a> : body}</div>
    </div>
  )
}

export function Faqs() {
  const { content } = useContent()
  const list = sortByOrder(content.faqs)
  const [open, setOpen] = useState(list[0]?.id)
  return (
    <>
      <Seo title="FAQs" />
      <PageHeader eyebrow="Help" title="Frequently Asked Questions" image={content.about.heroImage} />
      <section className="section">
        <div className="container-x max-w-3xl divide-y divide-gray-100 rounded-2xl border border-gray-100">
          {list.map((f) => (
            <div key={f.id}>
              <button className="flex w-full items-center justify-between gap-4 p-5 text-left font-heading font-bold" onClick={() => setOpen(open === f.id ? null : f.id)}>
                {f.question} <ChevronDown className={`shrink-0 text-brand-700 transition ${open === f.id ? 'rotate-180' : ''}`} />
              </button>
              {open === f.id && <Paragraphs text={f.answer} className="px-5 pb-5 text-sm" />}
            </div>
          ))}
        </div>
      </section>
      <CtaBand heading="Still have a question?" primary={{ to: '/contacts', label: 'Contact us' }} secondary={null} />
    </>
  )
}

export function Privacy() {
  const { content } = useContent()
  const s = content.settings
  return (
    <>
      <Seo title="Privacy Policy" />
      <PageHeader title="Privacy Policy" />
      <section className="section">
        <div className="container-x max-w-3xl prose-site">
          <p>{s.name} collects personal information through this website only when you submit an application, a contact message, an alumni registration or a concern report. We use that information solely to respond to you and to process admissions.</p>
          <p>Information is stored on the school's own server, is accessible only to authorised school staff, and is not sold or shared with third parties except where required by law. Concern reports may be submitted anonymously.</p>
          <p>This site uses no advertising or tracking cookies. Embedded maps and fonts are loaded from Google services, which may collect technical data under their own policies.</p>
          <p>To request a copy or deletion of your data, contact {s.email}.</p>
        </div>
      </section>
    </>
  )
}

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="flex min-h-[70vh] items-center justify-center pt-24 text-center">
        <div>
          <p className="font-heading text-8xl font-extrabold text-brand-100">404</p>
          <h1 className="font-heading text-3xl font-bold">Page not found</h1>
          <p className="mt-2 text-ink-soft">The page you are looking for does not exist or has moved.</p>
          <Link to="/" className="btn-primary mt-6">Back to home</Link>
        </div>
      </section>
    </>
  )
}

export { SectionHeading, mediaUrl }

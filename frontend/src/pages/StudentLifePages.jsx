import { useState } from 'react'
import { Clock, Calendar as CalendarIcon, Download, Users, Trophy, X } from 'lucide-react'
import { PageHeader, SectionHeading, Seo, Paragraphs, CtaBand, EmptyState } from '../components/ui'
import { FeatureCard } from '../components/Cards'
import { useContent } from '../context/ContentContext'
import { mediaUrl } from '../lib/api'
import { formatDate, sortByOrder } from '../lib/format'

export function StudentLife() {
  const { content } = useContent()
  const s = content.studentLife
  return (
    <>
      <Seo title="Discover Student Life" description={s.intro} />
      <PageHeader eyebrow="Student Life" title={s.title || 'Discover Saint Charles de Jesus'} subtitle={s.intro} image={s.heroImage} />
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(s.highlights || []).map((h, i) => <FeatureCard key={i} {...h} />)}
        </div>
      </section>
      <section className="bg-brand-50 py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="A typical day" title="Daily schedule" />
            <ul className="space-y-3">
              {(s.dailySchedule || []).map((d, i) => (
                <li key={i} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"><span className="w-28 shrink-0 font-heading font-bold text-brand-700">{d.time}</span><span className="text-ink-soft">{d.activity}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Documents" title="Handbook & dining menu" />
            <div className="space-y-3">
              {s.handbookUrl ? <a href={mediaUrl(s.handbookUrl)} target="_blank" rel="noreferrer" className="btn-primary w-full"><Download size={16} /> Students' Handbook</a> : <div className="rounded-xl bg-white p-4 text-sm text-ink-soft">The students' handbook is given to every student at registration. A downloadable copy can be added from the admin dashboard.</div>}
              {s.diningMenuUrl ? <a href={mediaUrl(s.diningMenuUrl)} target="_blank" rel="noreferrer" className="btn-outline w-full"><Download size={16} /> Dining menu</a> : null}
            </div>
            <div className="mt-8 rounded-2xl bg-brand-700 p-6 text-white">
              <h3 className="font-heading text-xl font-bold text-white">Our uniform</h3>
              <p className="mt-2 text-sm text-white/85">Students wear the school shirt and trousers with the numbered school T-shirt for sports, a sweater for cold mornings and a workshop overall with closed black shoes for practical sessions.</p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand heading="See it for yourself" text="Join us for a visit and meet our students in the workshops." primary={{ to: '/contacts', label: 'Book a visit' }} />
    </>
  )
}

export function Calendar() {
  const { content } = useContent()
  const s = content.studentLife
  const events = [...content.events].sort((a, b) => new Date(a.date) - new Date(b.date))
  const upcoming = events.filter((e) => new Date(e.date) >= new Date(new Date().toDateString()))
  const past = events.filter((e) => new Date(e.date) < new Date(new Date().toDateString()))
  return (
    <>
      <Seo title="School Calendar" />
      <PageHeader eyebrow="Student Life" title="School Calendar" subtitle={s.calendarNote} image={content.home.quickLinks?.[3]?.image} />
      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
            {(s.terms || []).map((t, i) => (
              <div key={i} className="card p-6">
                <CalendarIcon className="text-brand-700" />
                <h2 className="mt-3 font-heading text-xl font-bold">{t.name}</h2>
                <p className="mt-1 text-sm font-semibold text-accent-dark">{t.start} – {t.end}</p>
                <p className="mt-2 text-sm text-ink-soft">{t.notes}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-16 font-heading text-2xl font-bold">Upcoming events</h2>
          <EventList events={upcoming} />
          {past.length > 0 && (
            <details className="mt-10">
              <summary className="cursor-pointer font-heading text-lg font-bold text-ink-soft">Past events ({past.length})</summary>
              <EventList events={past.reverse()} />
            </details>
          )}
        </div>
      </section>
    </>
  )
}

function EventList({ events }) {
  if (!events.length) return <EmptyState>No events scheduled.</EmptyState>
  return (
    <ul className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100">
      {events.map((e) => {
        const d = new Date(e.date)
        return (
          <li key={e.id} className="flex gap-5 p-5">
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-700 text-white"><span className="font-heading text-2xl font-extrabold leading-none">{d.getDate()}</span><span className="text-[10px] uppercase tracking-widest">{d.toLocaleString('en-GB', { month: 'short' })}</span></div>
            <div><h3 className="font-heading font-bold">{e.title}</h3><p className="text-xs text-ink-soft">{formatDate(e.date, { weekday: 'long' })}</p>{e.text && <p className="mt-1 text-sm text-ink-soft">{e.text}</p>}</div>
          </li>
        )
      })}
    </ul>
  )
}

export function Clubs() {
  const { content } = useContent()
  const list = sortByOrder(content.clubs)
  return (
    <>
      <Seo title="Clubs & Societies" />
      <PageHeader eyebrow="Student Life" title="Clubs & Societies" subtitle="Afternoons belong to clubs: a place to lead, create, serve and have fun." image={content.studentLife.heroImage} />
      <section className="section">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.length ? list.map((c) => <FeatureCard key={c.id} title={c.name} text={c.text} icon={Users} />) : <EmptyState />}</div>
      </section>
    </>
  )
}

export function Sports() {
  const { content } = useContent()
  const list = sortByOrder(content.sports)
  return (
    <>
      <Seo title="Sports" />
      <PageHeader eyebrow="Student Life" title="Sports at Saint Charles de Jesus" subtitle="Healthy bodies, team spirit and friendly competition." image={content.studentLife.highlights?.[3]?.image} />
      <section className="section">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.length ? list.map((c) => <FeatureCard key={c.id} title={c.name} text={c.text} icon={Trophy} />) : <EmptyState />}</div>
      </section>
    </>
  )
}

export function Gallery() {
  const { content } = useContent()
  const list = sortByOrder(content.gallery)
  const [active, setActive] = useState(null)
  return (
    <>
      <Seo title="Gallery" />
      <PageHeader eyebrow="Student Life" title="Gallery" subtitle="Moments from our workshops, classrooms, chapel and sports grounds." image={list[0]?.image} />
      <section className="section">
        <div className="container-x columns-1 gap-4 sm:columns-2 lg:columns-3">
          {list.map((g) => (
            <button key={g.id} onClick={() => setActive(g)} className="group mb-4 block w-full overflow-hidden rounded-2xl">
              <img src={mediaUrl(g.image)} alt={g.caption} className="w-full transition duration-500 group-hover:scale-105" loading="lazy" />
              {g.caption && <span className="block bg-gray-50 px-4 py-2 text-left text-sm text-ink-soft">{g.caption}</span>}
            </button>
          ))}
          {!list.length && <EmptyState />}
        </div>
      </section>
      {active && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" onClick={() => setActive(null)}>
          <button className="absolute right-5 top-5 text-white" aria-label="Close"><X size={32} /></button>
          <figure className="max-h-full max-w-5xl">
            <img src={mediaUrl(active.image)} alt={active.caption} className="max-h-[80vh] w-auto rounded-xl" />
            {active.caption && <figcaption className="mt-3 text-center text-white">{active.caption}</figcaption>}
          </figure>
        </div>
      )}
    </>
  )
}

export { Clock }

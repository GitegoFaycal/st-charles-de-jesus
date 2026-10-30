import { Link } from 'react-router-dom'
import { Target, Eye, Heart, Award, Mail, Briefcase } from 'lucide-react'
import { PageHeader, SectionHeading, Seo, Paragraphs, Avatar, CtaBand, EmptyState } from '../components/ui'
import { FeatureCard } from '../components/Cards'
import { useContent } from '../context/ContentContext'
import { mediaUrl } from '../lib/api'
import { sortByOrder } from '../lib/format'

export function About() {
  const { content } = useContent()
  const a = content.about
  return (
    <>
      <Seo title="About" description={a.intro?.[0]} />
      <PageHeader eyebrow="Our School" title={a.title} subtitle={a.subtitle} image={a.heroImage} />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Paragraphs text={a.intro} className="text-lg" />
          <img src={mediaUrl(a.image)} alt="" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card" loading="lazy" />
        </div>
      </section>
      <section className="bg-brand-50 py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <div className="card p-8">
            <span className="inline-flex rounded-xl bg-brand-700 p-3 text-white"><Target /></span>
            <h2 className="mt-4 font-heading text-2xl font-bold">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{a.mission}</p>
          </div>
          <div className="card p-8">
            <span className="inline-flex rounded-xl bg-accent p-3 text-ink"><Eye /></span>
            <h2 className="mt-4 font-heading text-2xl font-bold">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{a.vision}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="What we stand for" title="Our Values" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(a.values || []).map((v, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 p-6 transition hover:border-brand-200 hover:shadow-card">
                <Heart className="text-accent-dark" size={22} />
                <h3 className="mt-3 font-heading text-lg font-bold">{v.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-brand-800 py-16 text-white">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          {a.patronImage ? (
            <img src={mediaUrl(a.patronImage)} alt={a.patronTitle || 'Our patron'} className="mx-auto h-60 w-48 rounded-[5px] object-cover object-top shadow-card ring-4 ring-accent" />
          ) : (
            <img src={mediaUrl(content.settings.logo) || '/images/logo.png'} alt="School crest" className="mx-auto h-48 w-auto rounded-2xl bg-white p-3" />
          )}
          <div>
            <h2 className="font-heading text-3xl font-bold text-white">{a.patronTitle}</h2>
            <p className="mt-4 leading-relaxed text-white/85">{a.patronText}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x flex flex-col items-start gap-6 rounded-3xl bg-gray-50 p-8 md:flex-row md:items-center">
          <Award size={44} className="shrink-0 text-brand-700" />
          <div>
            <h2 className="font-heading text-2xl font-bold">Accreditation</h2>
            <p className="mt-2 text-ink-soft">{a.accreditationText}</p>
          </div>
        </div>
      </section>
      <CtaBand heading="Come and see our workshops" text="Visit us in Kagarama or send your questions. We are happy to welcome parents and students." />
    </>
  )
}

export function HeadTeacherMessage() {
  const { content } = useContent()
  const m = content.headTeacherMessage
  return (
    <>
      <Seo title="Head Teacher's Message" />
      <PageHeader eyebrow="Our School" title="Head Teacher's Message" image={content.about.heroImage} />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[320px_1fr]">
          <div className="card self-start p-8 text-center">
            <Avatar src={m.photo} name={m.name} className="mx-auto h-48 w-48" textClass="text-4xl" />
            <h2 className="mt-5 font-heading text-xl font-bold">{m.name}</h2>
            <p className="text-sm text-brand-700">{m.title}</p>
          </div>
          <div>
            <Paragraphs text={m.paragraphs} className="text-lg" />
            {m.signature && <p className="mt-8 font-heading text-lg font-bold text-brand-700">{m.signature}</p>}
            <Link to="/admissions" className="btn-primary mt-8">Admissions</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function Facilities() {
  const { content } = useContent()
  const list = sortByOrder(content.facilities)
  return (
    <>
      <Seo title="Facilities" />
      <PageHeader eyebrow="Our School" title="Facilities" subtitle="Workshops, laboratories, boarding and spaces for faith and play." image={list[0]?.image} />
      <section className="section">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.length ? list.map((f) => <FeatureCard key={f.id} {...f} />) : <EmptyState />}
        </div>
      </section>
      <CtaBand heading="Want to see the campus?" text="Book a visit through our contact page." primary={{ to: '/contacts', label: 'Book a visit' }} secondary={null} />
    </>
  )
}

export function Policies() {
  const { content } = useContent()
  const p = content.policiesPage
  const list = sortByOrder(content.policies)
  return (
    <>
      <Seo title="Policies & Procedures" />
      <PageHeader eyebrow="Our School" title={p.title || 'Policies & Procedures'} subtitle={p.intro} />
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {list.map((item) => (
            <div key={item.id} className="rounded-2xl border border-gray-100 p-6">
              <h3 className="font-heading text-lg font-bold">{item.title}</h3>
              <Paragraphs text={item.text} className="mt-2 text-sm" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export function WorkWithUs() {
  const { content } = useContent()
  const c = content.careers
  const vacancies = sortByOrder(content.vacancies)
  return (
    <>
      <Seo title="Work With Us" />
      <PageHeader eyebrow="Our School" title={c.title || 'Work With Us'} image={c.image} />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <Paragraphs text={c.intro} className="text-lg" />
            <h2 className="mt-10 font-heading text-2xl font-bold">Open positions</h2>
            <div className="mt-4 space-y-4">
              {vacancies.length ? (
                vacancies.map((v) => (
                  <div key={v.id} className="card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-heading text-lg font-bold">{v.title}</h3>
                        <p className="text-sm text-brand-700">{v.department}</p>
                      </div>
                      {v.deadline && <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold">Deadline: {v.deadline}</span>}
                    </div>
                    <Paragraphs text={v.text} className="mt-3 text-sm" />
                  </div>
                ))
              ) : (
                <EmptyState>There are no advertised vacancies at the moment. Spontaneous applications are always welcome.</EmptyState>
              )}
            </div>
          </div>
          <aside className="card h-fit p-6">
            <Briefcase className="text-brand-700" />
            <h3 className="mt-3 font-heading text-lg font-bold">How to apply</h3>
            <p className="mt-2 text-sm text-ink-soft">Email your CV, qualifications and cover letter, or bring them to the school office.</p>
            <a href={`mailto:${content.settings.email}`} className="btn-primary mt-4 w-full"><Mail size={16} /> {content.settings.email}</a>
          </aside>
        </div>
      </section>
    </>
  )
}

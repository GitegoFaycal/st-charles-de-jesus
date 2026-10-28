import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Clock, Layers, BookOpen, Briefcase, CheckCircle2 } from 'lucide-react'
import { PageHeader, SectionHeading, Seo, Paragraphs, CtaBand, EmptyState } from '../components/ui'
import { ProgramCard, StaffCard } from '../components/Cards'
import { useContent } from '../context/ContentContext'
import { mediaUrl } from '../lib/api'
import { sortByOrder } from '../lib/format'
import { NotFound } from './MiscPages'

export function AcademicStaff() {
  const { content } = useContent()
  const staff = sortByOrder(content.staff)
  const departments = [...new Set(staff.map((s) => s.department || 'Staff'))]
  return (
    <>
      <Seo title="Academic Staff" />
      <PageHeader eyebrow="Academic Life" title="Academic Staff" subtitle="Qualified trainers and teachers who follow the Rwanda TVET Board competency-based curriculum." image={content.about.image} />
      <section className="section">
        <div className="container-x space-y-14">
          {staff.length === 0 && <EmptyState />}
          {departments.map((d) => (
            <div key={d}>
              <h2 className="mb-6 font-heading text-2xl font-bold">{d}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {staff.filter((s) => (s.department || 'Staff') === d).map((p) => <StaffCard key={p.id} person={p} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export function Programmes() {
  const { content } = useContent()
  const [params] = useSearchParams()
  const category = params.get('category')
  const all = sortByOrder(content.programs)
  const list = category ? all.filter((p) => p.category === category) : all
  const tss = list.filter((p) => p.category === 'TSS')
  const l1 = list.filter((p) => p.category !== 'TSS')
  return (
    <>
      <Seo title="Our Programmes" description={content.home.programsIntro} />
      <PageHeader eyebrow="Academic Life" title="Our Programmes" subtitle={content.home.programsIntro} image={content.home.quickLinks?.[0]?.image} />
      <section className="section">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap gap-2">
            {[{ label: 'All', value: null }, { label: 'TSS (L3 – L5)', value: 'TSS' }, { label: 'Level 1 trades', value: 'Level 1' }].map((f) => (
              <Link key={f.label} to={f.value ? `/academics/programmes?category=${encodeURIComponent(f.value)}` : '/academics/programmes'} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${category === f.value ? 'bg-brand-700 text-white' : 'bg-gray-100 text-ink hover:bg-brand-50'}`}>
                {f.label}
              </Link>
            ))}
          </div>
          {tss.length > 0 && (
            <>
              <SectionHeading eyebrow="Technical Secondary School" title="Three-year programmes, Level 3 to Level 5" text="Students enter at Level 3 after Ordinary Level and graduate with a Level 5 TVET certificate after national examinations." />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{tss.map((p) => <ProgramCard key={p.id} program={p} />)}</div>
            </>
          )}
          {l1.length > 0 && (
            <div className={tss.length ? 'mt-20' : ''}>
              <SectionHeading eyebrow="Short courses" title="Level 1 trades" text="One-year practical courses for youth and adults who want to enter a trade quickly." />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{l1.map((p) => <ProgramCard key={p.id} program={p} />)}</div>
            </div>
          )}
          {list.length === 0 && <EmptyState />}
        </div>
      </section>
      <CtaBand heading="Not sure which trade fits you?" text="Talk to our academic office. We will help you choose based on your interests and results." primary={{ to: '/contacts', label: 'Get advice' }} secondary={{ to: '/admissions/apply', label: 'Apply now' }} />
    </>
  )
}

export function ProgramDetail() {
  const { slug } = useParams()
  const { content } = useContent()
  const p = content.programs.find((x) => x.slug === slug)
  if (!p) return <NotFound />
  const others = sortByOrder(content.programs).filter((x) => x.id !== p.id && x.category === p.category).slice(0, 3)
  return (
    <>
      <Seo title={p.name} description={p.summary} />
      <PageHeader eyebrow={`${p.code} · ${p.category === 'TSS' ? 'Technical Secondary School' : 'Level 1 trade'}`} title={p.name} subtitle={p.summary} image={p.image} />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <Link to="/academics/programmes" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"><ArrowLeft size={16} /> All programmes</Link>
            <Paragraphs text={p.description} className="text-lg" />
            {p.modules?.length > 0 && (
              <>
                <h2 className="mt-10 flex items-center gap-2 font-heading text-2xl font-bold"><BookOpen className="text-brand-700" /> What you will learn</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">{p.modules.map((m, i) => <li key={i} className="flex gap-2 text-ink-soft"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />{m}</li>)}</ul>
              </>
            )}
            {p.careers?.length > 0 && (
              <>
                <h2 className="mt-10 flex items-center gap-2 font-heading text-2xl font-bold"><Briefcase className="text-brand-700" /> Career paths</h2>
                <div className="mt-4 flex flex-wrap gap-2">{p.careers.map((c, i) => <span key={i} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">{c}</span>)}</div>
              </>
            )}
          </div>
          <aside className="space-y-6">
            <div className="card p-6">
              <img src={mediaUrl(p.image)} alt="" className="mb-4 aspect-video w-full rounded-xl object-cover" />
              <dl className="space-y-3 text-sm">
                <div className="flex items-center gap-3"><Layers className="text-brand-700" size={18} /><div><dt className="text-xs uppercase tracking-wider text-ink-soft">Level</dt><dd className="font-semibold">{p.level}</dd></div></div>
                <div className="flex items-center gap-3"><Clock className="text-brand-700" size={18} /><div><dt className="text-xs uppercase tracking-wider text-ink-soft">Duration</dt><dd className="font-semibold">{p.duration}</dd></div></div>
              </dl>
              <Link to="/admissions/apply" className="btn-accent mt-6 w-full">Apply for {p.code}</Link>
              <Link to="/admissions/fees" className="btn-outline mt-3 w-full">Fees</Link>
            </div>
            {others.length > 0 && (
              <div className="card p-6">
                <h3 className="font-heading font-bold">Related programmes</h3>
                <ul className="mt-3 space-y-2 text-sm">{others.map((o) => <li key={o.id}><Link to={`/academics/programmes/${o.slug}`} className="font-medium text-brand-700 hover:underline">{o.name}</Link></li>)}</ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}

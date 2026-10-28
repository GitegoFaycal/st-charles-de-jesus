import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import Hero from '../components/Hero'
import { QuickLinkCard, CurriculumCard, NewsCard } from '../components/Cards'
import { Seo, Avatar } from '../components/ui'
import { useContent } from '../context/ContentContext'
import { mediaUrl } from '../lib/api'
import { sortByOrder, sortByDateDesc } from '../lib/format'

const BigQuote = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M6.5 5C3.5 5 1 7.5 1 10.5c0 2.6 1.8 4.7 4.2 5.3-.5 1.6-1.7 2.8-3.4 3.4l.6 1.8C6.6 19.8 9 16.8 9 12.2V10.5C9 7.5 8.5 5 6.5 5zm11 0C14.5 5 12 7.5 12 10.5c0 2.6 1.8 4.7 4.2 5.3-.5 1.6-1.7 2.8-3.4 3.4l.6 1.8c4.2-1.2 6.6-4.2 6.6-8.8V10.5C20 7.5 19.5 5 17.5 5z" />
  </svg>
)

/** Bottom announcement strip; can be dismissed on small screens so it never hides content. */
function AnnouncementBar({ text }) {
  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem('announcement-dismissed') === '1'
    } catch {
      return false
    }
  })
  if (hidden) return null
  const dismiss = () => {
    setHidden(true)
    try {
      sessionStorage.setItem('announcement-dismissed', '1')
    } catch {
      /* ignore */
    }
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 bg-accent px-4 py-2 text-xs font-semibold text-white sm:justify-center sm:text-sm">
      <p className="flex-1 sm:flex-none">
        {text} <Link to="/admissions/apply" className="underline">Apply now</Link>
      </p>
      <button type="button" onClick={dismiss} aria-label="Close announcement" className="shrink-0 rounded-full p-1.5 hover:bg-white/20">
        <X size={16} />
      </button>
    </div>
  )
}

export default function Home() {
  const { content } = useContent()
  const { home, settings } = content
  const programs = sortByOrder(content.programs)
  const tss = programs.filter((p) => p.category === 'TSS')
  const l1 = programs.filter((p) => p.category !== 'TSS')
  const news = sortByDateDesc(content.news).slice(0, 3)
  const partners = home.partners || []

  return (
    <>
      <Seo description={home.heroSubtitle} />
      {settings.announcementActive && settings.announcement && <AnnouncementBar text={settings.announcement} />}
      <Hero home={home} />

      {/* Intro: vertical rule, uppercase serif heading in blue, centred text, LEARN MORE */}
      <section id="intro" className="pb-14 pt-8 md:pb-20">
        <div className="container-x flex flex-col items-center text-center">
          <span className="mb-10 block h-16 w-px bg-ink/40 md:h-24" aria-hidden="true" />
          <h2 className="max-w-3xl font-display text-[28px] font-bold uppercase leading-tight tracking-[0.06em] text-heading md:text-[34px]">{home.introHeading}</h2>
          <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-ink md:text-[16px]">{home.introText}</p>
          <Link to={home.introLink || '/about'} className="link-more mt-8">
            {home.introLinkText || 'Learn more'}
          </Link>
        </div>
      </section>

      {/* Quick links: four line icons with uppercase labels */}
      <section className="pb-16 md:pb-20">
        <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {(home.quickLinks || []).map((q, i) => (
            <QuickLinkCard key={i} {...q} index={i} />
          ))}
        </div>
      </section>

      {/* Why join + programme cards on deep blue */}
      <section className="relative overflow-hidden bg-brand-700 py-14 md:py-20">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-dots opacity-60 [background-size:22px_22px]" />
        <div className="container-x relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <div className="self-start bg-white p-5">
            <img src={mediaUrl(home.whyImage)} alt="" className="aspect-[16/11] w-full object-cover" loading="lazy" />
            <div className="px-1 pb-4 pt-8">
              <h2 className="font-heading text-[28px] font-semibold leading-tight text-ink-mid md:text-[35px]">{home.whyTitle}</h2>
              <p className="mt-5 text-[14px] font-light leading-relaxed text-ink">{home.whyText}</p>
              <Link to={home.whyLink || '/student-life'} className="link-more mt-8">
                {home.whyLinkText || 'Learn more'}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {tss.map((p) => (
              <CurriculumCard key={p.id} title={p.name} text={p.summary} image={p.image} tag={p.code} to={`/academics/programmes/${p.slug}`} />
            ))}
            {l1.length > 0 && (
              <CurriculumCard
                title="Level 1 Trades"
                text={`One-year practical courses: ${l1.map((p) => p.name).join(', ')}.`}
                image={l1[0].image}
                tag="L1"
                to="/academics/programmes?category=Level%201"
              />
            )}
          </div>
        </div>
      </section>

      {/* Head teacher quote */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-[46%] bg-dots-dark opacity-60 [background-size:18px_18px]" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16">
          <div className="relative mx-auto">
            <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 bg-dots-dark opacity-70 [background-size:18px_18px]" />
            <Avatar src={home.headTeacherPhoto} name={home.headTeacherName} className="relative h-72 w-72 md:h-[380px] md:w-[380px]" textClass="text-6xl" />
          </div>
          <div>
            <BigQuote className="h-20 w-20 text-quote md:h-28 md:w-28" />
            <p className="mt-6 text-[22px] leading-[1.55] text-ink underline decoration-quote decoration-1 underline-offset-[7px] md:text-[31px]">{home.headTeacherQuote}</p>
            <div className="mt-8 text-[16px] text-ink">
              <div className="font-semibold">{home.headTeacherName},</div>
              <div>{home.headTeacherTitle}</div>
            </div>
            <Link to="/about/head-teacher-message" className="link-more mt-5">Read the full message</Link>
          </div>
        </div>
      </section>

      {/* News: yellow halftone band with the cards overlapping its bottom edge */}
      <section>
        <div className="halftone bg-accent-band pb-40 pt-16 md:pt-20">
          <div className="container-x text-center">
            <h2 className="font-heading text-[30px] font-bold text-[#212121] md:text-[41px]">{home.newsHeading || 'Happening at Saint Charles de Jesus'}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-black md:text-[17px]">
              {home.newsIntro ||
                'Stay up to date with the latest news and events happening at Saint Charles de Jesus TSS. Check back often for all the latest from our workshops, classrooms and playing fields.'}
            </p>
          </div>
        </div>
        <div className="container-x -mt-32 pb-16 md:pb-20">
          {news.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {news.map((p) => (
                <NewsCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center text-ink-light">News will appear here.</div>
          )}
          <div className="mt-10 text-center">
            <Link to="/news" className="link-more">All news</Link>
          </div>
        </div>
      </section>

      {/* Affiliations / partners */}
      {partners.length > 0 && (
        <section className="pb-16 md:pb-20">
          <div className="container-x flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((p, i) => {
              const inner = p.logo ? (
                <img src={mediaUrl(p.logo)} alt={p.name} className="h-12 w-auto object-contain md:h-14" loading="lazy" />
              ) : (
                <span className="font-display text-lg font-semibold uppercase tracking-wide text-ink-mid md:text-xl">{p.name}</span>
              )
              return p.link ? (
                <a key={i} href={p.link} target="_blank" rel="noreferrer" className="opacity-80 transition hover:opacity-100">{inner}</a>
              ) : (
                <span key={i} className="opacity-80">{inner}</span>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}

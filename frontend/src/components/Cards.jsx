import { Link } from 'react-router-dom'
import { ArrowRight, Quote, CalendarDays, GraduationCap, FileText, School, BookOpen, Wrench, Users, Newspaper, Trophy, Images, Phone } from 'lucide-react'
import { mediaUrl } from '../lib/api'
import { formatDate } from '../lib/format'
import { Avatar } from './ui'

/** Icons that can be picked for quick-link tiles from the admin (by name). */
export const QUICK_ICONS = {
  graduation: GraduationCap,
  admissions: FileText,
  school: School,
  calendar: CalendarDays,
  book: BookOpen,
  wrench: Wrench,
  users: Users,
  news: Newspaper,
  trophy: Trophy,
  gallery: Images,
  phone: Phone,
}
const DEFAULT_ICONS = ['book', 'admissions', 'school', 'calendar']

/** Line icon + uppercase label: the four quick-link tiles under the home intro. */
export function QuickLinkCard({ title, icon, link, index = 0 }) {
  const Icon = QUICK_ICONS[icon] || QUICK_ICONS[DEFAULT_ICONS[index % DEFAULT_ICONS.length]]
  return (
    <Link to={link || '#'} className="group flex flex-col items-center text-center">
      <Icon size={84} strokeWidth={1.1} className="text-brand-500 transition group-hover:scale-105 group-hover:text-accent-dark" />
      <h3 className="mt-6 max-w-[180px] font-body text-[13px] font-semibold uppercase leading-snug tracking-wide text-ink-mid md:text-[15px]">{title}</h3>
    </Link>
  )
}

/** Horizontal card: image on the left, title + short text on the right (the "curriculum" list). */
export function CurriculumCard({ title, text, image, to, tag }) {
  return (
    <Link to={to || '#'} className="group flex min-h-[112px] overflow-hidden bg-white transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="relative w-[130px] shrink-0 overflow-hidden sm:w-[150px]">
        <img src={mediaUrl(image)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
        {tag && <span className="absolute left-2 top-2 rounded-[3px] bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{tag}</span>}
      </div>
      <div className="flex flex-col justify-center px-5 py-4">
        <h3 className="font-heading text-[16px] font-semibold text-ink md:text-[20px]">{title}</h3>
        {text && <p className="mt-1.5 line-clamp-2 text-[13px] font-light leading-relaxed text-ink md:text-[14px]">{text}</p>}
      </div>
    </Link>
  )
}

export function ProgramCard({ program }) {
  return (
    <Link to={`/academics/programmes/${program.slug}`} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={mediaUrl(program.image)} alt={program.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
        <span className="absolute left-4 top-4 rounded-[3px] bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{program.code}</span>
        <span className="absolute right-4 top-4 rounded-[3px] bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700">{program.level}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-bold text-ink group-hover:text-brand-700">{program.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{program.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-link">
          Learn more <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
}

/** Light grey card with blue title and a dated excerpt, used in the news grid. */
export function NewsCard({ post }) {
  return (
    <Link to={`/news/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[5px] bg-[#f8f8f8] shadow-sm transition hover:shadow-card">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={mediaUrl(post.image)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col p-4 pt-5">
        <h3 className="font-heading text-[17px] font-bold leading-snug text-link group-hover:text-brand-700">{post.title}</h3>
        <p className="mt-2 flex items-center gap-1 text-[12px] text-ink-light">
          <CalendarDays size={12} /> {formatDate(post.date || post.createdAt)}
        </p>
        <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-light">{post.excerpt}</p>
      </div>
    </Link>
  )
}

export function TestimonialCard({ t }) {
  return (
    <figure className="card relative flex h-full flex-col p-7">
      <Quote className="absolute right-6 top-6 text-quote" size={36} />
      <blockquote className="flex-1 pr-10 text-sm leading-relaxed text-ink-soft">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        <Avatar src={t.photo} name={t.name} className="h-14 w-14" />
        <div>
          <div className="font-heading font-bold text-ink">{t.name}</div>
          <div className="text-xs text-ink-soft">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  )
}

export function StaffCard({ person }) {
  return (
    <div className="card flex h-full flex-col items-center p-6 text-center">
      <Avatar src={person.photo} name={person.name} className="h-28 w-28" textClass="text-2xl" />
      <h3 className="mt-4 font-heading text-lg font-bold text-ink">{person.name}</h3>
      <p className="text-sm font-semibold text-brand-700">{person.role}</p>
      {person.department && <p className="text-xs uppercase tracking-wider text-ink-soft">{person.department}</p>}
      {person.bio && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{person.bio}</p>}
    </div>
  )
}

export function FeatureCard({ title, text, image, icon: Icon }) {
  return (
    <div className="card h-full overflow-hidden">
      {image && (
        <div className="aspect-[16/10] overflow-hidden">
          <img src={mediaUrl(image)} alt={title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-6">
        {Icon && (
          <span className="mb-3 inline-flex rounded-[5px] bg-brand-50 p-3 text-brand-700">
            <Icon size={22} />
          </span>
        )}
        <h3 className="font-heading text-lg font-bold text-ink">{title}</h3>
        {text && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>}
      </div>
    </div>
  )
}

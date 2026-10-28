import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mediaUrl } from '../lib/api'
import { initials } from '../lib/format'

export function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | Saint Charles de Jesus TSS` : 'Saint Charles de Jesus TSS | Kigali'
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = 'description'
        document.head.appendChild(tag)
      }
      tag.content = description
    }
    window.scrollTo({ top: 0 })
  }, [title, description])
  return null
}

export function PageHeader({ title, subtitle, image, eyebrow }) {
  return (
    <section className="relative flex min-h-[320px] items-end overflow-hidden bg-brand-800 pt-32 text-white md:min-h-[400px]">
      {image && <img src={mediaUrl(image)} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/60 to-brand-900/30" />
      <div className="container-x relative pb-12">
        {eyebrow && <p className="eyebrow mb-2 text-accent">{eyebrow}</p>}
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, text, align = 'left', light = false }) {
  const center = align === 'center'
  return (
    <div className={`mb-10 ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className={`h-section ${light ? '!text-white' : ''}`}>{title}</h2>
      {text && <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? 'text-white/80' : 'text-ink-soft'}`}>{text}</p>}
    </div>
  )
}

export function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-3 text-ink-soft">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
        {label}
      </div>
    </div>
  )
}

export function Avatar({ src, name, className = 'h-16 w-16', textClass = 'text-lg' }) {
  if (src) return <img src={mediaUrl(src)} alt={name} className={`${className} rounded-full object-cover object-top`} />
  return (
    <div className={`${className} flex items-center justify-center rounded-full bg-brand-100 font-heading font-bold text-brand-700 ${textClass}`}>
      {initials(name) || '?'}
    </div>
  )
}

export function Paragraphs({ text, className = '' }) {
  if (!text) return null
  const parts = Array.isArray(text) ? text : String(text).split(/\n{2,}|\n/)
  return (
    <div className={`prose-site ${className}`}>
      {parts.filter((p) => p.trim()).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}

export function CtaBand({ heading, text, primary = { to: '/admissions/apply', label: 'Apply Now' }, secondary = { to: '/contacts', label: 'Contact Us' } }) {
  return (
    <section className="relative overflow-hidden bg-brand-700 py-16 text-white">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
      <div className="container-x relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">{heading}</h2>
          {text && <p className="mt-3 max-w-2xl text-white/80">{text}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={primary.to} className="btn-accent">{primary.label}</Link>
          {secondary && <Link to={secondary.to} className="btn-ghost-white">{secondary.label}</Link>}
        </div>
      </div>
    </section>
  )
}

export function EmptyState({ children = 'Nothing here yet.' }) {
  return <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-sm text-ink-soft">{children}</div>
}

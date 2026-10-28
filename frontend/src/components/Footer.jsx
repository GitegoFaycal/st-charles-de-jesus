import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useSettings } from '../context/ContentContext'
import { mediaUrl } from '../lib/api'
import ReportConcern from './ReportConcern'

// Brand icons (lucide-react no longer ships brand glyphs)
const Svg = ({ children, ...p }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" {...p}>{children}</svg>
)
const Facebook = (p) => <Svg {...p}><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z" /></Svg>
const Instagram = (p) => <Svg {...p}><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.6c2.7 0 3 0 4.1.1 2.8.1 4.1 1.4 4.2 4.2.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.8-1.4 4.1-4.2 4.2-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.8-.1-4.1-1.4-4.2-4.2C3.6 15 3.6 14.7 3.6 12s0-3 .1-4.1C3.8 5.1 5.1 3.8 7.9 3.7c1.1-.1 1.4-.1 4.1-.1zM12 2C9.3 2 8.9 2 7.8 2.1 4.1 2.2 2.2 4.1 2.1 7.8 2 8.9 2 9.3 2 12s0 3.1.1 4.2c.1 3.7 2 5.6 5.7 5.7 1.1.1 1.5.1 4.2.1s3.1 0 4.2-.1c3.7-.1 5.6-2 5.7-5.7.1-1.1.1-1.5.1-4.2s0-3.1-.1-4.2c-.1-3.7-2-5.6-5.7-5.7C15.1 2 14.7 2 12 2z" /></Svg>
const Youtube = (p) => <Svg {...p}><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" /></Svg>
const Twitter = (p) => <Svg {...p}><path d="M17.5 3h3l-6.8 7.8L21.7 21h-6.2l-4.9-6.3L5 21H2l7.3-8.3L1.6 3h6.4l4.4 5.8L17.5 3zm-1.1 16.2h1.7L7 4.7H5.2l11.2 14.5z" /></Svg>
const TikTokIcon = (p) => <Svg {...p}><path d="M16.5 3c.4 2.3 1.8 3.8 4 4v3.1c-1.5 0-2.9-.5-4-1.3v6.4c0 3.3-2.7 5.8-6 5.8s-6-2.5-6-5.8 2.7-5.8 6-5.8c.3 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.5 0-2.8 1.2-2.8 2.7s1.3 2.7 2.8 2.7 2.8-1.2 2.8-2.7V3h3.2z" /></Svg>

const SOCIALS = [
  { key: 'facebook', icon: Facebook, label: 'Facebook' },
  { key: 'instagram', icon: Instagram, label: 'Instagram' },
  { key: 'youtube', icon: Youtube, label: 'YouTube' },
  { key: 'twitter', icon: Twitter, label: 'Twitter' },
  { key: 'tiktok', icon: TikTokIcon, label: 'TikTok' },
  { key: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
]

const SITE_MAP = [
  { label: "Head Teacher's message", to: '/about/head-teacher-message' },
  { label: 'Our Programmes', to: '/academics/programmes' },
  { label: 'Discover SCJ TSS', to: '/student-life' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Fees Structure', to: '/admissions/fees' },
  { label: 'School Calendar', to: '/student-life/calendar' },
  { label: 'News', to: '/news' },
  { label: 'Alumni', to: '/alumni' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'FAQs', to: '/faqs' },
]

// Slightly larger text and taller rows on phones so links are easy to tap
const linkClass = 'inline-block py-1 font-footer text-[13px] font-light leading-[19px] text-white transition hover:text-accent md:py-0 md:text-[12px]'
const mutedClass = 'inline-block py-1 font-footer text-[13px] font-light leading-[19px] text-white/50 md:py-0 md:text-[12px]'

export default function Footer() {
  const s = useSettings()
  const socials = SOCIALS.filter((x) => s.socials?.[x.key])

  return (
    <footer className="bg-brand-700 text-white">
      <ReportConcern />

      <div className="container-x grid gap-10 pb-10 pt-14 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
        <div className="flex items-start gap-3">
          <img src={mediaUrl(s.logo) || '/images/logo.png'} alt={s.name} className="h-16 w-auto" />
          <div className="min-w-0 leading-none sm:whitespace-nowrap">
            <div className="font-display text-[22px] font-medium uppercase tracking-wide">{s.shortName || s.name}</div>
            <div className="mt-1 font-display text-[10px] uppercase tracking-[0.3em] text-white/90">Technical Secondary School</div>
            <p className="mt-3 font-footer text-[12px] font-light text-accent">{s.motto}</p>
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Site Map</h3>
          <div className="footer-divider" />
          <ul className="space-y-1">
            {SITE_MAP.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className={linkClass}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">Follow us</h3>
          <div className="footer-divider" />
          <ul className="space-y-1">
            {SOCIALS.filter((x) => x.key !== 'whatsapp').map(({ key, label }) => (
              <li key={key}>
                {s.socials?.[key] ? (
                  <a href={s.socials[key]} target="_blank" rel="noreferrer" className={linkClass}>{label}</a>
                ) : (
                  <span className={mutedClass}>{label}</span>
                )}
              </li>
            ))}
          </ul>
          <h3 className="footer-heading mt-8">Portals</h3>
          <div className="footer-divider" />
          <ul className="space-y-1">
            <li>
              {s.portals?.studentPortal ? (
                <a href={s.portals.studentPortal} className={linkClass} target="_blank" rel="noreferrer">Student Portal</a>
              ) : (
                <span className={mutedClass}>Student Portal (coming soon)</span>
              )}
            </li>
            <li>
              {s.portals?.parentPortal ? (
                <a href={s.portals.parentPortal} className={linkClass} target="_blank" rel="noreferrer">Parent Portal</a>
              ) : (
                <span className={mutedClass}>Parent Portal (coming soon)</span>
              )}
            </li>
            <li><Link to="/admin" className={linkClass}>Staff Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">Contacts</h3>
          <div className="footer-divider" />
          <p className="font-footer text-[12px] font-light leading-5 text-white">
            {s.email && (
              <>
                <strong className="font-semibold">Email:</strong> <a href={`mailto:${s.email}`} className="hover:text-accent">{s.email}</a>
                <br />
              </>
            )}
            {(s.phones || []).map((p, i) => (
              <span key={p}>
                {i === 0 && <strong className="font-semibold">Tel: </strong>}
                <a href={`tel:${p.replace(/\s+/g, '')}`} className="hover:text-accent">{p}</a>
                <br />
              </span>
            ))}
            <br />
            {s.pobox}
            <br />
            {s.address}
          </p>
        </div>
      </div>

      <div className={`container-x flex flex-col items-center justify-between gap-4 sm:flex-row ${s.announcementActive && s.announcement ? 'pb-16' : 'pb-8'}`}>
        <p className="font-footer text-[13px] font-light text-[#d7d7d7]">© {new Date().getFullYear()} {s.name}. All Rights Reserved</p>
        <div className="flex items-center gap-4">
          {socials.length ? (
            socials.map(({ key, icon: Icon, label }) => (
              <a key={key} href={s.socials[key]} target="_blank" rel="noreferrer" aria-label={label} className="text-accent transition hover:text-accent-deep">
                <Icon />
              </a>
            ))
          ) : (
            <span className={mutedClass}>{s.mottoMeaning}</span>
          )}
        </div>
      </div>
    </footer>
  )
}

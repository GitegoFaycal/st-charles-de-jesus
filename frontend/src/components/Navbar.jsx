import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, UserRound } from 'lucide-react'
import { useSettings } from '../context/ContentContext'
import { mediaUrl } from '../lib/api'

export const NAV = [
  {
    label: 'Our School',
    children: [
      { label: 'About SCJ TSS', to: '/about' },
      { label: "Head Teacher's Message", to: '/about/head-teacher-message' },
      { label: 'Facilities', to: '/about/facilities' },
      { label: 'Policies & Procedures', to: '/about/policies' },
      { label: 'Work With Us', to: '/about/work-with-us' },
    ],
  },
  {
    label: 'Admissions',
    children: [
      { label: 'Admissions', to: '/admissions' },
      { label: 'School Fees Structure', to: '/admissions/fees' },
      { label: 'Application Form', to: '/admissions/apply' },
    ],
  },
  {
    label: 'Academic Life',
    children: [
      { label: 'Academic Staff', to: '/academics/staff' },
      { label: 'Our Programmes', to: '/academics/programmes' },
      { label: 'TSS Programmes (L3 – L5)', to: '/academics/programmes?category=TSS' },
      { label: 'Level 1 Trades', to: '/academics/programmes?category=Level%201' },
    ],
  },
  {
    label: 'Student Life',
    children: [
      { label: 'Discover SCJ TSS', to: '/student-life' },
      { label: 'School Calendar', to: '/student-life/calendar' },
      { label: 'Clubs & Societies', to: '/student-life/clubs' },
      { label: 'Sports', to: '/student-life/sports' },
      { label: 'Gallery', to: '/student-life/gallery' },
    ],
  },
  { label: 'News', to: '/news' },
  { label: 'Alumni', to: '/alumni' },
  { label: 'Contacts', to: '/contacts' },
]

const itemClass =
  'flex items-center gap-1 whitespace-nowrap px-2 py-2 font-body text-[12px] font-semibold uppercase tracking-[0.5px] text-white transition hover:text-accent-dark xl:px-3'

export default function Navbar() {
  const settings = useSettings()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(null)
  const location = useLocation()
  const transparent = location.pathname === '/' && !scrolled && !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Transparent over the hero (dark gradient from the top), solid deep blue elsewhere */}
      <div className={`transition-colors duration-300 ${transparent ? 'bg-gradient-to-b from-black/85 to-transparent pb-6' : 'bg-brand-700 shadow-lg'}`}>
        <div className="container-x flex h-[88px] items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 lg:shrink-0">
            <img src={mediaUrl(settings.logo) || '/images/logo.png'} alt={settings.name} className="h-12 w-auto shrink-0 drop-shadow sm:h-14 md:h-16" />
            <div className="min-w-0 leading-none text-white sm:whitespace-nowrap">
              <div className="font-display text-[17px] font-medium uppercase tracking-wide sm:text-[20px] md:text-[24px]">{settings.shortName || 'St Charles de Jesus'}</div>
              <div className="mt-1 font-display text-[9px] uppercase tracking-[0.25em] text-white/90 sm:text-[10px] md:text-[11px]">Technical Secondary School</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center lg:flex">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button className={itemClass}>
                    {item.label} <ChevronDown size={13} strokeWidth={3} className="transition group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 min-w-[230px] translate-y-2 bg-brand-500 py-1 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block border-b border-[#4877be] px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.5px] text-white last:border-b-0 hover:text-accent-dark"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `${itemClass} ${isActive ? '!text-accent-dark' : ''}`}>
                  {item.label}
                </NavLink>
              )
            )}
            <Link to="/admin" className="btn-accent ml-4 !px-4 !py-2 !text-[15px]">
              <UserRound size={15} /> Login
            </Link>
          </nav>

          <button className="rounded-md p-2 text-white lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="max-h-[calc(100vh-88px)] overflow-y-auto bg-brand-700 text-white shadow-xl lg:hidden">
          <div className="container-x py-3">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-white/10">
                  <button
                    className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold uppercase tracking-wide"
                    onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
                  >
                    {item.label} <ChevronDown size={16} className={`transition ${mobileOpen === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileOpen === item.label && (
                    <div className="pb-2 pl-4">
                      {item.children.map((c) => (
                        <Link key={c.to} to={c.to} className="block py-2 text-sm text-white/85 hover:text-accent">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.to} to={item.to} className="block border-b border-white/10 py-3 text-sm font-semibold uppercase tracking-wide">
                  {item.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-2 py-4">
              <Link to="/admissions/apply" className="btn-accent">Apply Now</Link>
              <Link to="/admin" className="btn-ghost-white"><UserRound size={15} /> Login</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Inbox, Newspaper, GraduationCap, Users, MessageSquareQuote, Image, ArrowRight, Settings, Home } from 'lucide-react'
import api from '../lib/api'
import { useContent } from '../context/ContentContext'
import { formatDate } from '../lib/format'
import { SUBMISSIONS } from './schemas'

export default function Dashboard() {
  const { content } = useContent()
  const [subs, setSubs] = useState({ inquiries: [], applications: [], concerns: [] })

  useEffect(() => {
    Promise.all(Object.keys(SUBMISSIONS).map((t) => api.get(`/submissions/${t}`).then((r) => [t, r.data]).catch(() => [t, []]))).then((pairs) => setSubs(Object.fromEntries(pairs)))
  }, [])

  const counts = [
    { label: 'Programmes', value: content?.programs?.length ?? 0, icon: GraduationCap, to: '/admin/collections/programs' },
    { label: 'News articles', value: content?.news?.length ?? 0, icon: Newspaper, to: '/admin/collections/news' },
    { label: 'Staff profiles', value: content?.staff?.length ?? 0, icon: Users, to: '/admin/collections/staff' },
    { label: 'Testimonials', value: content?.testimonials?.length ?? 0, icon: MessageSquareQuote, to: '/admin/collections/testimonials' },
    { label: 'Gallery photos', value: content?.gallery?.length ?? 0, icon: Image, to: '/admin/collections/gallery' },
  ]
  const newCount = (list) => list.filter((s) => s.status === 'new').length

  const recent = Object.entries(subs)
    .flatMap(([type, list]) => list.map((s) => ({ ...s, type })))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome. Everything on the public website can be edited from here.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(SUBMISSIONS).map(([type, cfg]) => (
          <Link key={type} to={`/admin/submissions/${type}`} className="card flex items-center justify-between p-5 transition hover:-translate-y-0.5">
            <div><div className="text-xs font-bold uppercase tracking-wider text-gray-500">{cfg.title}</div><div className="mt-1 font-heading text-3xl font-extrabold text-brand-700">{subs[type]?.length ?? 0}</div></div>
            <div className="text-right"><Inbox className="ml-auto text-gray-300" />{newCount(subs[type] || []) > 0 && <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-bold">{newCount(subs[type])} new</span>}</div>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {counts.map((c) => (
          <Link key={c.label} to={c.to} className="card p-5 transition hover:-translate-y-0.5">
            <c.icon className="text-brand-700" size={20} />
            <div className="mt-2 font-heading text-2xl font-extrabold">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card p-6">
          <h2 className="font-heading text-lg font-bold">Recent submissions</h2>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">No submissions yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-gray-100">
              {recent.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{s.studentName || s.name || s.category || 'Submission'}</div>
                    <div className="truncate text-xs text-gray-500">{SUBMISSIONS[s.type].title} · {formatDate(s.createdAt)}</div>
                  </div>
                  <Link to={`/admin/submissions/${s.type}`} className="shrink-0 text-brand-700"><ArrowRight size={16} /></Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card p-6">
          <h2 className="font-heading text-lg font-bold">Quick actions</h2>
          <div className="mt-3 space-y-2 text-sm">
            <Link to="/admin/sections/home" className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50"><Home size={16} className="text-brand-700" /> Edit home page</Link>
            <Link to="/admin/collections/news" className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50"><Newspaper size={16} className="text-brand-700" /> Post news</Link>
            <Link to="/admin/sections/admissions" className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50"><GraduationCap size={16} className="text-brand-700" /> Update fees & admissions</Link>
            <Link to="/admin/sections/settings" className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50"><Settings size={16} className="text-brand-700" /> Contacts & social links</Link>
            <Link to="/admin/sections/headTeacherMessage" className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50"><Users size={16} className="text-brand-700" /> Head teacher's message</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

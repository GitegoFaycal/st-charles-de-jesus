import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, Settings, Home, Info, GraduationCap, Newspaper, Users, Image, Inbox, Menu, X, LogOut, ExternalLink, UserCog, FolderOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { SECTIONS, COLLECTIONS, SUBMISSIONS } from './schemas'

const groups = [
  {
    label: 'Pages',
    icon: Home,
    items: Object.entries(SECTIONS).map(([k, v]) => ({ to: `/admin/sections/${k}`, label: v.title })),
  },
  {
    label: 'Content',
    icon: Newspaper,
    items: Object.entries(COLLECTIONS).map(([k, v]) => ({ to: `/admin/collections/${k}`, label: v.title })),
  },
  {
    label: 'Inbox',
    icon: Inbox,
    items: Object.entries(SUBMISSIONS).map(([k, v]) => ({ to: `/admin/submissions/${k}`, label: v.title })),
  },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const link = ({ isActive }) => `block rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-brand-700 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`

  const sidebar = (
    <nav className="space-y-6 p-4">
      <NavLink to="/admin" end className={link}><span className="flex items-center gap-2"><LayoutDashboard size={16} /> Dashboard</span></NavLink>
      {groups.map((g) => (
        <div key={g.label}>
          <div className="mb-2 flex items-center gap-2 px-3 text-xs font-bold uppercase tracking-wider text-gray-500"><g.icon size={14} /> {g.label}</div>
          <div className="space-y-0.5">{g.items.map((i) => <NavLink key={i.to} to={i.to} className={link}>{i.label}</NavLink>)}</div>
        </div>
      ))}
      <div>
        <div className="mb-2 flex items-center gap-2 px-3 text-xs font-bold uppercase tracking-wider text-gray-500"><FolderOpen size={14} /> System</div>
        <div className="space-y-0.5">
          <NavLink to="/admin/media" className={link}><span className="flex items-center gap-2"><Image size={16} /> Media library</span></NavLink>
          <NavLink to="/admin/account" className={link}><span className="flex items-center gap-2"><UserCog size={16} /> My account</span></NavLink>
        </div>
      </div>
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="hidden w-64 shrink-0 flex-col bg-brand-900 lg:flex">
        <Link to="/admin" className="flex items-center gap-3 border-b border-white/10 p-4">
          <img src="/images/logo.png" alt="" className="h-10 w-10 rounded bg-white p-0.5" />
          <div className="text-white"><div className="font-heading text-sm font-bold">SCJ TSS Admin</div><div className="text-xs text-gray-400">Content dashboard</div></div>
        </Link>
        <div className="flex-1 overflow-y-auto">{sidebar}</div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-72 overflow-y-auto bg-brand-900">
            <div className="flex items-center justify-between p-4 text-white"><span className="font-heading font-bold">SCJ TSS Admin</span><button onClick={() => setOpen(false)}><X /></button></div>
            <div onClick={() => setOpen(false)}>{sidebar}</div>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-md p-2 lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"><ExternalLink size={14} /> View website</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-600 sm:inline">Signed in as <strong>{user?.name || user?.username}</strong></span>
            <button onClick={logout} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"><LogOut size={16} /> Log out</button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  )
}

export { Settings, Info, GraduationCap, Users }

import { useState } from 'react'
import { KeyRound, User } from 'lucide-react'
import api, { errorMessage } from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, setUser } = useAuth()
  const [profile, setProfile] = useState({ name: user?.name || '', username: user?.username || '' })
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [msg, setMsg] = useState({})

  const saveProfile = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.put('/auth/profile', profile)
      localStorage.setItem('scj_token', data.token)
      setUser({ id: data.id, username: data.username, name: data.name })
      setMsg({ profile: 'Profile updated.' })
    } catch (err) {
      setMsg({ profileErr: errorMessage(err) })
    }
  }
  const savePw = async (e) => {
    e.preventDefault()
    if (pw.newPassword !== pw.confirm) return setMsg({ pwErr: 'New passwords do not match.' })
    try {
      await api.put('/auth/password', pw)
      setPw({ currentPassword: '', newPassword: '', confirm: '' })
      setMsg({ pw: 'Password changed.' })
    } catch (err) {
      setMsg({ pwErr: errorMessage(err) })
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-heading text-2xl font-bold">My account</h1>
      <form onSubmit={saveProfile} className="card space-y-4 p-6">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold"><User size={18} /> Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Display name</label><input className="input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
          <div><label className="label">Username</label><input className="input" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} /></div>
        </div>
        {msg.profile && <p className="text-sm text-green-700">{msg.profile}</p>}
        {msg.profileErr && <p className="text-sm text-red-600">{msg.profileErr}</p>}
        <button className="btn-primary !px-5 !py-2 !text-xs">Save profile</button>
      </form>
      <form onSubmit={savePw} className="card space-y-4 p-6">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold"><KeyRound size={18} /> Change password</h2>
        <div><label className="label">Current password</label><input type="password" className="input" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">New password (min 8 characters)</label><input type="password" className="input" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} /></div>
          <div><label className="label">Confirm new password</label><input type="password" className="input" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} /></div>
        </div>
        {msg.pw && <p className="text-sm text-green-700">{msg.pw}</p>}
        {msg.pwErr && <p className="text-sm text-red-600">{msg.pwErr}</p>}
        <button className="btn-primary !px-5 !py-2 !text-xs">Change password</button>
      </form>
    </div>
  )
}

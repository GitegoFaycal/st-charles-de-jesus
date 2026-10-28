import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { errorMessage } from '../lib/api'

export default function Login() {
  const { user, ready, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (ready && user) return <Navigate to="/admin" replace />

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(form.username, form.password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(errorMessage(err, 'Login failed'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-900 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center text-white">
          <img src="/images/logo.png" alt="" className="mx-auto h-24 w-auto rounded-xl bg-white p-2" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-white">Saint Charles de Jesus TSS</h1>
          <p className="text-sm text-gray-300">Admin dashboard login</p>
        </div>
        <form onSubmit={submit} className="card space-y-4 p-8">
          <div><label className="label">Username</label><input className="input" autoFocus value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div>
          <div><label className="label">Password</label><input type="password" className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button className="btn-primary w-full" disabled={busy}><Lock size={16} /> {busy ? 'Signing in…' : 'Sign in'}</button>
          <p className="text-center text-xs text-gray-500">Default login is <code>admin</code> / <code>admin1234</code> until changed.</p>
        </form>
        <p className="mt-4 text-center text-sm"><Link to="/" className="text-gray-300 hover:text-white">← Back to website</Link></p>
      </div>
    </div>
  )
}

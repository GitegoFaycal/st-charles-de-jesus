import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_URL || ''

const api = axios.create({ baseURL: `${API_BASE}/api` })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('scj_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('scj_token')
      if (window.location.pathname !== '/admin/login') window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

/** Turn a stored image path (e.g. /uploads/x.jpg) into an absolute URL. */
export function mediaUrl(path) {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  if (path.startsWith('/uploads')) return `${API_BASE}${path}`
  return path
}

export function errorMessage(err, fallback = 'Something went wrong') {
  return err?.response?.data?.message || err?.message || fallback
}

export default api
